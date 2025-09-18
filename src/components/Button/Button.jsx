import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import cn from 'clsx'

import s from './Button.module.scss'

const Button = ({ children, className, ...props }) => {
  const Tag = props.type === 'button' ? 'button' : 'span'
  const button = useRef()

  // Motion - Light and magnetic animation.
  const [angle, setAngle] = useState(0)
  const { contextSafe } = useGSAP()

  const handleMouseMove = contextSafe((e) => {
    const bounds = button.current.getBoundingClientRect()

    if (bounds.top >= window.innerHeight || bounds.bottom <= 0) {
      gsap.set(button.current, { clearProps: 'all' })
      return
    }

    // Move the light based on the cursor angle.
    const center = window.innerWidth / 2
    const progress = (e.clientX - center) / center

    setAngle(progress * 45)

    // Magnetic effect.
    const centerX = bounds.left + bounds.width / 2
    const centerY = bounds.top + bounds.height / 2
    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY)

    if (distance < 150) {
      const strength = (1 - distance / 150) * 12
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)

      let x = Math.cos(angle) * strength
      let y = Math.sin(angle) * strength

      if (distance < bounds.width / 2) {
        x = e.clientX - centerX
        y = e.clientY - centerY
      }

      gsap.to(button.current, {
        x,
        y,
        ease: 'power3.out',
        duration: 0.6,
      })
    } else {
      gsap.set(button.current, {
        clearProps: 'x,y',
      })
    }
  })

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <Tag {...props} ref={button} style={{ '--angle': `${angle}deg` }} className={cn(s.button, className)}>
      {children}
    </Tag>
  )
}

export default Button
