import prisma from '@/lib/prisma'
import { sendDashboardEvent } from '@/lib/events'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'
import { triggerAutoIndexing } from '@/lib/indexing'

// In-memory de-duplication cache with 5s cooldown per IP+Post to prevent React StrictMode double mounts
const recentViewsCache = new Map()

export default async function handler(req, res) {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ success: false, message: 'Post identifier is required' })
  }

  const decodedId = typeof id === 'string' ? decodeURIComponent(id).trim() : String(id)
  const isNumeric = /^\d+$/.test(decodedId)
  const parsedId = isNumeric ? parseInt(decodedId) : NaN

  const whereCondition = isNumeric
    ? { id: parsedId }
    : {
        OR: [
          { slug: { equals: decodedId, mode: 'insensitive' } },
          { slug: { equals: decodedId.toLowerCase().replace(/[^a-z0-9]+/g, '-'), mode: 'insensitive' } },
          { title: { equals: decodedId, mode: 'insensitive' } }
        ]
      }

  // GET single post with relations and increment view counter
  if (req.method === 'GET') {
    try {
      let post = await prisma.post.findFirst({
        where: whereCondition,
        include: {
          category: true,
          author: true,
          tags: true,
          comments: {
            orderBy: { createdAt: 'desc' }
          }
        }
      })

      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' })
      }

      const postId = post.id
      const clientIp = req.headers['cf-connecting-ip'] || (typeof req.headers['x-forwarded-for'] === 'string' ? req.headers['x-forwarded-for'].split(',')[0].trim() : null) || req.socket?.remoteAddress || '127.0.0.1'
      const viewKey = `${clientIp}_${postId}`
      const now = Date.now()
      const lastViewTime = recentViewsCache.get(viewKey)
      const shouldIncrement = !lastViewTime || (now - lastViewTime > 5000)

      if (shouldIncrement) {
        recentViewsCache.set(viewKey, now)
        if (recentViewsCache.size > 2000) recentViewsCache.clear()

        // 1. Increment post views atomically in PostgreSQL
        try {
          post = await prisma.post.update({
            where: { id: postId },
            data: { views: { increment: 1 } },
            include: {
              category: true,
              author: true,
              tags: true,
              comments: {
                orderBy: { createdAt: 'desc' }
              }
            }
          })
        } catch (e) {}

        // 2. Detect device type from User-Agent and increment daily tracking
        const userAgent = req.headers['user-agent'] || ''
        const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|opera mini|iemobile|silk|kindle/i.test(userAgent)
        const todayStr = new Date().toISOString().slice(0, 10)
        const dailyTotalKey = `daily_views_${todayStr}`
        const deviceKey = isMobile ? `daily_mobile_${todayStr}` : `daily_desktop_${todayStr}`

        // Increment daily total
        prisma.setting.upsert({
          where: { key: dailyTotalKey },
          update: { value: String((parseInt((await prisma.setting.findUnique({ where: { key: dailyTotalKey } }))?.value || '0')) + 1) },
          create: { key: dailyTotalKey, value: '1' }
        }).catch(() => {})

        // Increment device specific count (desktop vs mobile)
        prisma.setting.upsert({
          where: { key: deviceKey },
          update: { value: String((parseInt((await prisma.setting.findUnique({ where: { key: deviceKey } }))?.value || '0')) + 1) },
          create: { key: deviceKey, value: '1' }
        }).catch(() => {})

        // 3. Emit SSE Event to all connected dashboard sessions
        sendDashboardEvent('view_incremented', { postId, isMobile })
      }

      const formattedPost = {
        ...post,
        category: post.category?.name || 'General',
        categorySlug: post.category?.slug || 'general',
        author: post.author?.name || 'Admin',
        authorRole: post.author?.designation || post.author?.role || 'Penulis',
        authorAvatar: post.author?.avatar || '/assets/img/author/author-1.webp'
      }

      return res.status(200).json({ success: true, post: formattedPost })
    } catch (error) {
      console.error('Error fetching post with relations:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // PUT update post
  if (req.method === 'PUT') {
    const authUser = await requireApiAuth(req, res, [ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR])
    if (!authUser) return

    try {
      const existingPost = await prisma.post.findFirst({ where: whereCondition })
      if (!existingPost) {
        return res.status(404).json({ success: false, message: 'Post not found' })
      }
      const postId = existingPost.id

      if (authUser.role === ROLES.AUTHOR) {
        const isOwner = existingPost.authorId === authUser.id
        if (!isOwner) {
          return res.status(403).json({ success: false, message: 'Akses ditolak. Anda hanya dapat mengubah artikel milik Anda sendiri.' })
        }
      }

      const {
        title,
        slug,
        excerpt,
        content,
        img,
        imageCaption,
        imageTags,
        categoryId,
        authorId,
        editorName,
        tags,
        status,
        featured,
        views,
        postType,
        videoUrl,
        audioUrl,
        quoteText,
        quoteAuthor,
        externalUrl,
        gallery,
        layout
      } = req.body

      const updateData = {}
      if (title !== undefined) updateData.title = title
      if (slug !== undefined) updateData.slug = slug
      if (excerpt !== undefined) updateData.excerpt = excerpt
      if (content !== undefined) updateData.content = content
      if (img !== undefined) updateData.img = img
      if (imageCaption !== undefined) updateData.imageCaption = imageCaption || null
      if (imageTags !== undefined) updateData.imageTags = imageTags || null
      if (categoryId !== undefined) {
        if (categoryId) {
          updateData.category = { connect: { id: parseInt(categoryId) } }
        } else {
          updateData.category = { disconnect: true }
        }
      }
      if (editorName !== undefined) updateData.editorName = editorName
      
      // Only ADMIN and EDITOR can change the author of a post
      if (authorId !== undefined && authUser.role !== ROLES.AUTHOR) {
        if (authorId) {
          updateData.author = { connect: { id: parseInt(authorId) } }
        } else {
          updateData.author = { disconnect: true }
        }
      }

      if (status !== undefined) updateData.status = status
      if (featured !== undefined) updateData.featured = Boolean(featured)
      if (views !== undefined) updateData.views = parseInt(views)
      if (postType !== undefined) updateData.postType = postType
      if (videoUrl !== undefined) updateData.videoUrl = videoUrl
      if (audioUrl !== undefined) updateData.audioUrl = audioUrl
      if (quoteText !== undefined) updateData.quoteText = quoteText
      if (quoteAuthor !== undefined) updateData.quoteAuthor = quoteAuthor
      if (externalUrl !== undefined) updateData.externalUrl = externalUrl
      if (gallery !== undefined) updateData.gallery = gallery
      if (layout !== undefined) updateData.layout = layout

      const breakingSlugs = ['breaking-news', 'breaking', 'kilas-berita', 'urgent']

      if (Array.isArray(tags)) {
        let tagObjects = tags.map(tagName => {
          const cleanName = typeof tagName === 'string' ? tagName.trim() : (tagName.name || '')
          const cleanSlug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
          return { name: cleanName, slug: cleanSlug }
        }).filter(t => t.name.length > 0)

        if (req.body.isBreaking !== undefined) {
          const isB = Boolean(req.body.isBreaking)
          tagObjects = tagObjects.filter(t => 
            !breakingSlugs.includes(t.slug.toLowerCase()) && 
            !t.name.toLowerCase().includes('breaking')
          )
          if (isB) {
            tagObjects.push({ name: 'Breaking News', slug: 'breaking-news' })
          }
        }

        updateData.tags = {
          set: [],
          connectOrCreate: tagObjects.map(t => ({
            where: { slug: t.slug },
            create: { name: t.name, slug: t.slug }
          }))
        }
      } else if (req.body.isBreaking !== undefined) {
        const currentPostTags = await prisma.tag.findMany({
          where: { posts: { some: { id: postId } } }
        })
        const isB = Boolean(req.body.isBreaking)
        const filteredTags = currentPostTags.filter(t => 
          !breakingSlugs.includes(t.slug.toLowerCase()) && 
          !t.name.toLowerCase().includes('breaking')
        )
        if (isB) {
          filteredTags.push({ name: 'Breaking News', slug: 'breaking-news' })
        }
        updateData.tags = {
          set: [],
          connectOrCreate: filteredTags.map(t => ({
            where: { slug: t.slug },
            create: { name: t.name, slug: t.slug }
          }))
        }
      }

      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: updateData,
        include: {
          category: true,
          author: true,
          tags: true,
          comments: true
        }
      })

      if (updatedPost.status === 'PUBLISHED') {
        triggerAutoIndexing(updatedPost, 'update')
      } else if (existingPost.status === 'PUBLISHED' && updatedPost.status !== 'PUBLISHED') {
        triggerAutoIndexing(updatedPost, 'delete')
      }

      return res.status(200).json({ success: true, post: updatedPost })
    } catch (error) {
      console.error('Error updating post with relations:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to update post' })
    }
  }

  // DELETE post
  if (req.method === 'DELETE') {
    const authUser = await requireApiAuth(req, res, [ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR])
    if (!authUser) return

    try {
      const existingPost = await prisma.post.findFirst({ where: whereCondition })
      if (!existingPost) {
        return res.status(404).json({ success: false, message: 'Post not found' })
      }
      const postId = existingPost.id

      if (authUser.role === ROLES.AUTHOR) {
        const isOwner = existingPost.authorId === authUser.id
        if (!isOwner) {
          return res.status(403).json({ success: false, message: 'Akses ditolak. Anda hanya dapat menghapus artikel milik Anda sendiri.' })
        }
      }

      await prisma.post.delete({
        where: { id: postId }
      })

      return res.status(200).json({ success: true, message: 'Post deleted successfully' })
    } catch (error) {
      console.error('Error deleting post:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to delete post' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
