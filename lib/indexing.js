import prisma from '@/lib/prisma'
import crypto from 'crypto'

/**
 * Generates an OAuth2 JWT and retrieves an access token for the Google Indexing API
 * using native Node.js crypto (zero external npm dependencies required).
 */
async function getGoogleAccessToken(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000)
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
  const claimSet = Buffer.from(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url')

  const sign = crypto.createSign('RSA-SHA256')
  sign.update(`${header}.${claimSet}`)
  const signature = sign.sign(privateKey, 'base64url')
  const jwt = `${header}.${claimSet}.${signature}`

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error_description || data.error || 'Autentikasi Google Service Account gagal')
  }
  return data.access_token
}

/**
 * Sends a notification directly to the Google Indexing API (URL_UPDATED or URL_DELETED).
 */
export async function sendGoogleIndexingNotification(url, type = 'URL_UPDATED', clientEmail, privateKey) {
  try {
    const token = await getGoogleAccessToken(clientEmail, privateKey)
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ url, type })
    })
    const data = await res.json()
    return { ok: res.ok, status: res.status, data }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

/**
 * Sends an instant indexing notification to IndexNow API (supported by Bing, Yandex, Seznam, Naver).
 */
export async function sendIndexNowNotification(urlList, host, key) {
  try {
    const urls = Array.isArray(urlList) ? urlList : [urlList]
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `https://${host}/indexnow-key.txt`,
        urlList: urls
      })
    })
    return { ok: res.ok, status: res.status }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

/**
 * Master function triggered automatically whenever an article is published or updated.
 * Operates in non-blocking background mode so user operations never lag.
 */
export function triggerAutoIndexing(post, action = 'publish') {
  if (!post || !post.id) return

  // Fire-and-forget in next tick
  setTimeout(async () => {
    try {
      // 1. Fetch relevant SEO settings
      const settingsList = await prisma.setting.findMany({
        where: {
          key: {
            in: [
              'site_url',
              'google_service_account_json',
              'indexnow_key',
              'auto_index_on_publish'
            ]
          }
        }
      })

      const settings = {}
      settingsList.forEach(s => {
        settings[s.key] = s.value
      })

      // Skip if auto-index is explicitly disabled
      if (settings.auto_index_on_publish === 'false') {
        return
      }

      const domain = (settings.site_url || 'http://localhost:3000').replace(/\/$/, '')
      const articleUrl = `${domain}/blog/${post.id}`
      const sitemapUrl = `${domain}/sitemap.xml`
      const newsSitemapUrl = `${domain}/news-sitemap.xml`

      const log = {
        timestamp: new Date().toISOString(),
        postId: post.id,
        title: post.title,
        url: articleUrl,
        action,
        services: []
      }

      // 2. Google Indexing API
      if (settings.google_service_account_json) {
        try {
          const creds = JSON.parse(settings.google_service_account_json)
          if (creds.client_email && creds.private_key) {
            const googleType = action === 'delete' ? 'URL_DELETED' : 'URL_UPDATED'
            const gRes = await sendGoogleIndexingNotification(
              articleUrl,
              googleType,
              creds.client_email,
              creds.private_key
            )
            log.services.push({
              name: 'Google Indexing API',
              ok: gRes.ok,
              status: gRes.status,
              msg: gRes.ok ? 'Sukses dikirim ke Googlebot' : (gRes.error || `HTTP ${gRes.status}`)
            })
          }
        } catch (e) {
          log.services.push({ name: 'Google Indexing API', ok: false, msg: `JSON error: ${e.message}` })
        }
      } else {
        log.services.push({
          name: 'Google Indexing API',
          ok: null,
          msg: 'Belum dikonfigurasi (opsional: paste Service Account JSON di Pengaturan SEO)'
        })
      }

      // 3. IndexNow API (Bing, Yandex, Seznam, Naver)
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
          const inRes = await sendIndexNowNotification(articleUrl, hostName, indexNowKey)
          log.services.push({
            name: 'IndexNow (Bing & Search Engines)',
            ok: inRes.ok,
            status: inRes.status,
            msg: inRes.ok ? 'URL berhasil didaftarkan ke IndexNow' : `HTTP ${inRes.status}`
          })
        } else {
          log.services.push({
            name: 'IndexNow (Bing & Search Engines)',
            ok: true,
            msg: `Siap aktif untuk domain produksi (${indexNowKey.slice(0, 8)}...)`
          })
        }
      } catch (e) {
        log.services.push({ name: 'IndexNow (Bing & Search Engines)', ok: false, msg: e.message })
      }

      // 4. Ping Sitemaps
      try {
        const bingRes = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
          method: 'GET',
          headers: { 'User-Agent': 'DuaNarasi-SEO/2.0' }
        })
        log.services.push({
          name: 'Sitemap Ping',
          ok: bingRes.ok,
          status: bingRes.status,
          msg: `Sitemap berhasil diping (${sitemapUrl})`
        })
      } catch (e) {
        log.services.push({ name: 'Sitemap Ping', ok: false, msg: e.message })
      }

      // 5. Save latest log for dashboard display
      await prisma.setting.upsert({
        where: { key: 'last_indexing_log' },
        update: { value: JSON.stringify(log) },
        create: { key: 'last_indexing_log', value: JSON.stringify(log) }
      }).catch(console.error)

    } catch (err) {
      console.error('Auto-indexing background error:', err)
    }
  }, 100)
}
