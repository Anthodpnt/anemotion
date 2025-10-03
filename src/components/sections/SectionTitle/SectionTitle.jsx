import { useEffect, useId, useRef } from 'react'
import cn from 'clsx'

import Section from '@layout/Section'
import Slide from '@layout/Slide'
import { useStretchMotion } from '@motion/useStretchMotion'

import s from './SectionTitle.module.scss'

const Media = ({ src }) => {
  const id = useId()
  const video = useRef()

  // Control playback on scroll
  useEffect(() => {
    const handleVideoPlayback = (e) => {
      switch (e.detail.way) {
        case 'enter': {
          video.current.play()
          break
        }

        case 'leave': {
          video.current.pause()
          video.current.currentTime = 0
          break
        }
      }
    }

    window.addEventListener(id, handleVideoPlayback)

    return () => {
      window.removeEventListener(id, handleVideoPlayback)
    }
  }, [id])

  return (
    <video ref={video} loop muted playsInline data-scroll data-scroll-call={id}>
      {src.map((_src, index) => (
        <source key={`video-source__${index}`} src={_src} type={`video/${_src.split('.').pop()}`} />
      ))}
      Your browser does not support the video tag.
    </video>
  )
}

const SectionTitle = ({ images, videos, layout = 'square', title, subtitle }) => {
  const root = useRef()
  const header = useRef()

  // Motion - Stretch of the header
  useStretchMotion(root, header)

  return (
    <Section ref={root} className={cn(s.section, s[layout])}>
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
                <Media src={video} />
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
