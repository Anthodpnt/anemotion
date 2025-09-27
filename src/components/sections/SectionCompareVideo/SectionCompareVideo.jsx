import { useCallback, useId, useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'
import cn from 'clsx'

import Section from '@layout/Section'
import Slide from '@layout/Slide'
import Player from '@components/Player'
import { useMaskMotion } from '@motion/useMaskMotion'

import s from './SectionCompareVideo.module.scss'

const SectionCompareVideo = ({ srcA, srcB, coverA, coverB, captionA, captionB, title }) => {
  const id = useId()
  const root = useRef()
  const video = useRef()
  const slider = useRef()
  const content = useRef()
  const players = useRef([])

  // Motion - Mask reveal.
  useMaskMotion(root, video, content)

  // Motion - Slider effect.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      const playerA = players.current[0]
      const playerB = players.current[1]

      // Create the motion based on the scroll.
      const motion = (scroll) => {
        // Animate the `clip-path` to create the mask effect.
        gsap.set(slider.current, {
          clipPath: `inset(0 ${scroll.progress * 100}% 0 0)`,
        })

        // Control the video playback.
        if (!playerA.controls.paused) {
          playerA.controls.pause()
          playerA.controls.currentTime = 0
        }

        if (!playerB.controls.paused) {
          playerB.controls.pause()
          playerB.controls.currentTime = 0
        }

        playerA.video.classList.remove('is-paused')
        playerB.video.classList.remove('is-paused')

        playerA.video.classList.remove('is-playing')
        playerB.video.classList.remove('is-playing')
      }

      // Phase `in` - Slide to the second video.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: motion,
      })
    },
    { scope: root, dependencies: [width] }
  )

  // Pause all videos when one is played.
  const handleVideoPlayback = useCallback((id) => {
    for (const player of players.current) {
      if (player.id !== id && !player.video.paused) {
        player.video.classList.remove('is-paused')
        player.video.classList.remove('is-playing')

        player.controls.pause()
        player.controls.currentTime = 0
      }
    }
  }, [])

  return (
    <Section ref={root} className={s.section}>
      <Slide className={cn(s.grid, s.sticky)}>
        <div className={s.inner}>
          {title && <h2 className={s.title}>{title}</h2>}

          <div ref={video} className={s.players} data-scroll data-scroll-call={id} data-scroll-repeat>
            <div ref={content} className={s.content}>
              <div ref={slider} className={s.player}>
                <Player
                  id={`${id}-A`}
                  ref={(el) => (players.current[0] = el)}
                  src={srcA}
                  cover={coverA}
                  caption={captionA}
                  onClick={handleVideoPlayback}
                  useMotion={false}
                />
              </div>

              <div className={s.player}>
                <Player
                  id={`${id}-B`}
                  ref={(el) => (players.current[1] = el)}
                  src={srcB}
                  cover={coverB}
                  caption={captionB}
                  onClick={handleVideoPlayback}
                  useMotion={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Section>
  )
}
export default SectionCompareVideo
