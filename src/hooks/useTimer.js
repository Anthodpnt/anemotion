import { useEffect, useRef, useState } from 'react'

/**
 * Create a timer that returns the elapsed time
 * @returns {string} The elapsed time in MM:SS format
 */
export const useTimer = () => {
  const interval = useRef()
  const [timer, setTimer] = useState('00:00')

  useEffect(() => {
    const startTime = Date.now()

    interval.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const MM = String(Math.floor(elapsed / 60)).padStart(2, '0')
      const SS = String(elapsed % 60).padStart(2, '0')
      setTimer(`${MM}:${SS}`)
    }, 1000)

    return () => {
      interval.current && clearInterval(interval.current)
    }
  }, [])

  return timer
}
