import { useMemo, useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Section from '@layout/Section'
import Video from '@components/Video'

import s from './SectionBalance.module.scss'

const SectionBalance = ({ contents }) => {
  const scope = useRef()
  const slides = useRef([])

  // Gather all videos of all contents.
  const videos = useMemo(() => {
    return contents.reduce((acc, content) => {
      return acc.concat(content.videos)
    }, [])
  }, [contents])

  // Motion - Videos transition on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      const segment = 1 / (slides.current.length - 1)

      // Create the motion based on the scroll.
      const motion = (scroll) => {
        const index = Math.floor(scroll.progress / segment)
        const progress = (scroll.progress - index * segment) / segment

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
      }

      // Phase `scroll` - Scroll through the images.
      ScrollTrigger.create({
        trigger: scope.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: motion,
      })
    },
    { scope, dependencies: [width] }
  )

  return (
    <Section ref={scope}>
      <div className={s.grid}>
        <div className={s.leftSide}>
          <div className={s.slider}>
            {videos.map((video, index) => (
              <div ref={(el) => (slides.current[index] = el)} key={`video-${index}`} className={s.video}>
                <Video src={video} loop muted autoPlay alwaysPlay />
              </div>
            ))}
          </div>
        </div>

        <div className={s.rightSide}>
          {contents.map((content, i) => (
            <div key={`content-${i}`} style={{ '--count': content.videos.length }} className={s.content}>
              <div className={s.inner}>
                <h3 className={s.title}>{content.title}</h3>
                <p className={s.text}>{content.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default SectionBalance
