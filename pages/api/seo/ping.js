import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  try {
    const setting = await prisma.setting.findUnique({ where: { key: 'site_url' } })
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers['host'] || 'localhost:3000'
    const domain = setting?.value?.trim() || `${protocol}://${host}`
    const sitemapUrl = `${domain.replace(/\/$/, '')}/sitemap.xml`

    const results = []

    // 1. Ping Google Sitemap Ping Endpoint
    try {
      const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      const googleRes = await fetch(googlePingUrl, { method: 'GET', headers: { 'User-Agent': 'HoomMagazine-SEO/2.0' } })
      results.push({ service: 'Google Ping', status: googleRes.status, ok: googleRes.ok })
    } catch (e) {
      results.push({ service: 'Google Ping', ok: false, error: e.message })
    }

    // 2. Ping Bing / IndexNow Endpoint
    try {
      const indexNowUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      const bingRes = await fetch(indexNowUrl, { method: 'GET', headers: { 'User-Agent': 'HoomMagazine-SEO/2.0' } })
      results.push({ service: 'Bing / IndexNow', status: bingRes.status, ok: bingRes.ok })
    } catch (e) {
      results.push({ service: 'Bing / IndexNow', ok: false, error: e.message })
    }

    return res.status(200).json({
      success: true,
      message: 'Sinyal indexing berhasil dikirimkan ke Google & Search Engine!',
      sitemapUrl,
      results
    })
  } catch (err) {
    console.error('SEO Ping error:', err)
    return res.status(500).json({ success: false, message: 'Gagal mengirimkan sinyal indexing' })
  }
}
