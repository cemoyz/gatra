const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// Precomputed bcrypt hashes (cost factor 10)
const HASHED_PASSWORDS = {
  admin: '$2b$10$RfpAOodCDL4Z4DEkIN7CcuRFF4.EiL9CuozCqqFoWfNuQ1A2lq5EG', // admin123
  editor: '$2b$10$qRbV8mNimzHPBtXZQ0704ewEiPPNXjqf/uEf/AsPo.0KJzKpP.LuO', // editor123
  author: '$2b$10$NBgteF.PCpyHSCfGBcEiBew1JTciPNP12o8HpCn3UQeT5/Gsfs7hq', // author123
  user: '$2b$10$YI/yhtfTQB69crpwc3ZDe.p.0hQ8A1DzgDJYKwNhVSEmAsZUSIK.6' // user123
}

async function main() {
  console.log('🌱 Starting database relational & user seeding...')

  // 0. Seed Users with Roles
  const defaultUsers = [
    {
      name: 'Admin Hoom',
      email: 'admin@hoom.com',
      password: HASHED_PASSWORDS.admin,
      role: 'ADMIN',
      avatar: '/assets/img/author/qa-author.webp',
      bio: 'System Administrator & Chief Editor.'
    },
    {
      name: 'Sarah Connor (Editor)',
      email: 'editor@hoom.com',
      password: HASHED_PASSWORDS.editor,
      role: 'EDITOR',
      avatar: '/assets/img/author/author-2.webp',
      bio: 'Senior Content Editor & Publisher.'
    },
    {
      name: 'Alexis Dowson (Author)',
      email: 'author@hoom.com',
      password: HASHED_PASSWORDS.author,
      role: 'AUTHOR',
      avatar: '/assets/img/author/author-1.webp',
      bio: 'Tech Columnist & UI Architect.'
    },
    {
      name: 'John Reader',
      email: 'subscriber@hoom.com',
      password: HASHED_PASSWORDS.user,
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
  console.log('✅ Users with roles (ADMIN, EDITOR, AUTHOR, SUBSCRIBER) seeded.')

  // Load existing posts from util/blog.json
  const blogJsonPath = path.join(__dirname, '../util/blog.json')
  let blogData = []
  if (fs.existsSync(blogJsonPath)) {
    const fileContent = fs.readFileSync(blogJsonPath, 'utf8')
    blogData = JSON.parse(fileContent)
  }

  // 1. Seed Categories
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
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
    categoryMap[cat.slug] = created.id
    categoryMap[cat.name.toLowerCase()] = created.id
  }
  console.log('✅ Categories seeded.')

  // 2. Fetch Users for Author mapping
  const users = await prisma.user.findMany()
  const authorMap = {}
  for (const u of users) {
    authorMap[u.name] = u.id
    authorMap[u.email] = u.id
  }
  const authorIds = users.filter(u => u.role !== 'SUBSCRIBER').map(u => u.id)
  console.log('✅ Authors mapped to users.')

  // 3. Seed Tags
  const defaultTags = ['Design', 'Development', 'AI', 'Technology', 'UI/UX', 'Trends', 'Marketing', 'Travel', 'Lifestyle', 'Podcast']
  const tagMap = {}
  for (const tagName of defaultTags) {
    const slug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const created = await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name: tagName, slug }
    })
    tagMap[slug] = created.id
  }
  console.log('✅ Tags seeded.')

  // 4. Seed Posts with Relations
  let seededCount = 0
  const sampleExcerpts = [
    "Discover modern methodologies and best practices for creating delightful digital experiences.",
    "A deep dive into cutting-edge workflows, layout grids, and scalable design architectures.",
    "How leading design teams leverage automated tools and creative thinking to scale impact.",
    "Exploring the intersection of human creativity, artificial intelligence, and digital journalism."
  ]

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

    const postData = {
      title: item.title,
      slug: uniqueSlug,
      excerpt: item.excerpt || sampleExcerpts[i % sampleExcerpts.length],
      content: item.content || `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
      img: item.img || `blog-2-${(i % 8) + 1}.webp`,
      categoryId: categoryId,
      authorId: authorId,
      views: Math.floor(Math.random() * 1200) + 50,
      status: 'PUBLISHED',
      featured: i < 3,
      postType: i === 1 ? 'video' : i === 4 ? 'audio' : i === 7 ? 'quote' : 'standard',
      videoUrl: i === 1 ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : null,
      audioUrl: i === 4 ? 'https://soundcloud.com/stream' : null,
      quoteText: i === 7 ? 'Design is not just what it looks like and feels like. Design is how it works.' : null,
      quoteAuthor: i === 7 ? 'Steve Jobs' : null,
    }

    const post = await prisma.post.upsert({
      where: { slug: uniqueSlug },
      update: {
        categoryId,
        authorId
      },
      create: postData,
    })

    if (i < 5) {
      await prisma.comment.create({
        data: {
          name: 'Alonso D. Humble',
          email: 'alonso@example.com',
          content: 'Great perspective on this topic. Looking forward to more articles!',
          postId: post.id
        }
      }).catch(() => {})
    }

    seededCount++
  }

  console.log(`✅ Seeded ${seededCount} posts, categories, authors, and users successfully!`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
