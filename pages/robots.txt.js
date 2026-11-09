import prisma from '@/lib/prisma'
import { normalizeSiteUrl } from '@/lib/siteUrl'

export async function getServerSideProps({ req, res }) {
  try {
    const setting = await prisma.setting.findUnique({ where: { key: 'site_url' } })
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers['host'] || 'localhost:3000'
    const domain = setting?.value?.trim() || `${protocol}://${host}`
    const cleanDomain = normalizeSiteUrl(domain)

    const robotsContent = `# Googlebot & Web Crawlers Rules for Dua Narasi Portal
User-agent: *
Allow: /
Allow: /blog
Allow: /blog/*
Allow: /breaking-news
Allow: /about-us
Allow: /pedoman-media-siber
Allow: /contact
Allow: /assets/
Allow: /indexnow-key.txt

# Disallow Internal Admin Dashboard and APIs from indexing
Disallow: /dashboard/
Disallow: /dashboard/*
Disallow: /api/
Disallow: /api/*
Disallow: /login
Disallow: /register

# Google News Bot Specific Access
User-agent: Googlebot-News
Allow: /
Allow: /blog/*
Allow: /breaking-news

# XML Sitemaps
Sitemap: ${cleanDomain}/sitemap.xml
Sitemap: ${cleanDomain}/news-sitemap.xml
`

    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600')
    res.write(robotsContent)
    res.end()

    return { props: {} }
  } catch (err) {
    console.error('Error generating robots.txt:', err)
    res.statusCode = 500
    res.end()
    return { props: {} }
  }
}

export default function RobotsTxt() {
  return null
}
