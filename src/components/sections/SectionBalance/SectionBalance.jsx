import { useMemo, useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Container from '@layout/Container'

import s from './SectionBalance.module.scss'

const SectionBalance = ({ contents }) => {
  const slides = useRef([])
  const slider = useRef()
  const section = useRef()
  const background = useRef()

  // Gather all images of all contents.
  const images = useMemo(() => {
    return contents.reduce((acc, content) => {
      return acc.concat(content.images)
    }, [])
  }, [contents])

  // Motion - Year transition on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      // Motion of the section background on scroll.
      // Phase `in` - Expand the background to full width.
      gsap.to(background.current, {
        left: 0,
        right: 0,
        borderTopLeftRadius: '0rem',
        borderTopRightRadius: '0rem',
        scrollTrigger: {
          trigger: section.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })

      // Phase `out` - Contract the background back to padding.
      gsap.fromTo(
        background.current,
        {
          left: 0,
          right: 0,
          borderBottomLeftRadius: '0rem',
          borderBottomRightRadius: '0rem',
        },
        {
          left: '3rem',
          right: '3rem',
          borderBottomLeftRadius: '8rem',
          borderBottomRightRadius: '8rem',
          scrollTrigger: {
            trigger: section.current,
            start: 'bottom center',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // Phase `scroll` - Scroll through the images.
      const segment = 1 / (slides.current.length - 1)

      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const index = Math.floor(self.progress / segment)
          const progress = (self.progress - index * segment) / segment

          slides.current.forEach((item, i) => {
            if (i === index) {
              gsap.set(item, {
                opacity: 1 - progress,
                yPercent: -100 * progress,
              })
            } else if (i === index + 1) {
              gsap.set(item, {
                scale: 0.8 + 0.2 * progress,
                opacity: progress,
                borderRadius: `${3 - progress * 2}rem`,
              })
            } else {
              gsap.set(item, {
                opacity: 0,
              })
            }
          })
        },
      })
    },
    { scope: section, dependencies: [width] }
  )

  return (
    <section ref={section} className={s.section}>
      <Container className={s.container}>
        <div className={s.leftSide}>
          <div ref={slider} className={s.slider}>
            {images.map((image, i) => (
              <div ref={(el) => (slides.current[i] = el)} key={`image-${i}`} className={s.image}>
                <img {...image} />
              </div>
            ))}
          </div>
        </div>

        <div className={s.rightSide}>
          {contents.map((content, i) => (
            <div key={`content-${i}`} style={{ '--count': content.images.length }} className={s.content}>
              <div className={s.inner}>
                <h3 className={s.title}>{content.title}</h3>
                <p className={s.text}>{content.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <div ref={background} className={s.background} />
    </section>
  )
}

export default SectionBalance
