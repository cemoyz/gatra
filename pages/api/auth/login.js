import prisma from '@/lib/prisma'
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    const cleanEmail = email.trim().toLowerCase()
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail }
    })

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const isValid = verifyPassword(password, user.password)
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    })

    setAuthCookie(res, token, req)

    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || '/assets/img/author/author-1.webp',
      bio: user.bio || ''
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userProfile
    })
  } catch (error) {
    console.error('Error during login:', error)
    return res.status(500).json({ success: false, message: error.message || 'Login failed' })
  }
}
