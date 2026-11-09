import { getSearchConsoleAnalytics } from '@/lib/analytics/searchConsoleProvider'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const user = await requireApiAuth(req, res, [ROLES.ADMIN, ROLES.EDITOR])
  if (!user) return

  const range = req.query.range === '30d' ? '30d' : req.query.range === '7d' ? '7d' : null
  if (!range) {
    return res.status(400).json({ success: false, message: 'Range harus 7d atau 30d.' })
  }

  try {
    const analytics = await getSearchConsoleAnalytics(range)
    res.setHeader('Cache-Control', 'private, no-store')
    return res.status(200).json({ success: true, source: 'google-search-console', data: analytics })
  } catch (error) {
    console.error('Search Console analytics error:', error)
    const status = error.code === 'GOOGLE_NOT_CONFIGURED' || error.code === 'GOOGLE_CREDENTIALS_INVALID' ? 503 : 502
    return res.status(status).json({
      success: false,
      code: error.code || 'GOOGLE_API_ERROR',
      message: error.code ? error.message : 'Tidak dapat mengambil data Google Search Console. Periksa akses Service Account dan properti Search Console.'
    })
  }
}