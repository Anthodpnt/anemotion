import { forwardRef, useRef, useImperativeHandle } from 'react'

import { useBackgroundMotion } from '@motion/useBackgroundMotion'

import s from './Background.module.scss'

const Background = forwardRef((_, ref) => {
  const root = useRef()

  // Motion - Background Stretch on scroll.
  useBackgroundMotion(root)

  // Forward the ref to the parent component.
  useImperativeHandle(ref, () => root.current)

  return <div ref={root} className={s.background} />
})

export default Background
