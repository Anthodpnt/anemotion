import { useEffect, useState } from 'react'
import cn from 'clsx'

import s from './Button.module.scss'

const Button = ({ children, className, ...props }) => {
  const Tag = props.type === 'button' ? 'button' : 'span'
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const center = window.innerWidth / 2
      const progress = (e.clientX - center) / center
      setAngle(progress * -60)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Tag {...props} style={{ '--angle': `${angle}deg` }} className={cn(s.button, className)}>
      {children}
    </Tag>
  )
}

export default Button
