import prisma from '@/lib/prisma'
import fs from 'fs'
import path from 'path'
import { hashPassword } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // 1. Seed Default Users with Roles
    const defaultUsers = [
      {
        name: 'Admin Hoom',
        email: 'admin@hoom.com',
        password: hashPassword('admin123'),
        role: 'ADMIN',
        avatar: '/assets/img/author/qa-author.webp',
        bio: 'System Administrator & Chief Editor.'
      },
      {
        name: 'Sarah Connor',
        email: 'editor@hoom.com',
        password: hashPassword('editor123'),
        role: 'EDITOR',
        avatar: '/assets/img/author/author-2.webp',
        bio: 'Senior Content Editor & Publisher.'
      },
      {
        name: 'Alexis Dowson',
        email: 'author@hoom.com',
        password: hashPassword('author123'),
        role: 'AUTHOR',
        avatar: '/assets/img/author/author-1.webp',
        bio: 'Tech Columnist & UI Architect.'
      },
      {
        name: 'John Reader',
        email: 'subscriber@hoom.com',
        password: hashPassword('user123'),
        role: 'SUBSCRIBER',
        avatar: '/assets/img/author/author-1.webp',
        bio: 'Active Community Reader.'
      }
    ]

    for (const u of defaultUsers) {
      await prisma.user.upsert({
        where: { email: u.email },
        update: {
          password: u.password,
          role: u.role
        },
        create: u
      })
    }

    const blogJsonPath = path.join(process.cwd(), 'util/blog.json')
    let blogData = []
    if (fs.existsSync(blogJsonPath)) {
      const fileContent = fs.readFileSync(blogJsonPath, 'utf8')
      blogData = JSON.parse(fileContent)
    }

    // 2. Default Categories
    const defaultCategories = [
      { name: 'Technology', slug: 'technology', description: 'Tech trends, AI, and developer tools' },
      { name: 'Design', slug: 'design', description: 'UI/UX design systems, layout, and visual arts' },
      { name: 'Marketing', slug: 'marketing', description: 'Digital marketing and SEO strategies' },
      { name: 'Travel', slug: 'travel', description: 'Travel guides and global adventures' },
      { name: 'Lifestyle', slug: 'lifestyle', description: 'Modern lifestyle and wellness' },
      { name: 'Podcast', slug: 'podcast', description: 'Audio shows and creator talks' }
    ]

    const categoryMap = {}
    for (const cat of defaultCategories) {
      const c = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      })
      categoryMap[cat.slug] = c.id
    }

    // 3. Map Authors from Users
    const users = await prisma.user.findMany()
    const authorMap = {}
    for (const u of users) {
      authorMap[u.name] = u.id
      authorMap[u.email] = u.id
    }

    // 4. Seed Posts
    let seededCount = 0
    const sampleExcerpts = [
      "Discover modern methodologies and best practices for creating delightful digital experiences.",
      "A deep dive into cutting-edge workflows, layout grids, and scalable design architectures.",
      "How leading design teams leverage automated tools and creative thinking to scale impact.",
      "Exploring the intersection of human creativity, artificial intelligence, and digital journalism."
    ]

    const authorIds = Object.values(authorMap)
    const categoryIds = Object.values(categoryMap)

    for (let i = 0; i < blogData.length; i++) {
      const item = blogData[i]
      if (!item.title) continue

      const baseSlug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `post-${item.id || i + 1}`

      const uniqueSlug = `${baseSlug}-${item.id || i + 1}`
      const catSlug = (item.category || 'design').toLowerCase()
      const categoryId = categoryMap[catSlug] || categoryIds[i % categoryIds.length]
      const authorId = authorMap[item.author] || authorIds[i % authorIds.length]

      await prisma.post.upsert({
        where: { slug: uniqueSlug },
        update: {
          categoryId,
          authorId
        },
        create: {
          title: item.title,
          slug: uniqueSlug,
          excerpt: item.excerpt || sampleExcerpts[i % sampleExcerpts.length],
          content: item.content || `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
          img: item.img || `blog-2-${(i % 8) + 1}.webp`,
          categoryId,
          authorId,
          views: Math.floor(Math.random() * 1200) + 50,
          status: 'PUBLISHED',
          featured: i < 3,
        },
      })
      seededCount++
    }

    return res.status(200).json({
      success: true,
      message: `Database successfully seeded with ${defaultUsers.length} users, ${seededCount} posts, categories, and authors!`
    })
  } catch (error) {
    console.error('Error during API seeding:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to seed database'
    })
  }
}
