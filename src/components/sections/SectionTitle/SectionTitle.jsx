import { useRef } from 'react'
import cn from 'clsx'

import Section from '@layout/Section'
import Slide from '@layout/Slide'
import Video from '@components/Video'
import { useStretchMotion } from '@motion/useStretchMotion'

import s from './SectionTitle.module.scss'

const SectionTitle = ({ images, videos, layout = 'square', title, subtitle }) => {
  const scope = useRef()
  const header = useRef()

  // Motion - Stretch of the header
  useStretchMotion(scope, header)

  return (
    <Section ref={scope} className={cn(s.section, s[layout])}>
      <Slide className={s.container}>
        <header ref={header} className={s.header}>
          <h2 className={s.title} dangerouslySetInnerHTML={{ __html: title }} />
          {subtitle && <p className={s.subtitle}>{subtitle}</p>}
        </header>

        {videos && videos.length > 0 && (
          <div className={s.medias} data-scroll data-scroll-speed="0.1">
            {videos.map((video, index) => (
              <div
                key={`video-${index}`}
                className={s.media}
                data-scroll
                data-scroll-repeat
                data-scroll-position="middle,middle"
              >
                <Video src={video} loop muted allowZoom />
              </div>
            ))}
          </div>
        )}

        {images && images.length > 0 && (
          <div className={s.medias} data-scroll data-scroll-speed="0.1">
            {images.map((image, i) => (
              <div
                key={`image-${i}`}
                className={s.media}
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
