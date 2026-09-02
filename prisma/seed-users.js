const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Precomputed bcrypt hashes (cost factor 10)
const HASHED_PASSWORDS = {
  admin: '$2b$10$RfpAOodCDL4Z4DEkIN7CcuRFF4.EiL9CuozCqqFoWfNuQ1A2lq5EG', // admin123
  editor: '$2b$10$qRbV8mNimzHPBtXZQ0704ewEiPPNXjqf/uEf/AsPo.0KJzKpP.LuO', // editor123
  author: '$2b$10$NBgteF.PCpyHSCfGBcEiBew1JTciPNP12o8HpCn3UQeT5/Gsfs7hq', // author123
  user: '$2b$10$YI/yhtfTQB69crpwc3ZDe.p.0hQ8A1DzgDJYKwNhVSEmAsZUSIK.6' // user123
}

async function seedUsers() {
  console.log('🌱 Seeding user accounts with role permissions...')

  const users = [
    {
      name: 'Admin Hoom',
      email: 'admin@hoom.com',
      password: HASHED_PASSWORDS.admin,
      role: 'ADMIN',
      avatar: '/assets/img/author/qa-author.webp',
      bio: 'System Administrator & Chief Editor with full access.'
    },
    {
      name: 'Sarah Connor',
      email: 'editor@hoom.com',
      password: HASHED_PASSWORDS.editor,
      role: 'EDITOR',
      avatar: '/assets/img/author/author-2.webp',
      bio: 'Senior Content Editor & Publisher.'
    },
    {
      name: 'Alexis Dowson',
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
