const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function seedUsers() {
  console.log('🌱 Seeding user accounts with role permissions...')

  const users = [
    {
      name: 'Admin Hoom',
      email: 'admin@hoom.com',
      password: bcrypt.hashSync('admin123', 10),
      role: 'ADMIN',
      avatar: '/assets/img/author/qa-author.webp',
      bio: 'System Administrator & Chief Editor with full access.'
    },
    {
      name: 'Sarah Connor',
      email: 'editor@hoom.com',
      password: bcrypt.hashSync('editor123', 10),
      role: 'EDITOR',
      avatar: '/assets/img/author/author-2.webp',
      bio: 'Senior Content Editor & Publisher.'
    },
    {
      name: 'Alexis Dowson',
      email: 'author@hoom.com',
      password: bcrypt.hashSync('author123', 10),
      role: 'AUTHOR',
      avatar: '/assets/img/author/author-1.webp',
      bio: 'Tech Columnist & UI Architect.'
    },
    {
      name: 'John Reader',
      email: 'subscriber@hoom.com',
      password: bcrypt.hashSync('user123', 10),
      role: 'SUBSCRIBER',
      avatar: '/assets/img/author/author-1.webp',
      bio: 'Active Community Reader.'
    }
  ]

  for (const user of users) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        password: user.password,
        role: user.role,
        bio: user.bio
      },
      create: user
    })
    console.log(`✅ User seeded: [${created.role}] ${created.name} (${created.email})`)
  }

  console.log('\n🎉 All users have been successfully seeded!')
  console.log('----------------------------------------------------')
  console.log('👑 Admin:      admin@hoom.com      / admin123')
  console.log('✍️ Editor:     editor@hoom.com     / editor123')
  console.log('📝 Author:     author@hoom.com     / author123')
  console.log('👤 Subscriber: subscriber@hoom.com / user123')
  console.log('----------------------------------------------------')
}

seedUsers()
  .catch((e) => {
    console.error('❌ Error seeding users:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
