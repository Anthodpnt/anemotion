import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react'
import cn from 'clsx'

import Pause from '@icons/Pause'
import Play from '@icons/Play'
import Button from '@components/Button'
import Caption from '@components/Caption'
import { useMaskMotion } from '@motion/useMaskMotion'

import s from './Player.module.scss'

const Player = forwardRef(({ src, alt, cover, caption, playing, onClick, useMotion = true, className }, ref) => {
  const id = useId()
  const root = useRef()
  const video = useRef()
  const content = useRef()
  const controls = useRef()

  // Motion - Mask reveal.
  useMaskMotion(root, video, content, useMotion)

  const handleVideoPlayback = () => {
    // Toggle the playback of the video
    controls.current.paused ? controls.current.play() : controls.current.pause()

    // Notify the parent component that the video was clicked
    onClick?.(id)
  }

  // Add relevant events to the video element.
  useEffect(() => {
    const el = controls.current

    const handleVideoPlay = () => {
      video.current.classList.add('is-playing')
      video.current.classList.remove('is-paused')
    }

    const handleVideoPause = () => {
      video.current.classList.add('is-paused')
      video.current.classList.remove('is-playing')
    }

    const handleVideoReset = () => {
      // Reset the playback position.
      controls.current.pause()
      controls.current.currentTime = 0

      // Show the video cover.
      video.current.classList.remove('is-paused')
      video.current.classList.remove('is-playing')
    }

    window.addEventListener(id, handleVideoReset)

    el.addEventListener('play', handleVideoPlay)
    el.addEventListener('pause', handleVideoPause)
    el.addEventListener('ended', handleVideoReset)

    // Manage the document visibility to pause the video.
    const onVisibilityChange = () => {
      if (document.hidden && video.current.classList.contains('is-playing')) {
        controls.current.pause()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener(id, handleVideoReset)

      el.removeEventListener('play', handleVideoPlay)
      el.removeEventListener('pause', handleVideoPause)
      el.removeEventListener('ended', handleVideoReset)

      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [id])

  // Expose the player controls to the parent component.
  useImperativeHandle(ref, () => ({
    id,
    root: root.current,
    video: video.current,
    controls: controls.current,
  }))

  return (
    <div ref={root} className={cn(s.player, className)} data-scroll data-scroll-call={id} data-scroll-repeat>
      <div ref={video} className={cn(s.video, { 'is-playing': playing })}>
        <div ref={content} className={s.content}>
          <button type="button" onClick={handleVideoPlayback} className={s.play}>
            <Button className={s.button}>
              <Play width={36} />
              <Pause width={36} />
            </Button>
            {cover && <img src={cover} alt={alt} />}
          </button>

          <video ref={controls} playsInline>
            {src.map((_src, index) => (
              <source key={`video-source__${index}`} src={_src} type={`video/${_src.split('.').pop()}`} />
            ))}
            Your browser does not support the video tag.
          </video>

          {caption && <Caption className={s.caption}>{caption}</Caption>}
        </div>
      </div>
    </div>
  )
})

export default Player
