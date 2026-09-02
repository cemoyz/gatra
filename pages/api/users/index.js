import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export default async function handler(req, res) {
  // GET all users with author details
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
          bio: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              role: true,
              bio: true,
              _count: {
                select: { posts: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      const formatted = users.map(u => ({
        ...u,
        postsCount: u.author?._count?.posts || 0
      }))

      return res.status(200).json({ success: true, users: formatted })
    } catch (error) {
      console.error('Error fetching users:', error)
      return res.status(500).json({ success: false, message: error.message, users: [] })
    }
  }

  // POST create user (Admin creates user + auto-creates author profile if editorial role)
  if (req.method === 'POST') {
    try {
      const { name, email, password, role = 'EDITOR', bio, authorTitle } = req.body

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
          bio: bio || '',
          avatar: '/assets/img/author/author-1.webp',
          // Automatically create linked author profile for editorial roles
          author: role !== 'SUBSCRIBER' ? {
            create: {
              name: name.trim(),
              email: cleanEmail,
              avatar: '/assets/img/author/author-1.webp',
              bio: bio || '',
              role: authorTitle || (role === 'ADMIN' ? 'Editor in Chief' : role === 'EDITOR' ? 'Senior Editor' : 'Jurnalis / Penulis')
            }
          } : undefined
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
          bio: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              role: true,
              bio: true
            }
          }
        }
      })

      return res.status(201).json({ success: true, user })
    } catch (error) {
      console.error('Error creating user:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to create user' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
