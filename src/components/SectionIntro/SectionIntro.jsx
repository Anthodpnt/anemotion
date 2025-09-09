import { useRef } from 'react'
import gsap, { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Container from '@/components/Container'

import s from './SectionIntro.module.scss'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const SectionIntro = () => {
  const digits = useRef([])
  const section = useRef()

  // Motion - Year transition on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      // Initialize the position of digits.
      const yearDigits = '2023'.split('')

      yearDigits.forEach((digit, i) => {
        const targetY = -parseInt(digit) * 6.4 + 'rem'

        gsap.set(digits.current[i], {
          y: targetY,
        })
      })

      // Scroll motion to move digits based on the scroll progress.
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const year = 2023 - Math.round(self.progress * 10)
          const yearDigits = year.toString().split('')

          yearDigits.forEach((digit, i) => {
            const targetY = -parseInt(digit) * 6.4 + 'rem'

            gsap.to(digits.current[i], {
              y: targetY,
              ease: 'power2.out',
              duration: 0.6,
            })
          })
        },
      })
    },
    { scope: section, dependencies: [width] }
  )

  return (
    <section ref={section} className={s.section}>
      <Container className={s.container}>
        <div className={s.timeline}>
          <span className={s.date}>2025</span>
          <span className={s.date}>2024</span>
          <span className={s.date}>2023</span>
          <span className={s.date}>2022</span>
          <span className={s.date}>2021</span>
          <span className={s.date}>2020</span>
          <span className={s.date}>2019</span>
          <span className={s.date}>2018</span>
          <span className={s.date}>2017</span>
          <span className={s.date}>2016</span>
          <span className={s.date}>2015</span>
          <span className={s.date}>2014</span>
          <span className={s.date}>2013</span>
          <span className={s.date}>2012</span>
          <span className={s.date}>2011</span>
        </div>

        <div className={s.content}>
          <h2 className={s.title}>
            <span className={s.year}>
              {Array.from('2023').map((_, i) => (
                <span key={`digits-${i}`} className={s.digits}>
                  <span ref={(el) => (digits.current[i] = el)} className={s.digitsColumn}>
                    {Array.from({ length: 10 }).map((_, n) => (
                      <span key={`digits-${i}__${n}`} className={s.digitsNumber}>
                        {n}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </span>
          </h2>
        </div>
      </Container>
    </section>
  )
}

export default SectionIntro
