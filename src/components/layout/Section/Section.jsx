import { forwardRef } from 'react'
import cn from 'clsx'

import Container from '@layout/Container'

import s from './Section.module.scss'

const Section = forwardRef(({ children, className }, ref) => {
  return (
    <section ref={ref} className={cn(s.section, className)}>
      <Container>{children}</Container>
    </section>
  )
})

export default Section
