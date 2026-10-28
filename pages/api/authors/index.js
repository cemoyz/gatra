import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Ambil seluruh user dengan peran redaksi (ADMIN, EDITOR, AUTHOR) atau yang memiliki postingan
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { role: { in: ['ADMIN', 'EDITOR', 'AUTHOR'] } },
            { posts: { some: {} } }
          ]
        },
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
        orderBy: { id: 'asc' }
      })

      const formatted = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.designation || (u.role === 'ADMIN' ? 'Editor in Chief' : u.role === 'EDITOR' ? 'Senior Editor' : 'Penulis'),
        designation: u.designation || 'Penulis',
        userRole: u.role,
        avatar: u.avatar || '/assets/img/author/author-1.webp',
        bio: u.bio || '',
        postsCount: u._count?.posts || 0,
        createdAt: u.createdAt
      }))

      return res.status(200).json({ success: true, authors: formatted })
    } catch (error) {
      console.error('Error fetching authors:', error)
      return res.status(500).json({ success: false, message: error.message, authors: [] })
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, avatar, bio, role = 'Penulis', designation } = req.body

      if (!name) {
        return res.status(400).json({ success: false, message: 'Nama penulis wajib diisi' })
      }

      const cleanEmail = email ? email.trim().toLowerCase() : `penulis-${Date.now()}@duanarasi.com`
      const existing = await prisma.user.findUnique({ where: { email: cleanEmail } })
      if (existing) {
        return res.status(400).json({ success: false, message: 'Email sudah terdaftar pada pengguna lain' })
      }

      const defaultPassword = hashPassword('penulis123')
      const newUser = await prisma.user.create({
        data: {
          name: name.trim(),
          email: cleanEmail,
          password: defaultPassword,
          role: 'AUTHOR',
          designation: designation || role || 'Penulis',
          avatar: avatar || '/assets/img/author/author-1.webp',
          bio: bio || ''
        }
      })

      return res.status(201).json({
        success: true,
        author: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.designation,
          designation: newUser.designation,
          avatar: newUser.avatar,
          bio: newUser.bio,
          postsCount: 0
        }
      })
    } catch (error) {
      console.error('Error creating author:', error)
      return res.status(500).json({ success: false, message: error.message || 'Gagal menambahkan penulis' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
