import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'

export default async function handler(req, res) {
  const authUser = await requireApiAuth(req, res)
  if (!authUser) return

  const { id } = req.query
  const userId = parseInt(id)

  if (isNaN(userId)) {
    return res.status(400).json({ success: false, message: 'Invalid user ID' })
  }

  const isAdmin = authUser.role === ROLES.ADMIN
  const isSelf = authUser.id === userId

  if (!isAdmin && !isSelf) {
    return res.status(403).json({ success: false, message: 'Forbidden. You do not have permission to access or modify this user.' })
  }

  // GET single user
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
          bio: true,
          createdAt: true
        }
      })

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' })
      }

      return res.status(200).json({ success: true, user })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // PUT update user (role, name, password)
  if (req.method === 'PUT') {
    try {
      const { name, email, role, password, bio, avatar } = req.body
      const updateData = {}

      if (name !== undefined) updateData.name = name.trim()
      if (email !== undefined) updateData.email = email.trim().toLowerCase()
      // Only admin can change role
      if (role !== undefined && isAdmin) updateData.role = role
      if (bio !== undefined) updateData.bio = bio
      if (avatar !== undefined) updateData.avatar = avatar
      if (password) updateData.password = hashPassword(password)

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
          bio: true,
          createdAt: true
        }
      })

      return res.status(200).json({ success: true, user: updatedUser })
    } catch (error) {
      console.error('Error updating user:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to update user' })
    }
  }

  // DELETE user
  if (req.method === 'DELETE') {
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: 'Only administrators can delete user accounts' })
    }
    if (authUser.id === userId) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own admin account' })
    }
    try {
      await prisma.user.delete({
        where: { id: userId }
      })

      return res.status(200).json({ success: true, message: 'User deleted successfully' })
    } catch (error) {
      console.error('Error deleting user:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to delete user' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
