import prisma from '@/lib/prisma'

function generateSiteMap({ domain, posts, categories, authors }) {
  const cleanDomain = (domain || 'http://localhost:3000').replace(/\/$/, '')
  const currentDate = new Date().toISOString()

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage -->
  <url>
    <loc>${cleanDomain}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Main Portal Pages -->
  <url>
    <loc>${cleanDomain}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanDomain}/about-us</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${cleanDomain}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Published Articles (Google News & Search Sitemap) -->
  ${posts
    .map((post) => {
      const postUrl = `${cleanDomain}/blog/${post.id}`
      const postDate = new Date(post.updatedAt || post.createdAt).toISOString()
      const postImg = post.img
        ? post.img.startsWith('http')
          ? post.img
          : `${cleanDomain}/assets/img/blog/${post.img}`
        : null

      return `
  <url>
    <loc>${postUrl}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
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

  <!-- Categories -->
  ${categories
    .map((cat) => {
      return `
  <url>
    <loc>${cleanDomain}/blog-filter-category?cat=${encodeURIComponent(cat.slug)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
    })
    .join('')}

  <!-- Authors / Journalists -->
  ${authors
    .map((author) => {
      return `
  <url>
    <loc>${cleanDomain}/author?id=${author.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    })
    .join('')}
</urlset>`
}

export async function getServerSideProps({ req, res }) {
  try {
    // Get Site URL from database settings or request host
    const setting = await prisma.setting.findUnique({ where: { key: 'site_url' } })
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers['host'] || 'localhost:3000'
    const domain = setting?.value?.trim() || `${protocol}://${host}`

    // Fetch published articles
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

    // Fetch categories
    const categories = await prisma.category.findMany({
      select: { id: true, name: true, slug: true }
    })

    // Fetch authors
    const authors = await prisma.author.findMany({
      select: { id: true, name: true }
    })

    // Generate XML
    const sitemap = generateSiteMap({ domain, posts, categories, authors })

    res.setHeader('Content-Type', 'text/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=600')
    res.write(sitemap)
    res.end()

    return { props: {} }
  } catch (err) {
    console.error('Error generating sitemap:', err)
    res.statusCode = 500
    res.end()
    return { props: {} }
  }
}

export default function SiteMap() {
  return null
}
