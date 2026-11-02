import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  try {
    const { limit = 10 } = req.query
    const take = Math.min(parseInt(limit) || 10, 30)

    // 1. Fetch settings for Breaking News
    const dbSettings = await prisma.setting.findMany({
      where: {
        key: {
          in: [
            'breaking_ticker_enabled',
            'breaking_ticker_title',
            'breaking_ticker_custom_text',
            'site_title'
          ]
        }
      }
    })

    const settingsObj = {}
    dbSettings.forEach(s => {
      settingsObj[s.key] = s.value
    })

    // 2. Fetch posts explicitly tagged as Breaking News
    const breakingTags = ['breaking-news', 'breaking', 'kilas-berita', 'urgent']
    const posts = await prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
        tags: {
          some: {
            slug: { in: breakingTags }
          }
        }
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        author: { select: { id: true, name: true, avatar: true, designation: true, role: true } },
        tags: { select: { id: true, name: true, slug: true } },
        _count: { select: { comments: true } }
      },
      orderBy: { createdAt: 'desc' },
      take
    })

    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      img: post.img,
      categoryId: post.categoryId,
      authorId: post.authorId,
      editorName: post.editorName,
      views: post.views,
      status: post.status,
      featured: post.featured,
      postType: post.postType,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      category: post.category?.name || 'Berita',
      categorySlug: post.category?.slug || 'berita',
      author: post.author?.name || 'Redaksi',
      authorRole: post.author?.designation || post.author?.role || 'Penulis',
      authorAvatar: post.author?.avatar || '/assets/img/author/author-1.webp',
      commentsCount: post._count?.comments || 0,
      tags: post.tags || [],
      isBreaking: post.tags?.some(t => breakingTags.includes(t.slug?.toLowerCase())) || false
    }))

    return res.status(200).json({
      success: true,
      count: formattedPosts.length,
      posts: formattedPosts,
      tickerSettings: {
        enabled: settingsObj.breaking_ticker_enabled !== 'false',
        title: settingsObj.breaking_ticker_title || 'BREAKING NEWS',
        customText: settingsObj.breaking_ticker_custom_text || ''
      }
    })
  } catch (error) {
    console.error('Error fetching breaking news:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Gagal memuat breaking news',
      posts: [],
      tickerSettings: {
        enabled: true,
        title: 'BREAKING NEWS',
        customText: ''
      }
    })
  }
}

