import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { search, status, frequency, topic } = req.query

      // 1. Fetch from subscribers table
      let dbSubscribers = []
      try {
        if (prisma.subscriber) {
          dbSubscribers = await prisma.subscriber.findMany({
            orderBy: { createdAt: 'desc' }
          })
        }
      } catch (e) {
        dbSubscribers = await prisma.$queryRawUnsafe(
          `SELECT id, email, name, topics, frequency, status, "createdAt", "updatedAt" FROM subscribers ORDER BY "createdAt" DESC`
        ).catch(() => [])
      }

      // 2. Fetch newsletter leads from contact messages
      const newsletterMessages = await prisma.contactMessage.findMany({
        where: {
          subject: { contains: 'Langganan Newsletter', mode: 'insensitive' }
        },
        orderBy: { createdAt: 'desc' }
      }).catch(() => [])

      // 3. Fetch users with SUBSCRIBER role
      const subscriberUsers = await prisma.user.findMany({
        where: { role: 'SUBSCRIBER' },
        orderBy: { createdAt: 'desc' }
      }).catch(() => [])

      // Merge and deduplicate by email
      const map = new Map()

      // Primary: subscriber records from PostgreSQL subscribers table
      dbSubscribers.forEach(sub => {
        if (sub.email) {
          map.set(sub.email.toLowerCase(), {
            id: sub.id,
            email: sub.email.toLowerCase(),
            name: sub.name || sub.email.split('@')[0],
            topics: sub.topics || 'Semua Topik',
            frequency: sub.frequency || 'weekly',
            status: sub.status || 'ACTIVE',
            createdAt: sub.createdAt,
            source: 'Newsletter Form'
          })
        }
      })

      // Secondary: contact messages (parse topics & frequency from message body)
      newsletterMessages.forEach(msg => {
        const cleanEmail = msg.email.toLowerCase()
        let parsedTopics = 'Semua Topik'
        let parsedFreq = 'weekly'

        if (msg.message) {
          if (msg.message.includes('Topik:')) {
            const match = msg.message.match(/Topik:\s*([^|]+)/)
            if (match && match[1] && match[1].trim()) {
              parsedTopics = match[1].trim()
            }
          }
          if (msg.message.includes('Frekuensi:')) {
            const match = msg.message.match(/Frekuensi:\s*([^\s|]+)/)
            if (match && match[1] && match[1].trim()) {
              parsedFreq = match[1].trim()
            }
          }
        }

        if (!map.has(cleanEmail)) {
          map.set(cleanEmail, {
            id: `msg-${msg.id}`,
            email: cleanEmail,
            name: msg.name || cleanEmail.split('@')[0],
            topics: parsedTopics,
            frequency: parsedFreq,
            status: 'ACTIVE',
            createdAt: msg.createdAt,
            source: 'Form Kontak'
          })
        } else {
          // If existing subscriber in map has default 'Semua Topik' but msg has specific topics, update it!
          const existing = map.get(cleanEmail)
          if ((!existing.topics || existing.topics === 'Semua Topik') && parsedTopics !== 'Semua Topik') {
            existing.topics = parsedTopics
          }
        }
      })

      // Tertiary: user accounts with SUBSCRIBER role
      subscriberUsers.forEach(u => {
        const cleanEmail = u.email.toLowerCase()
        if (!map.has(cleanEmail)) {
          map.set(cleanEmail, {
            id: `usr-${u.id}`,
            email: cleanEmail,
            name: u.name || cleanEmail.split('@')[0],
            topics: 'Semua Topik',
            frequency: 'weekly',
            status: 'ACTIVE',
            createdAt: u.createdAt,
            source: 'Akun Terdaftar'
          })
        }
      })

      let result = Array.from(map.values())

      // Apply filtering if provided
      if (search) {
        const q = search.toLowerCase()
        result = result.filter(s => s.email.includes(q) || s.name.toLowerCase().includes(q) || (s.topics && s.topics.toLowerCase().includes(q)))
      }
      if (status && status !== 'ALL') {
        result = result.filter(s => s.status === status)
      }
      if (frequency && frequency !== 'ALL') {
        result = result.filter(s => s.frequency === frequency)
      }
      if (topic && topic !== 'ALL') {
        result = result.filter(s => s.topics && s.topics.toLowerCase().includes(topic.toLowerCase()))
      }

      return res.status(200).json({
        success: true,
        subscribers: result,
        total: result.length,
        stats: {
          total: map.size,
          active: Array.from(map.values()).filter(s => s.status === 'ACTIVE').length,
          unsubscribed: Array.from(map.values()).filter(s => s.status === 'UNSUBSCRIBED').length
        }
      })
    } catch (error) {
      console.error('Error fetching subscribers:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  if (req.method === 'POST') {
    try {
      const { email, name, topics, frequency, status } = req.body

      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Alamat email valid wajib diisi' })
      }

      const cleanEmail = email.trim().toLowerCase()
      const cleanName = (name || cleanEmail.split('@')[0]).trim()
      const topicsStr = Array.isArray(topics) ? topics.join(', ') : (topics || 'Semua Topik')

      let newSub
      try {
        if (prisma.subscriber) {
          newSub = await prisma.subscriber.upsert({
            where: { email: cleanEmail },
            update: {
              name: cleanName,
              topics: topicsStr,
              frequency: frequency || 'weekly',
              status: status || 'ACTIVE'
            },
            create: {
              email: cleanEmail,
              name: cleanName,
              topics: topicsStr,
              frequency: frequency || 'weekly',
              status: status || 'ACTIVE'
            }
          })
        }
      } catch (e) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO subscribers (email, name, topics, frequency, status, "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
           ON CONFLICT (email) DO UPDATE SET name = $2, topics = $3, frequency = $4, status = $5, "updatedAt" = NOW()`,
          cleanEmail, cleanName, topicsStr, frequency || 'weekly', status || 'ACTIVE'
        ).catch(() => {})
      }

      return res.status(201).json({
        success: true,
        message: 'Subscriber berhasil ditambahkan',
        subscriber: newSub || { email: cleanEmail, name: cleanName, topics: topicsStr }
      })
    } catch (error) {
      console.error('Error creating subscriber:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' })
}
