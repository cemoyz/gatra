import prisma from '@/lib/prisma'
import { sendGoogleIndexingNotification, sendIndexNowNotification, submitGoogleSitemaps } from '@/lib/indexing'
import crypto from 'crypto'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }
  const authUser = await requireApiAuth(req, res, [ROLES.ADMIN])
  if (!authUser) return

  try {
    const settingsList = await prisma.setting.findMany({
      where: {
        key: {
          in: ['site_url', 'google_search_console_property', 'google_service_account_json', 'indexnow_key']
        }
      }
    })
    const settings = {}
    settingsList.forEach(s => settings[s.key] = s.value)

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers['host'] || 'localhost:3000'
    const domain = (settings.site_url?.trim() || `${protocol}://${host}`).replace(/\/$/, '')
    const sitemapUrl = `${domain}/sitemap.xml`
    const newsSitemapUrl = `${domain}/news-sitemap.xml`
    const siteProperty = settings.google_search_console_property?.trim() || `${domain}/`

    // Fetch latest published articles
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { id: true, title: true },
      orderBy: { createdAt: 'desc' },
      take: 20
    })

    const articleUrls = posts.map(p => `${domain}/blog/${p.id}`)
    const results = []

    // 1. Google Indexing API
    if (settings.google_service_account_json) {
      try {
        const creds = JSON.parse(settings.google_service_account_json)
        if (creds.client_email && creds.private_key) {
          let gCount = 0
          // Notify top 5 latest articles to stay well within burst rate limits
          for (const p of posts.slice(0, 5)) {
            const url = `${domain}/blog/${p.id}`
            const gRes = await sendGoogleIndexingNotification(url, 'URL_UPDATED', creds.client_email, creds.private_key)
            if (gRes.ok) gCount++
          }
          results.push({
            service: 'Google Indexing API',
            ok: gCount > 0,
            status: gCount > 0 ? 200 : null,
            message: `${gCount} artikel berhasil dikirim ke Google Indexing API`
          })

          const sitemapResults = await submitGoogleSitemaps(
            [sitemapUrl, newsSitemapUrl],
            siteProperty,
            creds.client_email,
            creds.private_key
          )
          results.push({
            service: 'Google Search Console Sitemaps',
            ok: sitemapResults.every(result => result.ok),
            status: sitemapResults.every(result => result.ok) ? 200 : null,
            message: sitemapResults.map(result =>
              `${result.sitemapUrl}: ${result.ok ? 'submitted' : result.error || `HTTP ${result.status}`}`
            ).join('; ')
          })
        } else {
          results.push({ service: 'Google Search Console Sitemaps', ok: false, error: 'Service Account JSON tidak memiliki client_email/private_key yang valid' })
        }
      } catch (e) {
        results.push({ service: 'Google Indexing API & Search Console', ok: false, error: e.message })
      }
    } else {
      results.push({
        service: 'Google Indexing API & Search Console Sitemaps',
        ok: null,
        message: 'Google Service Account belum diisi (paste file JSON di tab SEO untuk mengirim sitemap ke Search Console)'
      })
    }

    // 2. IndexNow API (Bing, Yandex, Seznam, Naver)
    let indexNowKey = settings.indexnow_key
    if (!indexNowKey) {
      indexNowKey = crypto.randomBytes(16).toString('hex')
      await prisma.setting.upsert({
        where: { key: 'indexnow_key' },
        update: { value: indexNowKey },
        create: { key: 'indexnow_key', value: indexNowKey }
      }).catch(() => {})
    }

    try {
      let hostName = 'localhost'
      try {
        hostName = new URL(domain).host
      } catch (_) {}

      if (hostName && hostName !== 'localhost' && !hostName.includes('127.0.0.1')) {
        const inRes = await sendIndexNowNotification(articleUrls, hostName, indexNowKey)
        results.push({
          service: 'IndexNow (Bing & Search Engines)',
          ok: inRes.ok,
          status: inRes.status,
          message: inRes.ok
            ? `${articleUrls.length} URL artikel berhasil disubmit secara instan ke IndexNow network`
            : `HTTP ${inRes.status}`
        })
      } else {
        results.push({
          service: 'IndexNow (Bing & Search Engines)',
          ok: true,
          status: 200,
          message: `Kunci IndexNow aktif (${indexNowKey.slice(0, 8)}...). Siap otomatis saat memakai domain publik.`
        })
      }
    } catch (e) {
      results.push({ service: 'IndexNow (Bing & Search Engines)', ok: false, error: e.message })
    }

    // 3. Ping Bing Sitemap
    try {
      const bingRes = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
        method: 'GET',
        headers: { 'User-Agent': 'DuaNarasi-SEO/2.0' }
      })
      results.push({
        service: 'Bing Sitemap Ping',
        status: bingRes.status,
        ok: bingRes.ok,
        message: `Sitemap XML dan News Sitemap berhasil diping`
      })
    } catch (e) {
      results.push({ service: 'Bing Sitemap Ping', ok: false, error: e.message })
    }

    // Save log
    const log = {
      timestamp: new Date().toISOString(),
      action: 'manual_ping',
      urlsCount: articleUrls.length,
      services: results
    }
    await prisma.setting.upsert({
      where: { key: 'last_indexing_log' },
      update: { value: JSON.stringify(log) },
      create: { key: 'last_indexing_log', value: JSON.stringify(log) }
    }).catch(console.error)

    return res.status(200).json({
      success: true,
      message: 'Sinyal indexing berhasil dikirimkan ke mesin pencari!',
      sitemapUrl,
      newsSitemapUrl,
      articlesIndexed: articleUrls.length,
      results
    })
  } catch (err) {
    console.error('SEO Ping error:', err)
    return res.status(500).json({ success: false, message: 'Gagal mengirimkan sinyal indexing' })
  }
}
