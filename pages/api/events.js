import { eventBus } from '@/lib/events'

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  // Set SSE Headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Content-Encoding': 'none',
    'X-Accel-Buffering': 'no',
  })

  // Initial handshake
  res.write(`data: ${JSON.stringify({ type: 'connected', time: Date.now() })}\n\n`)

  // Listener for live server events
  const handleUpdate = (eventData) => {
    try {
      res.write(`data: ${JSON.stringify(eventData)}\n\n`)
    } catch (err) {
      console.error('Error writing SSE stream:', err)
    }
  }

  eventBus.on('dashboard_update', handleUpdate)

  // Keep-alive heartbeat every 20 seconds
  const heartbeat = setInterval(() => {
    try {
      res.write(': heartbeat\n\n')
    } catch (e) {}
  }, 20000)

  // Clean up when client disconnects
  req.on('close', () => {
    clearInterval(heartbeat)
    eventBus.off('dashboard_update', handleUpdate)
    res.end()
  })
}
