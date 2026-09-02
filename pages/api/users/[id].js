import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export default async function handler(req, res) {
  const { id } = req.query
  const userId = parseInt(id)

  if (isNaN(userId)) {
    return res.status(400).json({ success: false, message: 'Invalid user ID' })
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
      if (role !== undefined) updateData.role = role
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
