import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query
  const messageId = parseInt(id)

  if (isNaN(messageId)) {
    return res.status(400).json({ success: false, message: 'Invalid message ID' })
  }

  // PUT update message status (READ, UNREAD, REPLIED)
  if (req.method === 'PUT') {
    try {
      const { status } = req.body
      if (!status) {
        return res.status(400).json({ success: false, message: 'Status is required' })
      }

      const updated = await prisma.contactMessage.update({
        where: { id: messageId },
        data: { status: String(status).toUpperCase() }
      })

      return res.status(200).json({ success: true, message: updated })
    } catch (error) {
      console.error('Error updating contact message:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // DELETE contact message
  if (req.method === 'DELETE') {
    try {
      await prisma.contactMessage.delete({
        where: { id: messageId }
      })

      return res.status(200).json({ success: true, message: 'Pesan berhasil dihapus' })
    } catch (error) {
      console.error('Error deleting contact message:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
