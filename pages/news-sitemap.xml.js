import prisma from '@/lib/prisma'
import { normalizeSiteUrl } from '@/lib/siteUrl'

function generateNewsSiteMap({ domain, posts, publicationName }) {
  const cleanDomain = normalizeSiteUrl(domain)

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${posts
    .map((post) => {
      const postUrl = `${cleanDomain}/blog/${post.id}`
      const postDate = new Date(post.createdAt || post.updatedAt).toISOString()
      const postImg = post.img
        ? post.img.startsWith('http')
          ? post.img
          : `${cleanDomain}/assets/img/blog/${post.img}`
        : null

      return `
  <url>
    <loc>${postUrl}</loc>
    <news:news>
      <news:publication>
        <news:name><![CDATA[${publicationName || 'Dua Narasi'}]]></news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${postDate}</news:publication_date>
      <news:title><![CDATA[${post.title || ''}]]></news:title>
    </news:news>
    ${
      postImg
        ? `<image:image>
      <image:loc>${postImg}</image:loc>
      <image:title><![CDATA[${post.title || ''}]]></image:title>
    </image:image>`
        : ''
    }
  </url>`
    })
    .join('')}
</urlset>`
}

export async function getServerSideProps({ req, res }) {
  try {
    const settingsList = await prisma.setting.findMany({
      where: {
        key: { in: ['site_url', 'google_news_name', 'site_title'] }
      }
    })
    const sMap = {}
    settingsList.forEach(s => sMap[s.key] = s.value)

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers['host'] || 'localhost:3000'
    const domain = sMap.site_url?.trim() || `${protocol}://${host}`
    const publicationName = sMap.google_news_name || sMap.site_title || 'Dua Narasi'

    // Google News sitemaps should include news published within the last 48 hours, or latest 1000
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        title: true,
        slug: true,
        img: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' },
      take: 1000
    })

    const newsSitemap = generateNewsSiteMap({ domain, posts, publicationName })

    res.setHeader('Content-Type', 'text/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300')
    res.write(newsSitemap)
    res.end()

    return { props: {} }
  } catch (err) {
    console.error('Error generating Google News sitemap:', err)
    res.statusCode = 500
    res.end()
    return { props: {} }
  }
}

export default function NewsSiteMap() {
  return null
}

