import { useCallback, useId, useRef } from 'react'
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
  const content = useRef()
  const players = useRef([])

  // Motion - Mask reveal.
  useMaskMotion(root, video, content)

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
    <Section ref={root}>
      <Slide className={cn(s.grid, s.sticky)}>
        <div className={s.inner}>
          {title && <h2 className={s.title}>{title}</h2>}

          <div ref={video} className={s.players} data-scroll data-scroll-call={id} data-scroll-repeat>
            <div ref={content} className={s.content}>
              <Player
                id={`${id}-A`}
                ref={(el) => (players.current[0] = el)}
                src={srcA}
                cover={coverA}
                caption={captionA}
                onClick={handleVideoPlayback}
                useMotion={false}
                className={s.player}
              />

              <Player
                id={`${id}-B`}
                ref={(el) => (players.current[1] = el)}
                src={srcB}
                cover={coverB}
                caption={captionB}
                onClick={handleVideoPlayback}
                useMotion={false}
                className={s.player}
              />
            </div>
          </div>
        </div>
      </Slide>
    </Section>
  )
}
export default SectionCompareVideo
