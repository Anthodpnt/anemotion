import { useRef } from 'react'
import gsap, { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Container from '@/components/Container'
import Image from '@/components/Image'

import s from './SectionIntro.module.scss'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Section Configuration
const config = {
  yearMin: 2010,
  yearMax: 2025,
}

config.yearOnRoller = config.yearMax - config.yearMin + 1
config.yearOnTimeline = config.yearMax - config.yearMin

const SectionIntro = () => {
  const years = useRef([])
  const roller = useRef()
  const digits = useRef()
  const section = useRef()
  const progress = useRef()

  // Motion - Year transition on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      // Scroll motion to move digits based on the scroll progress.
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const size = (3 * window.innerHeight) / config.yearOnRoller

          // Calculate the scroll for precise sync between progress and years roll.
          const scrollPos = self.scroll() - self.start
          const maxScroll = config.yearOnRoller * size - window.innerHeight

          // Calculate a scroll progress from 0 to the last year.
          const scrollProgress = Math.min(Math.max(scrollPos / maxScroll, 0), 1) * config.yearOnTimeline

          // Motion of the years on scroll.
          // Years roll on scroll.
          const height = self.progress * 100
          const translation = -(scrollProgress * 4.8)

          gsap.to(digits.current, {
            y: `${translation}rem`,
            ease: 'none',
            duration: 0,
          })

          // Motion of the progress bar & roller position.
          // Both follow the scroll.
          gsap.to(progress.current, {
            height: `${height}%`,
            ease: 'none',
            duration: 0,
          })

          // Active state of the years on the timeline.
          // Calculate an active index based on the scroll progress.
          years.current.forEach((year, i) => year.classList.toggle(s.active, i <= Math.floor(scrollProgress)))

          // Animation fade/scale pour chaque chiffre dans le roller
          const digitElements = digits.current.children
          const activeIndex = Math.round(scrollProgress)
          const maxDistance = 2

          for (let i = 0; i < digitElements.length; i++) {
            const distance = Math.abs(i - activeIndex)
            let ratio = 0

            if (distance <= maxDistance) {
              ratio = 1 - distance / maxDistance
            }

            gsap.to(digitElements[i], {
              scale: 0.6 + 0.4 * ratio,
              opacity: ratio,
              ease: 'power.out',
              duration: 0.6,
            })
          }
        },
      })
    },
    { scope: section, dependencies: [width] }
  )

  return (
    <section ref={section} className={s.section}>
      <Container className={s.container}>
        <div className={s.timeline}>
          {Array.from({ length: config.yearOnTimeline }).map((_, i) => (
            <div ref={(el) => (years.current[i] = el)} key={`year-${config.yearMax - i}`} className={s.date}>
              <span className={s.label}>{config.yearMax - i}</span>
              <span className={s.circle} />
            </div>
          ))}

          <div className={s.bar}>
            <div ref={progress} className={s.progress} />
          </div>
        </div>

        <div ref={roller} className={s.roller}>
          <span className={s.inner}>
            <span className={s.year}>
              <span ref={digits} className={s.digits}>
                {Array.from({ length: config.yearOnRoller }).map((_, i) => (
                  <span key={`roller-year-${config.yearMax - i}`}>{config.yearMax - i}</span>
                ))}
              </span>
            </span>
          </span>
        </div>

        <div className={s.content}>
          <div className={s.image} data-scroll data-scroll-speed="0.1">
            <Image src="//placehold.co/400x600" width={400} height={600} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.2">
            <Image src="//placehold.co/400x600" width={400} height={600} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.3">
            <Image src="//placehold.co/400x600" width={400} height={600} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.3">
            <Image src="//placehold.co/400x600" width={400} height={600} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.2">
            <Image src="//placehold.co/400x600" width={400} height={600} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.1">
            <Image src="//placehold.co/400x600" width={400} height={600} />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SectionIntro
