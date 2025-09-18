import { useEffect, useRef, useState } from 'react'
import { gsap, SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Container from '@/components/Container'

import s from './SectionTitle.module.scss'

const SectionTitle = ({ images, title, subtitle }) => {
  const root = useRef()
  const head = useRef()

  // Track the ready state of the component.
  const [isReady, setIsReady] = useState(false)

  // Motion - Letters animations on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      if (!isReady) {
        return
      }

      const split = new SplitText(head.current, { type: 'chars' })

      gsap.fromTo(
        split.chars,
        {
          filter: 'blur(5px)',
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          opacity: 1,
          stagger: {
            each: 0.03,
            from: 'center',
          },
          scrollTrigger: {
            trigger: root.current,
            start: 'top center',
            end: 'top top',
            scrub: true,
          },
        }
      )
    },
    { scope: root.current, dependencies: [width, isReady] }
  )

  // Track font loading.
  // Component is ready when fonts are loaded.
  useEffect(() => {
    document.fonts.ready.then(() => {
      setIsReady(true)
    })

    return () => {
      setIsReady(false)
    }
  }, [])

  return (
    <section ref={root} className={s.section}>
      <Container>
        <header className={s.header}>
          <div className={s.inner}>
            <h2 ref={head} className={s.title} dangerouslySetInnerHTML={{ __html: title }} />
            {subtitle && <p className={s.subtitle}>{subtitle}</p>}
          </div>
        </header>

        {images && images.length > 0 && (
          <div className={s.content} data-scroll data-scroll-speed="0.1">
            {images.map((image, i) => (
              <div
                key={`image-${i}`}
                className={s.image}
                data-scroll
                data-scroll-repeat
                data-scroll-position="middle,middle"
              >
                <img {...image} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

export default SectionTitle
