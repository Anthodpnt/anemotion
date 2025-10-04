import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react'
import cn from 'clsx'

import Pause from '@icons/Pause'
import Play from '@icons/Play'
import Video from '@components/Video'
import Button from '@components/Button'
import Caption from '@components/Caption'

import s from './Player.module.scss'

const Player = forwardRef(({ src, alt, cover, caption, playing, onClick, className }, ref) => {
  const id = useId()
  const video = useRef()
  const controls = useRef()

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
      if (video.current.classList.contains('is-playing')) {
        video.current.classList.add('is-paused')
        video.current.classList.remove('is-playing')
      }
    }

    const handleVideoReset = () => {
      controls.current.pause();
      controls.current.currentTime = 0

      video.current.classList.remove('is-paused')
      video.current.classList.remove('is-playing')
    }

    window.addEventListener(id, handleVideoReset)

    el.addEventListener('play', handleVideoPlay)
    el.addEventListener('pause', handleVideoPause)
    el.addEventListener('ended', handleVideoReset)

    return () => {
      window.removeEventListener(id, handleVideoReset)

      el.removeEventListener('play', handleVideoPlay)
      el.removeEventListener('pause', handleVideoPause)
      el.removeEventListener('ended', handleVideoReset)
    }
  }, [id])

  // Expose the player controls to the parent component.
  useImperativeHandle(ref, () => ({
    id,
    video: video.current,
    controls: controls.current,
  }))

  return (
    <div
      ref={video}
      className={cn(s.player, { 'is-playing': playing }, className)}
      data-scroll
      data-scroll-repeat
      data-scroll-call={id}
    >
      <button type="button" onClick={handleVideoPlayback} className={s.play}>
        <Button className={s.button}>
          <Play width={36} />
          <Pause width={36} />
        </Button>
        {cover && <img src={cover} alt={alt} />}
      </button>

      <Video ref={controls} src={src} />
      {caption && <Caption className={s.caption}>{caption}</Caption>}
    </div>
  )
})

export default Player
