import { useRef } from 'react'
import gsap, { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Section from '@layout/Section'
import Image from '@components/Image'

import s from './SectionIntro.module.scss'

// Section Configuration
const config = {
  yearMin: 2010,
  yearMax: 2025,
}

config.yearOnRoller = config.yearMax - config.yearMin + 1
config.yearOnTimeline = config.yearMax - config.yearMin

const SectionIntro = () => {
  const root = useRef()
  const years = useRef([])
  const roller = useRef()
  const digits = useRef()
  const progress = useRef()

  // Motion - Year transition on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      // Motion function.
      const createMotion = (self) => {
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

        gsap.set(digits.current, {
          y: `${translation}rem`,
        })

        // Motion of the progress bar & roller position.
        // Both follow the scroll.
        gsap.set(progress.current, {
          height: `${height}%`,
        })

        // Active state of the years on the timeline.
        // Calculate an active index based on the scroll progress.
        years.current.forEach((year, i) => year.classList.toggle(s.active, i <= Math.floor(scrollProgress)))

        // Motion for each year on scroll for a roll effect.
        const maxDistance = 2
        const activeIndex = Math.round(scrollProgress)
        const digitElements = digits.current.children

        for (let i = 0; i < digitElements.length; i++) {
          const distance = Math.abs(i - activeIndex)
          let ratio = 0

          if (distance <= maxDistance) {
            ratio = Math.pow(1 - distance / maxDistance, 3.5)
          }

          gsap.to(digitElements[i], {
            scale: 0.6 + 0.4 * ratio,
            color: gsap.utils.interpolate('#6d6e88', '#fff', ratio),
            opacity: ratio,
            ease: 'power1.out',
            duration: 0.3,
          })
        }
      }

      // Scroll motion to move digits based on the scroll progress.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: createMotion,
        onRefresh: createMotion,
      })
    },
    { scope: root, dependencies: [width] }
  )

  return (
    <Section ref={root} className={s.section}>
      <div className={s.timeline}>
        {Array.from({ length: config.yearOnTimeline }).map((_, i) => (
          <div ref={(el) => (years.current[i] = el)} key={`year-${config.yearMin + i}`} className={s.date}>
            <span className={s.label}>{config.yearMin + i}</span>
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
                <span key={`roller-year-${config.yearMin + i}`}>{config.yearMin + i}</span>
              ))}
            </span>
          </span>
        </span>
      </div>

      <div className={s.images} data-scroll data-scroll-speed="0.1">
        <div className={s.image}>
          <Image src="/images/intro/tomorrowland.webp" width={400} height={600} />
          <img src="/images/intro/tomorrowland-logo.webp" width={400} height={600} className={s.logo} />
        </div>

        <div className={s.image}>
          <Image src="/images/intro/hape.webp" width={400} height={600} />
          <img src="/images/intro/hape-logo.webp" width={400} height={600} className={s.logo} />
        </div>

        <div className={s.image}>
          <Image src="/images/intro/virgin-galactic.webp" width={400} height={600} />
          <img src="/images/intro/virgin-galactic-logo.webp" width={400} height={600} className={s.logo} />
        </div>

        <div className={s.image}>
          <Image src="/images/intro/adobe.webp" width={400} height={600} />
          <img src="/images/intro/adobe-logo.webp" width={400} height={600} className={s.logo} />
        </div>

        <div className={s.image}>
          <Image src="/images/intro/hugo-boss.webp" width={400} height={600} />
          <img src="/images/intro/hugo-boss-logo.webp" width={400} height={600} className={s.logo} />
        </div>

        <div className={s.image}>
          <Image src="/images/intro/virtual-expo.webp" width={400} height={600} />
          <img src="/images/intro/virtual-expo-logo.webp" width={400} height={600} className={s.logo} />
        </div>
      </div>
    </Section>
  )
}

export default SectionIntro
