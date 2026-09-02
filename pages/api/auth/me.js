import { getUserFromRequest } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const user = await getUserFromRequest(req)

    if (!user) {
      return res.status(200).json({ success: false, user: null, message: 'Not authenticated' })
    }

    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    console.error('Error in /api/auth/me:', error)
    return res.status(500).json({ success: false, user: null, message: error.message })
  }
}
