import { useRef } from 'react'
import cn from 'clsx'

import { useMaskMotion } from '@motion/useMaskMotion'

import s from './Mask.module.scss'

const Mask = ({ children, className }) => {
  const scope = useRef()
  const target = useRef()
  const content = useRef()

  // Motion - Mask Reveal
  useMaskMotion(scope, target, content)

  return (
    <div ref={scope} className={cn(s.mask, className)}>
      <div ref={target} className={s.target}>
        <div ref={content} className={s.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Mask;
