import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import cn from 'clsx'

import Button from '@/components/Button'
import Caption from '@/components/Caption'
import Pause from '@/components/Icons/Pause'
import Play from '@/components/Icons/Play'

import s from './Player.module.scss'

const Player = forwardRef(({ id, src, cover, caption, playing, onClick, className }, ref) => {
  const root = useRef()
  const video = useRef()
  const container = useRef()

  const handleVideoReset = () => {
    // Reset the playback position.
    video.current.pause()
    video.current.currentTime = 0

    // Show the video cover.
    container.current.classList.remove('is-paused')
    container.current.classList.remove('is-playing')
  }

  const handleVideoPlay = () => {
    container.current.classList.add('is-playing')
    container.current.classList.remove('is-paused')
  }

  const handleVideoPause = () => {
    container.current.classList.add('is-paused')
    container.current.classList.remove('is-playing')
  }

  const handleVideoPlayback = () => {
    // Toggle the playback of the video
    video.current.paused ? video.current.play() : video.current.pause()

    // Notify the parent component that the video was clicked
    onClick?.(id)
  }

  // Expose the video element to the parent component.
  useImperativeHandle(
    ref,
    () => ({
      id,
      root: root.current,
      video: video.current,
      container: container.current,
    }),
    [id]
  )

  // Add relevant events to the video element.
  useEffect(() => {
    const el = video.current

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

  return (
    <div ref={root} className={cn(s.player, className)} data-scroll data-scroll-call={id} data-scroll-repeat>
      <div ref={container} className={cn(s.video, { 'is-playing': playing })}>
        <button type="button" onClick={handleVideoPlayback} className={s.play}>
          <Button className={s.button}>
            <Play width={36} />
            <Pause width={36} />
          </Button>
          {cover && <img src={cover} alt="" />}
        </button>

        <video ref={video} src={src} playsInline />
        {caption && <Caption className={s.caption}>{caption}</Caption>}
      </div>
    </div>
  )
})

export default Player
