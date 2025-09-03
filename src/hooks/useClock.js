import { useEffect, useRef, useState } from 'react'

/**
 * Create a clock that returns the current time.
 * @returns {string} The current time in HH:MM format
 */
export const useClock = () => {
  const interval = useRef()
  const [clock, setClock] = useState('00:00')

  useEffect(() => {
    interval.current = setInterval(() => {
      const date = new Date()
      const HH = String(date.getHours()).padStart(2, '0')
      const MM = String(date.getMinutes()).padStart(2, '0')
      setClock(`${HH}:${MM}`)
    }, 1000)

    return () => {
      interval.current && clearInterval(interval.current)
    }
  }, [])

  return clock
}
