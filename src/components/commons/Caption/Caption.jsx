import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import cn from 'clsx'

import s from './Caption.module.scss'

const Caption = ({ children, className }) => {
  const caption = useRef()

  // Motion - Light animation.
  const [offset, setOffset] = useState(0)
  const { contextSafe } = useGSAP()

  const handleMouseMove = contextSafe((e) => {
    const bounds = caption.current.getBoundingClientRect()

    if (bounds.top >= window.innerHeight || bounds.bottom <= 0) {
      return
    }

    // Move the light based on the cursor position.
    const center = window.innerWidth / 2
    const progress = (e.clientX - center) / center

    setOffset(progress * -1)
  })

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <p
      ref={caption}
      style={{ '--fade': `${Math.abs(offset)}px`, '--offset': `${offset}px` }}
      className={cn(s.caption, className)}
    >
      {children}
    </p>
  )
}

export default Caption
