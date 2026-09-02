import prisma from '@/lib/prisma'
import { sendDashboardEvent } from '@/lib/events'

export default async function handler(req, res) {
  // POST: Create a new comment for a post
  if (req.method === 'POST') {
    try {
      const { postId, name, email, content } = req.body

      if (!postId || !name || !content) {
        return res.status(400).json({ success: false, message: 'postId, name, and content are required' })
      }

      const comment = await prisma.comment.create({
        data: {
          postId: parseInt(postId),
          name: name.trim(),
          email: email ? email.trim() : null,
          content: content.trim()
        },
        include: {
          post: {
            select: { id: true, title: true }
          }
        }
      })

      // Emit real-time SSE event to dashboard
      sendDashboardEvent('new_comment', { comment })

      return res.status(201).json({ success: true, comment })
    } catch (error) {
      console.error('Error creating comment:', error)
      return res.status(500).json({ success: false, message: error.message || 'Failed to submit comment' })
    }
  }

  // GET: Fetch comments (optional filter by postId)
  if (req.method === 'GET') {
    try {
      const { postId, limit = 50 } = req.query
      const whereClause = {}
      if (postId) {
        const parsedId = parseInt(postId)
        if (!isNaN(parsedId)) whereClause.postId = parsedId
      }

      const comments = await prisma.comment.findMany({
        where: whereClause,
        include: {
          post: {
            select: { id: true, title: true, slug: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit) || 50
      })

      return res.status(200).json({ success: true, comments })
    } catch (error) {
      console.error('Error fetching comments:', error)
      return res.status(500).json({ success: false, message: error.message, comments: [] })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
