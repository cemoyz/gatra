import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const { status, name, topics, frequency } = req.body

      let updated
      const numId = parseInt(id)

      if (!isNaN(numId) && prisma.subscriber) {
        updated = await prisma.subscriber.update({
          where: { id: numId },
          data: {
            ...(status && { status }),
            ...(name && { name }),
            ...(topics && { topics }),
            ...(frequency && { frequency })
          }
        }).catch(console.warn)
      }

      if (!updated && typeof id === 'string') {
        const cleanEmail = id.includes('@') ? id.toLowerCase() : null
        if (cleanEmail) {
          try {
            await prisma.$executeRawUnsafe(
              `UPDATE subscribers SET status = $1, "updatedAt" = NOW() WHERE email = $2`,
              status || 'ACTIVE', cleanEmail
            )
          } catch (e) {}
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Status subscriber berhasil diperbarui',
        subscriber: updated
      })
    } catch (error) {
      console.error('Error updating subscriber:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const numId = parseInt(id)

      if (!isNaN(numId) && prisma.subscriber) {
        await prisma.subscriber.delete({
          where: { id: numId }
        }).catch(() => {})
      } else if (typeof id === 'string') {
        if (id.startsWith('msg-')) {
          const msgId = parseInt(id.replace('msg-', ''))
          if (!isNaN(msgId)) {
            await prisma.contactMessage.delete({ where: { id: msgId } }).catch(() => {})
          }
        } else if (id.includes('@')) {
          await prisma.$executeRawUnsafe(
            `DELETE FROM subscribers WHERE email = $1`, id.toLowerCase()
          ).catch(() => {})
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Subscriber berhasil dihapus'
      })
    } catch (error) {
      console.error('Error deleting subscriber:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' })
}
