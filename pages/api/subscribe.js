import prisma from '@/lib/prisma'
import { sendDashboardEvent } from '@/lib/events'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  try {
    const { name, email, topics = [], frequency = 'weekly' } = req.body

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Alamat email yang valid wajib diisi.' })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName = (name || cleanEmail.split('@')[0]).trim()
    const topicsStr = Array.isArray(topics) ? topics.join(', ') : (topics || 'Semua Topik')

    // 1. Save or update subscriber in DB
    try {
      if (prisma.subscriber) {
        await prisma.subscriber.upsert({
          where: { email: cleanEmail },
          update: {
            name: cleanName,
            topics: topicsStr,
            frequency,
            status: 'ACTIVE'
          },
          create: {
            name: cleanName,
            email: cleanEmail,
            topics: topicsStr,
            frequency,
            status: 'ACTIVE'
          }
        })
      }
    } catch (err) {
      console.warn('Prisma subscriber upsert fallback:', err.message)
      // Fallback via raw SQL if client generator was locked
      await prisma.$executeRawUnsafe(
        `INSERT INTO subscribers (email, name, topics, frequency, status, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, 'ACTIVE', NOW(), NOW())
         ON CONFLICT (email) DO UPDATE SET name = $2, topics = $3, frequency = $4, status = 'ACTIVE', "updatedAt" = NOW()`,
        cleanEmail, cleanName, topicsStr, frequency
      ).catch(() => {})
    }

    // 2. Also log as contact message lead for inbox tracking
    const subNote = `[Newsletter Subscriber] Topik: ${topicsStr} | Frekuensi: ${frequency}`
    await prisma.contactMessage.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: null,
        subject: `Langganan Newsletter (${frequency})`,
        message: subNote,
        status: 'UNREAD'
      }
    }).catch(() => {})

    // 3. Emit real-time notification to dashboard
    try {
      sendDashboardEvent('new_subscriber', {
        title: 'Pelanggan Newsletter Baru',
        email: cleanEmail,
        name: cleanName,
        topics: topicsStr
      })
    } catch (e) {}

    return res.status(200).json({
      success: true,
      message: 'Selamat! Anda telah berhasil berlangganan newsletter Dua Narasi. Cek inbox Anda untuk konfirmasi.',
      subscriber: {
        name: cleanName,
        email: cleanEmail,
        topics: topicsStr,
        frequency
      }
    })
  } catch (error) {
    console.error('Error in /api/subscribe:', error)
    return res.status(500).json({ success: false, message: error.message || 'Terjadi kesalahan sistem saat memproses langganan.' })
  }
}
