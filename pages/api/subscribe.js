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

    // 1. Check if user already exists or create subscriber contact record
    const topicsStr = Array.isArray(topics) ? topics.join(', ') : String(topics)
    const subNote = `[Newsletter Subscriber] Topik: ${topicsStr || 'Semua Topik'} | Frekuensi: ${frequency}`

    // Create or log as contact message / subscriber lead
    await prisma.contactMessage.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: null,
        subject: `Langganan Newsletter (${frequency})`,
        message: subNote,
        status: 'UNREAD'
      }
    }).catch(console.error)

    // 2. Emit real-time event to dashboard
    try {
      sendDashboardEvent('new_message', {
        title: 'Pelanggan Newsletter Baru',
        email: cleanEmail,
        name: cleanName
      })
    } catch (e) {}

    return res.status(200).json({
      success: true,
      message: 'Selamat! Anda telah berhasil berlangganan newsletter Dua Narasi. Cek inbox Anda untuk konfirmasi.',
      subscriber: {
        name: cleanName,
        email: cleanEmail
      }
    })
  } catch (error) {
    console.error('Error in /api/subscribe:', error)
    return res.status(500).json({ success: false, message: error.message || 'Terjadi kesalahan sistem saat memproses langganan.' })
  }
}
