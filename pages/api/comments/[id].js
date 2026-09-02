import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query
  const commentId = parseInt(id)

  if (isNaN(commentId)) {
    return res.status(400).json({ success: false, message: 'Invalid comment ID' })
  }

  // DELETE comment
  if (req.method === 'DELETE') {
    try {
      await prisma.comment.delete({
        where: { id: commentId }
      })

      return res.status(200).json({ success: true, message: 'Comment deleted successfully' })
    } catch (error) {
      console.error('Error deleting comment:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to delete comment' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
