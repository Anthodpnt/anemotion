import { useEffect, useState } from 'react'
import cn from 'clsx'

import s from './Caption.module.scss'

const Caption = ({ children, className }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const center = window.innerWidth / 2
      const progress = (e.clientX - center) / center
      setOffset(progress * -1)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <p style={{ '--fade': `${Math.abs(offset)}px`, '--offset': `${offset}px` }} className={cn(s.caption, className)}>
      {children}
    </p>
  )
}

export default Caption
