import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import cn from 'clsx'

import s from './Video.module.scss'

const Video = forwardRef(({ src, autoPlay, alwaysPlay = false, className, ...props }, ref) => {
  const id = useId()
  const video = useRef()

  // Control playback on scroll.
  useGSAP(() => {
    const handleEnter = () => {
      if (autoPlay) {
        video.current.play()
      }
    }

    const handleLeave = () => {
      if (alwaysPlay) {
        return
      }

      video.current.pause()
      video.current.currentTime = 0
    }

    ScrollTrigger.create({
      trigger: video.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: handleEnter,
      onEnterBack: handleEnter,
      onLeave: handleLeave,
      onLeaveBack: handleLeave
    })
  })

  // Control playback on scroll.
  useEffect(() => {
    // Manage the document visibility to pause the video.
    // As soon as the document is not visible on screen, the video is pause.
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.current.pause()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [id, autoPlay])

  // Forward the ref to the parent component.
  useImperativeHandle(ref, () => video.current)

  return (
    <video {...props} ref={video} className={cn(s.video, className)} playsInline>
      {src.map((_src, index) => (
        <source key={`video-${id}__source-${index}`} src={_src} type={`video/${_src.split('.').pop()}`} />
      ))}
      Your browser does not support the video tag.
    </video>
  )
})

export default Video
