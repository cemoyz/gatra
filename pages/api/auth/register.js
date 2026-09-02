import prisma from '@/lib/prisma'
import { hashPassword, signToken, setAuthCookie } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { name, email, password, role = 'SUBSCRIBER' } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
    }

    const cleanEmail = email.trim().toLowerCase()

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail }
    })

    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' })
    }

    // All public self-registrations are strictly SUBSCRIBER
    const assignedRole = 'SUBSCRIBER'

    const hashedPassword = hashPassword(password)
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        role: assignedRole,
        avatar: '/assets/img/author/author-1.webp'
      }
    })

    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name
    })

    setAuthCookie(res, token)

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      }
    })
  } catch (error) {
    console.error('Error during registration:', error)
    return res.status(500).json({ success: false, message: error.message || 'Registration failed' })
  }
}
