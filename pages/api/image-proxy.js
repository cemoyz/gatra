import https from 'https'
import http from 'http'
import { URL } from 'url'

export const config = {
  api: {
    responseLimit: false,
  },
}

// Known real ImgBB CDN IPs to bypass Kominfo / Internet Positif DNS poisoning in Indonesia
const IMGBB_IPS = ['45.43.142.4', '45.43.142.2', '45.43.142.3', '45.43.142.5']

export default async function handler(req, res) {
  const { url } = req.query

  if (!url || typeof url !== 'string') {
    return res.status(400).send('Image URL parameter is required')
  }

  let parsedUrl
  try {
    parsedUrl = new URL(url)
  } catch (err) {
    return res.status(400).send('Invalid image URL format')
  }

  const isHttps = parsedUrl.protocol === 'https:'
  const isImgbb = parsedUrl.hostname.includes('ibb.co')

  const fetchWithFallback = (targetHost, isIpOverride = false) => {
    const client = isHttps ? https : http

    const options = {
      host: targetHost,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      servername: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'Host': parsedUrl.hostname,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': '',
      },
      timeout: 10000,
      rejectUnauthorized: false,
    }

    const request = client.request(options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        let redirectUrl = response.headers.location
        if (redirectUrl.startsWith('/')) {
          redirectUrl = `${parsedUrl.protocol}//${parsedUrl.host}${redirectUrl}`
        }
        return handler({ ...req, query: { url: redirectUrl } }, res)
      }

      if (response.statusCode >= 400) {
        return res.status(response.statusCode).send('Failed to fetch image')
      }

      const contentType = response.headers['content-type'] || 'image/jpeg'
      res.setHeader('Content-Type', contentType)
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      
      response.pipe(res)
    })

    request.on('timeout', () => {
      request.destroy(new Error('Request timed out'))
    })

    request.on('error', (err) => {
      if (!isIpOverride && isImgbb) {
        // Fallback to real ImgBB CDN IP if DNS resolution failed
        return fetchWithFallback(IMGBB_IPS[0], true)
      }
      console.error('Image proxy error:', err.message)
      if (!res.headersSent) {
        res.status(500).send('Error loading image')
      }
    })

    request.end()
  }

  try {
    // If it's ImgBB, use direct IP or hostname
    if (isImgbb) {
      fetchWithFallback(IMGBB_IPS[0], true)
    } else {
      fetchWithFallback(parsedUrl.hostname, false)
    }
  } catch (error) {
    console.error('Image proxy handler error:', error)
    if (!res.headersSent) {
      res.status(500).send('Error loading image')
    }
  }
}

