import { forwardRef } from 'react'

import { useBackgroundMotion } from '@motion/useBackgroundMotion'

import s from './Background.module.scss'

const Background = forwardRef((_, ref) => {
  // Motion - Background Stretch on scroll.
  useBackgroundMotion(ref)

  return <div ref={ref} className={s.background} />
})

export default Background
