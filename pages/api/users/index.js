import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'

export default async function handler(req, res) {
  const authUser = await requireApiAuth(req, res, [ROLES.ADMIN])
  if (!authUser) return

  // GET all users with direct posts count and editorial designation
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          designation: true,
          avatar: true,
          bio: true,
          createdAt: true,
          _count: {
            select: { posts: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      const formatted = users.map(u => ({
        ...u,
        authorTitle: u.designation,
        postsCount: u._count?.posts || 0
      }))

      return res.status(200).json({ success: true, users: formatted })
    } catch (error) {
      console.error('Error fetching users:', error)
      return res.status(500).json({ success: false, message: error.message, users: [] })
    }
  }

  // POST create user with role & designation
  if (req.method === 'POST') {
    try {
      const { name, email, password, role = 'EDITOR', bio, authorTitle, designation, avatar } = req.body

      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Name, email, and password are required' })
      }

      const cleanEmail = email.trim().toLowerCase()
      const existing = await prisma.user.findUnique({ where: { email: cleanEmail } })
      if (existing) {
        return res.status(400).json({ success: false, message: 'Email is already in use' })
      }

      const hashedPassword = hashPassword(password)
      const user = await prisma.user.create({
        data: {
          name: name.trim(),
          email: cleanEmail,
          password: hashedPassword,
          role: role || 'EDITOR',
          designation: designation || authorTitle || (role === 'ADMIN' ? 'Editor in Chief' : role === 'EDITOR' ? 'Senior Editor' : 'Penulis'),
          bio: bio || '',
          avatar: avatar || '/assets/img/author/author-1.webp'
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          designation: true,
          avatar: true,
          bio: true,
          createdAt: true
        }
      })

      return res.status(201).json({ success: true, user: { ...user, authorTitle: user.designation, postsCount: 0 } })
    } catch (error) {
      console.error('Error creating user:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to create user' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
