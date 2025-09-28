import { useRef } from 'react'

import Section from '@layout/Section'
import Slide from '@layout/Slide'
import { useStretchMotion } from '@motion/useStretchMotion'

import s from './SectionTitle.module.scss'

const SectionTitle = ({ images, title, subtitle }) => {
  const root = useRef()
  const header = useRef()

  // Motion - Stretch of the header
  useStretchMotion(root, header)

  return (
    <Section ref={root} className={s.section}>
      <Slide className={s.container}>
        <header ref={header} className={s.header}>
          <h2 className={s.title} dangerouslySetInnerHTML={{ __html: title }} />
          {subtitle && <p className={s.subtitle}>{subtitle}</p>}
        </header>

        {images && images.length > 0 && (
          <div className={s.images} data-scroll data-scroll-speed="0.1">
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
      </Slide>
    </Section>
  )
}

export default SectionTitle
