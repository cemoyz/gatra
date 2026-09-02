import React, { useEffect, useState } from 'react'

export function AnimatedCounter({ value = 0, duration = 1200, formatter }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTimestamp = null
    const target = Number(value) || 0
    const initial = 0

    if (target === 0) {
      setDisplayValue(0)
      return
    }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(initial + (target - initial) * easeOut)
      setDisplayValue(current)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setDisplayValue(target)
      }
    }

    const frameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frameId)
  }, [value, duration])

  if (formatter) {
    return <>{formatter(displayValue)}</>
  }

  return <>{displayValue.toLocaleString()}</>
}

export default AnimatedCounter
