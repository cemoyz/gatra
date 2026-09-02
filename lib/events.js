import { EventEmitter } from 'events'

// Global singleton EventEmitter across Next.js API routes
if (!global.__hoom_event_bus) {
  global.__hoom_event_bus = new EventEmitter()
  global.__hoom_event_bus.setMaxListeners(50)
}

export const eventBus = global.__hoom_event_bus

export function sendDashboardEvent(type, payload = {}) {
  try {
    if (global.__hoom_event_bus) {
      global.__hoom_event_bus.emit('dashboard_update', {
        type,
        payload,
        timestamp: Date.now()
      })
    }
  } catch (err) {
    console.error('Error emitting dashboard event:', err)
  }
}
