import { useCallback, useEffect, useId, useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'

import Container from '@/components/Container'
import Player from '@/components/Player'

import s from './SectionCompareVideo.module.scss'

const SectionCompareVideo = ({ srcA, srcB, coverA, coverB, captionA, captionB, title }) => {
  const id = useId()

  const players = useRef([])
  const section = useRef()

  // Motion - Video appearance.
  useGSAP(
    () => {
      const playerA = players.current[0]
      const playerB = players.current[1]

      // Phase `in` - Expand the video.
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top+=10% bottom',
        end: 'top+=10% center',
        ease: 'none',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(playerA.container, {
            scale: 0.95 + self.progress * 0.05,
            borderRadius: 3 - self.progress * 2 + 'rem',
          })

          gsap.set(playerA.video, {
            scale: 1.05 - self.progress * 0.05,
          })
        },
      })

      // Phase `out` - Shrink the video.
      ScrollTrigger.create({
        trigger: section.current,
        start: 'bottom-=10% center',
        end: 'bottom-=10% top',
        ease: 'none',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(playerB.container, {
            scale: 1 - self.progress * 0.05,
            borderRadius: 1 + self.progress * 2 + 'rem',
          })

          gsap.set(playerB.video, {
            scale: 1 + self.progress * 0.05,
          })
        },
      })

      // Motion between the videos.
      ScrollTrigger.create({
        trigger: section.current,
        start: `top top`,
        end: `top+=${window.innerHeight * 1}px top`,
        ease: 'none',
        scrub: true,
        snap: {
          ease: 'power1.inOut',
          snapTo: [0, 1],
          duration: 0.3,
        },
        onUpdate: (self) => {
          if (!playerA.video.paused) {
            playerA.video.pause()
            playerA.video.currentTime = 0
          }

          if (!playerB.video.paused) {
            playerB.video.pause()
            playerB.video.currentTime = 0
          }

          playerA.container.classList.remove('is-paused')
          playerB.container.classList.remove('is-paused')

          playerA.container.classList.remove('is-playing')
          playerB.container.classList.remove('is-playing')

          gsap.set(playerA.root, {
            scale: 1 - self.progress * 0.2,
            opacity: 1 - Math.pow(self.progress, 0.5),
            // xPercent: -80 * self.progress,
            pointerEvents: self.progress < 0.5 ? 'auto' : 'none',
          })

          gsap.set(playerB.root, {
            // scale: 1.2 - self.progress * 0.2,
            // xPercent: -120 * self.progress,
            opacity: Math.pow(self.progress, 0.5),
            pointerEvents: self.progress > 0.5 ? 'auto' : 'none',
          })
        },
      })
    },
    { scope: section }
  )

  const handlePlayerReset = () => {
    for (const player of players.current) {
      player.video.pause()
      player.video.currentTime = 0
      player.container.classList.remove('is-paused')
      player.container.classList.remove('is-playing')
    }
  }

  const handleVideoPlayback = useCallback((id) => {
    for (const player of players.current) {
      if (player.id !== id && !player.video.paused) {
        player.video.pause()
        player.video.currentTime = 0
        player.container.classList.remove('is-paused')
        player.container.classList.remove('is-playing')
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener(id, handlePlayerReset)

    return () => {
      window.removeEventListener(id, handlePlayerReset)
    }
  }, [id])

  return (
    <section ref={section} className={s.section}>
      <Container className={s.container}>
        <div className={s.content}>
          <div className={s.grid}>
            <div className={s.inner}>
              {title && <h2 className={s.title}>{title}</h2>}

              <div className={s.players} data-scroll data-scroll-call={id} data-scroll-repeat>
                <Player
                  id={`${id}-A`}
                  ref={(el) => (players.current[0] = el)}
                  src={srcA}
                  cover={coverA}
                  caption={captionA}
                  onClick={handleVideoPlayback}
                  className={s.player}
                />

                <Player
                  id={`${id}-B`}
                  ref={(el) => (players.current[1] = el)}
                  src={srcB}
                  cover={coverB}
                  caption={captionB}
                  onClick={handleVideoPlayback}
                  className={s.player}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
export default SectionCompareVideo
