import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query
  const authorId = parseInt(id)

  if (isNaN(authorId)) {
    return res.status(400).json({ success: false, message: 'Invalid author ID' })
  }

  // GET single author
  if (req.method === 'GET') {
    try {
      const author = await prisma.author.findUnique({
        where: { id: authorId },
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
          posts: {
            orderBy: { createdAt: 'desc' },
            include: {
              category: true,
              _count: { select: { comments: true } }
            }
          },
          _count: {
            select: { posts: true }
          }
        }
      })

      if (!author) {
        return res.status(404).json({ success: false, message: 'Author not found' })
      }

      return res.status(200).json({
        success: true,
        author: {
          ...author,
          postsCount: author._count?.posts || 0
        }
      })
    } catch (error) {
      console.error('Error fetching author:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // PUT update author
  if (req.method === 'PUT') {
    try {
      const { name, email, avatar, bio, role, userId } = req.body

      let parsedUserId = userId !== undefined ? (userId ? parseInt(userId) : null) : undefined

      // If linking to a user, ensure not already linked to a different author
      if (parsedUserId) {
        const existingWithUser = await prisma.author.findFirst({
          where: {
            userId: parsedUserId,
            NOT: { id: authorId }
          }
        })
        if (existingWithUser) {
          return res.status(400).json({
            success: false,
            message: `User account is already linked to author "${existingWithUser.name}".`
          })
        }
      }

      const updateData = {}
      if (name !== undefined) updateData.name = name
      if (email !== undefined) updateData.email = email || null
      if (avatar !== undefined) updateData.avatar = avatar
      if (bio !== undefined) updateData.bio = bio
      if (role !== undefined) updateData.role = role
      if (parsedUserId !== undefined) updateData.userId = parsedUserId

      const updatedAuthor = await prisma.author.update({
        where: { id: authorId },
        data: updateData,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          },
          _count: {
            select: { posts: true }
          }
        }
      })

      return res.status(200).json({
        success: true,
        author: {
          ...updatedAuthor,
          postsCount: updatedAuthor._count?.posts || 0
        }
      })
    } catch (error) {
      console.error('Error updating author:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to update author' })
    }
  }

  // DELETE author
  if (req.method === 'DELETE') {
    try {
      // Set posts authorId to null before deleting to avoid orphan foreign key errors
      await prisma.post.updateMany({
        where: { authorId },
        data: { authorId: null }
      })

      await prisma.author.delete({
        where: { id: authorId }
      })

      return res.status(200).json({ success: true, message: 'Author deleted successfully' })
    } catch (error) {
      console.error('Error deleting author:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to delete author' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
