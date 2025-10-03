import { useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Mask from '@layout/Mask'
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
  const scope = useRef()
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
        trigger: scope.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: createMotion,
        onRefresh: createMotion,
      })
    },
    { scope, dependencies: [width] }
  )

  return (
    <Section ref={scope} className={s.section}>
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
        <Mask className={s.image}>
          <Image
            src="/images/intro/tomorrowland.webp"
            alt="Blurry image with shades of green"
            width={400}
            height={600}
          />
          <img
            src="/images/intro/tomorrowland-logo.webp"
            alt="Logo with the Tomorrowland text"
            width={400}
            height={600}
            className={s.logo}
          />
        </Mask>

        <Mask className={s.image}>
          <Image
            src="/images/intro/hape.webp"
            alt="Blurry image with shades of red and black"
            width={400}
            height={600}
          />
          <img
            src="/images/intro/hape-logo.webp"
            alt="Logo with the HAPE Prime text"
            width={400}
            height={600}
            className={s.logo}
          />
        </Mask>

        <Mask className={s.image}>
          <Image
            src="/images/intro/virgin-galactic.webp"
            alt="Blurry image with shades of white and purple"
            width={400}
            height={600}
          />
          <img
            src="/images/intro/virgin-galactic-logo.webp"
            alt="Logo with the Virgin Galactic text"
            width={400}
            height={600}
            className={s.logo}
          />
        </Mask>

        <Mask className={s.image}>
          <Image
            src="/images/intro/adobe.webp"
            alt="Blurry image with shades of pink and beige"
            width={400}
            height={600}
          />
          <img
            src="/images/intro/adobe-logo.webp"
            alt="Logo with the Adobe text"
            width={400}
            height={600}
            className={s.logo}
          />
        </Mask>

        <Mask className={s.image}>
          <Image
            src="/images/intro/hugo-boss.webp"
            alt="Blurry image with shades of brown and beige"
            width={400}
            height={600}
          />
          <img
            src="/images/intro/hugo-boss-logo.webp"
            alt="Logo with the Hugo Boss text"
            width={400}
            height={600}
            className={s.logo}
          />
        </Mask>

        <Mask className={s.image}>
          <Image
            src="/images/intro/virtual-expo.webp"
            alt="Blurry image with shades of beige, pink and green"
            width={400}
            height={600}
          />
          <img
            src="/images/intro/virtual-expo-logo.webp"
            alt="Logo with the Expo 2020 Dubai UAE text"
            width={400}
            height={600}
            className={s.logo}
          />
        </Mask>
      </div>
    </Section>
  )
}

export default SectionIntro
