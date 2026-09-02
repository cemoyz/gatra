import https from 'https'
import http from 'http'

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(req, res) {
  const { url } = req.query

  if (!url || typeof url !== 'string') {
    return res.status(400).send('Image URL parameter is required')
  }

  try {
    const isHttps = url.startsWith('https')
    const client = isHttps ? https : http

    const options = {
      rejectUnauthorized: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': '',
      },
    }

    client.get(url, options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        return handler({ ...req, query: { url: response.headers.location } }, res)
      }

      res.setHeader('Content-Type', response.headers['content-type'] || 'image/jpeg')
      res.setHeader('Cache-Control', 'public, max-age=86400')
      response.pipe(res)
    }).on('error', (err) => {
      console.error('Image proxy error:', err)
      res.status(500).send('Error loading image')
    })
  } catch (error) {
    console.error('Image proxy handler error:', error)
    res.status(500).send('Error loading image')
  }
}
