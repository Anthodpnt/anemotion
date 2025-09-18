import { useId, useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'

import Player from '@/components/Player'

const Video = ({ src, cover, caption, className }) => {
  const id = useId()
  const player = useRef()

  // Motion - Video appearance.
  useGSAP(() => {
    // Phase `in` - Expand the video.
    ScrollTrigger.create({
      trigger: player.current.root,
      start: 'top bottom',
      end: 'top center',
      ease: 'none',
      scrub: true,
      onUpdate: (self) => {
        gsap.to(player.current.container, {
          scale: 0.95 + self.progress * 0.05,
          borderRadius: 3 - self.progress * 2 + 'rem',
          ease: 'none',
          duration: 0,
        })

        gsap.to(player.current.video, {
          scale: 1.05 - self.progress * 0.05,
          ease: 'none',
          duration: 0,
        })
      },
    })

    // Phase `out` - Shrink the video.
    ScrollTrigger.create({
      trigger: player.current.root,
      start: 'bottom center',
      end: 'bottom top',
      ease: 'none',
      scrub: true,
      onUpdate: (self) => {
        gsap.to(player.current.container, {
          scale: 1 - self.progress * 0.05,
          borderRadius: 1 + self.progress * 2 + 'rem',
          ease: 'none',
          duration: 0,
        })

        gsap.to(player.current.video, {
          scale: 1 + self.progress * 0.05,
          ease: 'none',
          duration: 0,
        })
      },
    })
  })

  return <Player id={id} ref={player} src={src} cover={cover} caption={caption} className={className} />
}

export default Video
