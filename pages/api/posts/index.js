import prisma from '@/lib/prisma'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const {
        search = '',
        category = '',
        categoryId,
        authorId,
        status = '',
        postType = '',
        layout = '',
        tag = '',
        sortBy = '',
        featured = '',
        ids = '',
        page = 1,
        limit = 20
      } = req.query

      const whereClause = {}

      let idArray = null
      if (ids) {
        idArray = String(ids)
          .split(',')
          .map(id => parseInt(id.trim()))
          .filter(id => !isNaN(id))
        if (idArray.length > 0) {
          whereClause.id = { in: idArray }
        }
      }

      if (featured === 'true') {
        whereClause.featured = true
      }

      if (search) {
        whereClause.OR = [
          { title: { contains: String(search), mode: 'insensitive' } },
          { excerpt: { contains: String(search), mode: 'insensitive' } },
          { author: { name: { contains: String(search), mode: 'insensitive' } } },
          { category: { name: { contains: String(search), mode: 'insensitive' } } },
          { tags: { some: { name: { contains: String(search), mode: 'insensitive' } } } }
        ]
      }

      if (categoryId) {
        whereClause.categoryId = parseInt(categoryId)
      } else if (category && category !== 'all') {
        whereClause.OR = [
          { category: { slug: { equals: String(category), mode: 'insensitive' } } },
          { category: { name: { equals: String(category), mode: 'insensitive' } } }
        ]
      }

      if (authorId) {
        whereClause.authorId = parseInt(authorId)
      }

      if (tag) {
        whereClause.tags = {
          some: {
            OR: [
              { slug: { equals: String(tag), mode: 'insensitive' } },
              { name: { equals: String(tag), mode: 'insensitive' } }
            ]
          }
        }
      }

      if (status && status !== 'all') {
        whereClause.status = String(status).toUpperCase()
      }

      if (postType && postType !== 'all') {
        whereClause.postType = String(postType).toLowerCase()
      }

      if (layout && layout !== 'all') {
        whereClause.layout = String(layout).toLowerCase()
      }

      let orderBy = [{ createdAt: 'desc' }]
      if (sortBy === 'trending' || sortBy === 'viral') {
        // Algoritma Trending: Lonjakan interaksi dan kecepatan klik dalam waktu singkat/terkini
        orderBy = [
          { views: 'desc' },
          { createdAt: 'desc' }
        ]
      } else if (sortBy === 'popular' || sortBy === 'views') {
        // Algoritma Popular: Total akumulasi klik atau views terbanyak sepanjang waktu
        orderBy = { views: 'desc' }
      } else if (sortBy === 'comments') {
        orderBy = { views: 'desc' }
      } else if (sortBy === 'oldest') {
        orderBy = { createdAt: 'asc' }
      } else if (sortBy === 'title') {
        orderBy = { title: 'asc' }
      }

      const take = parseInt(limit) || 20
      const skip = (parseInt(page) - 1) * take

      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where: whereClause,
          include: {
            category: true,
            author: true,
            tags: true,
            _count: {
              select: { comments: true }
            }
          },
          orderBy,
          skip,
          take,
        }),
        prisma.post.count({ where: whereClause })
      ])

      // Format response with normalized category/author strings for backwards-compatibility
      let formattedPosts = posts.map(post => ({
        ...post,
        category: post.category?.name || post.category?.slug || 'General',
        categorySlug: post.category?.slug || 'general',
        author: post.author?.name || 'Admin',
        authorAvatar: post.author?.avatar || '/assets/img/author/author-1.webp',
        commentsCount: post._count?.comments || 0
      }))

      if (idArray && idArray.length > 0) {
        formattedPosts = formattedPosts.sort((a, b) => idArray.indexOf(a.id) - idArray.indexOf(b.id))
      }

      return res.status(200).json({
        success: true,
        posts: formattedPosts,
        pagination: {
          total,
          page: parseInt(page),
          totalPages: Math.ceil(total / take) || 1,
          limit: take
        }
      })
    } catch (error) {
      console.error('Error fetching posts with relations:', error)
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch posts',
        posts: [],
        pagination: { total: 0, page: 1, totalPages: 1 }
      })
    }
  }

  if (req.method === 'POST') {
    const authUser = await requireApiAuth(req, res, [ROLES.ADMIN, ROLES.EDITOR, ROLES.AUTHOR])
    if (!authUser) return

    try {
      const {
        title,
        slug,
        excerpt,
        content,
        img,
        categoryId,
        authorId,
        editorName,
        tags, // Array of string names or objects
        status = 'PUBLISHED',
        featured = false,
        postType = 'standard',
        videoUrl,
        audioUrl,
        quoteText,
        quoteAuthor,
        externalUrl,
        gallery,
        layout = 'right-sidebar'
      } = req.body

      if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' })
      }

      // If user is AUTHOR, automatically bind to their author profile
      let effectiveAuthorId = authorId ? parseInt(authorId) : null
      if (authUser.role === ROLES.AUTHOR) {
        if (authUser.author?.id) {
          effectiveAuthorId = authUser.author.id
        } else {
          const newAuthor = await prisma.author.create({
            data: {
              name: authUser.name,
              email: authUser.email,
              avatar: authUser.avatar || '/avatar.png',
              bio: authUser.bio || 'Penulis di Hoom Magazine',
              userId: authUser.id
            }
          })
          effectiveAuthorId = newAuthor.id
        }
      }

      const generatedSlug = slug || title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + `-${Date.now()}`

      // Build tag relation connections
      let tagConnections = undefined
      if (Array.isArray(tags) && tags.length > 0) {
        tagConnections = {
          connectOrCreate: tags.map(tagName => {
            const cleanName = typeof tagName === 'string' ? tagName.trim() : tagName.name
            const cleanSlug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            return {
              where: { slug: cleanSlug },
              create: { name: cleanName, slug: cleanSlug }
            }
          })
        }
      }

      const newPost = await prisma.post.create({
        data: {
          title,
          slug: generatedSlug,
          excerpt: excerpt || '',
          content: content || '',
          img: img || 'blog-2-1.webp',
          categoryId: categoryId ? parseInt(categoryId) : null,
          authorId: effectiveAuthorId,
          editorName: editorName || 'Redaksi Dua Narasi',
          tags: tagConnections,
          status: status || 'PUBLISHED',
          featured: Boolean(featured),
          postType: postType || 'standard',
          videoUrl: videoUrl || null,
          audioUrl: audioUrl || null,
          quoteText: quoteText || null,
          quoteAuthor: quoteAuthor || null,
          externalUrl: externalUrl || null,
          gallery: gallery || null,
          layout: layout || 'right-sidebar'
        },
        include: {
          category: true,
          author: true,
          tags: true
        }
      })

      return res.status(201).json({ success: true, post: newPost })
    } catch (error) {
      console.error('Error creating post with relations:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to create post' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
