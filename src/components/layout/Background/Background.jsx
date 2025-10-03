import { forwardRef, useRef, useImperativeHandle } from 'react'

import { useBackgroundMotion } from '@motion/useBackgroundMotion'

import s from './Background.module.scss'

const Background = forwardRef((_, ref) => {
  const target = useRef()

  // Motion - Background Stretch on scroll.
  useBackgroundMotion(target)

  // Forward the ref to the parent component.
  useImperativeHandle(ref, () => target.current)

  return <div ref={target} className={s.background} />
})

export default Background
