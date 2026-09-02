import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const authors = await prisma.author.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              avatar: true
            }
          },
          _count: {
            select: { posts: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      const formatted = authors.map(a => ({
        ...a,
        postsCount: a._count?.posts || 0,
        linkedUser: a.user || null
      }))

      return res.status(200).json({ success: true, authors: formatted })
    } catch (error) {
      console.error('Error fetching authors:', error)
      return res.status(500).json({ success: false, message: error.message, authors: [] })
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, avatar, bio, role = 'Editor', userId } = req.body

      if (!name) {
        return res.status(400).json({ success: false, message: 'Author name is required' })
      }

      // Check if userId is already linked to another author
      let parsedUserId = userId ? parseInt(userId) : null
      if (parsedUserId) {
        const existingWithUser = await prisma.author.findUnique({
          where: { userId: parsedUserId }
        })
        if (existingWithUser) {
          return res.status(400).json({
            success: false,
            message: `User account is already linked to author profile "${existingWithUser.name}".`
          })
        }
      }

      const author = await prisma.author.create({
        data: {
          name,
          email: email || null,
          avatar: avatar || '/assets/img/author/author-1.webp',
          bio: bio || '',
          role: role || 'Editor',
          userId: parsedUserId || null
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      })

      return res.status(201).json({ success: true, author })
    } catch (error) {
      console.error('Error creating author:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to create author' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
