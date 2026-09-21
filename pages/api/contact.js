import prisma from '@/lib/prisma'
import { sendDashboardEvent } from '@/lib/events'
import { requireApiAuth, ROLES } from '@/lib/rbac-server'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message } = req.body

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Nama, email, dan pesan wajib diisi.'
        })
      }

      const newMsg = await prisma.contactMessage.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone ? phone.trim() : null,
          subject: subject ? subject.trim() : 'General Inquiry',
          message: message.trim(),
          status: 'UNREAD'
        }
      })

      // Emit real-time SSE event to dashboard
      sendDashboardEvent('new_message', { message: newMsg })

      return res.status(201).json({
        success: true,
        message: 'Pesan Anda telah berhasil dikirim! Tim kami akan segera menghubungi Anda.',
        data: newMsg
      })
    } catch (error) {
      console.error('Error creating contact message:', error)
      return res.status(500).json({
        success: false,
        message: error.message || 'Gagal mengirim pesan'
      })
    }
  }

  if (req.method === 'GET') {
    const authUser = await requireApiAuth(req, res, [ROLES.ADMIN, ROLES.EDITOR])
    if (!authUser) return
    try {
      const { status } = req.query
      const whereClause = {}
      if (status && status !== 'all') {
        whereClause.status = String(status).toUpperCase()
      }

      const messages = await prisma.contactMessage.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
      })

      const unreadCount = await prisma.contactMessage.count({
        where: { status: 'UNREAD' }
      })

      return res.status(200).json({
        success: true,
        messages,
        unreadCount
      })
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      return res.status(500).json({
        success: false,
        message: error.message,
        messages: []
      })
    }
  }

  if (req.method === 'PUT') {
    const authUser = await requireApiAuth(req, res, [ROLES.ADMIN, ROLES.EDITOR])
    if (!authUser) return
    try {
      const { action } = req.body
      if (action === 'mark_all_read') {
        await prisma.contactMessage.updateMany({
          where: { status: 'UNREAD' },
          data: { status: 'READ' }
        })
        return res.status(200).json({ success: true, message: 'Semua pesan berhasil ditandai sebagai sudah dibaca' })
      }
      return res.status(400).json({ success: false, message: 'Aksi tidak valid' })
    } catch (error) {
      console.error('Error updating contact messages:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
