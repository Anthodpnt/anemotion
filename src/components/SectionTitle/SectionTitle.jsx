import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Container from '@/components/Container'

import s from './SectionTitle.module.scss'

const SectionTitle = ({ images, title, subtitle }) => {
  const root = useRef()
  const header = useRef()

  // Motion - Letters animations on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      gsap.fromTo(
        header.current,
        {
          scaleY: 10,
        },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        }
      )
    },
    { scope: root.current, dependencies: [width] }
  )

  return (
    <section ref={root} className={s.section}>
      <Container>
        <header className={s.header}>
          <div ref={header} className={s.inner}>
            <h2 className={s.title} dangerouslySetInnerHTML={{ __html: title }} />
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
