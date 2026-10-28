import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query
  const userId = parseInt(id)

  if (isNaN(userId)) {
    return res.status(400).json({ success: false, message: 'ID penulis tidak valid' })
  }

  // GET single author / user profile
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          designation: true,
          avatar: true,
          bio: true,
          createdAt: true,
          posts: {
            where: { status: 'PUBLISHED' },
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

      if (!user) {
        return res.status(404).json({ success: false, message: 'Profil penulis tidak ditemukan' })
      }

      return res.status(200).json({
        success: true,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.designation || (user.role === 'ADMIN' ? 'Editor in Chief' : user.role === 'EDITOR' ? 'Senior Editor' : 'Penulis'),
          designation: user.designation || 'Penulis',
          userRole: user.role,
          avatar: user.avatar || '/assets/img/author/author-1.webp',
          bio: user.bio || '',
          posts: user.posts || [],
          postsCount: user._count?.posts || 0,
          createdAt: user.createdAt
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
      const { name, email, avatar, bio, role, designation } = req.body

      const updateData = {}
      if (name !== undefined) updateData.name = name.trim()
      if (email !== undefined) updateData.email = email.trim().toLowerCase()
      if (avatar !== undefined) updateData.avatar = avatar
      if (bio !== undefined) updateData.bio = bio
      if (designation !== undefined || role !== undefined) {
        updateData.designation = designation || role
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          designation: true,
          avatar: true,
          bio: true,
          _count: {
            select: { posts: true }
          }
        }
      })

      return res.status(200).json({
        success: true,
        author: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.designation,
          designation: updatedUser.designation,
          avatar: updatedUser.avatar,
          bio: updatedUser.bio,
          postsCount: updatedUser._count?.posts || 0
        }
      })
    } catch (error) {
      console.error('Error updating author:', error)
      return res.status(500).json({ success: false, message: error.message || 'Gagal memperbarui profil penulis' })
    }
  }

  // DELETE author
  if (req.method === 'DELETE') {
    try {
      // Set posts authorId to null before deleting to avoid orphan foreign key errors
      await prisma.post.updateMany({
        where: { authorId: userId },
        data: { authorId: null }
      })

      await prisma.user.delete({
        where: { id: userId }
      })

      return res.status(200).json({ success: true, message: 'Penulis berhasil dihapus' })
    } catch (error) {
      console.error('Error deleting author:', error)
      return res.status(500).json({ success: false, message: error.message || 'Gagal menghapus penulis' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
