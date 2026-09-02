import { clearAuthCookie } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    clearAuthCookie(res)
    return res.status(200).json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
