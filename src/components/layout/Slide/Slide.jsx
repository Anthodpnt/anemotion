import { forwardRef } from 'react'
import cn from 'clsx'

import s from './Slide.module.scss'

const Slide = forwardRef(({ children, className }, ref) => {
  return (
    <div ref={ref} className={cn(s.slide, className)}>
      {children}
    </div>
  )
})

export default Slide
