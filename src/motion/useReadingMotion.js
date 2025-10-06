import { useEffect, useRef, useState } from 'react'
import { gsap, SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'
import { Howl } from 'howler'

// This motion makes some text appear words by words on scroll.
// The result is a reading effect.
// Note: It supports multiple targets as an array of refs.
export const useReadingMotion = (scope, targets, onComplete) => {
  const { width } = useWindowSize()

  // Track the loading of the fonts.
  const [isReady, setIsReady] = useState(false)

  // Track the playback of the sound.
  const howls = useRef([])

  useGSAP(
    () => {
      if (!isReady) {
        return
      }

      targets.current.forEach((target, i) => {
        const howl = howls.current[i]
        const split = new SplitText(target.el, { type: 'lines,words' })

        // Initial state of the motion.
        gsap.set(split.words, {
          color: '#6d6e88',
          opacity: 0,
        })

        // Phase `in` - Reveal the words.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: target.el,
            start: 'top bottom',
            end: 'bottom top',
            onLeave: () => {
              if (howl) {
                howl.stop()
                howl.needsPlay = false
                howl.needsResume = false
              }
            },
            onLeaveBack: () => {
              if (howl) {
                howl.stop()
                howl.needsPlay = false
                howl.needsResume = false
              }
            },
            toggleActions: 'play complete play complete',
          },
        })

        tl.to(split.words, {
          opacity: 0.4,
          stagger: 0.05,
          ease: 'power1.out',
          duration: 0.2,
          onComplete: () => {
            if (howl && howl.needsPlay) {
              howl.play()
            }

            onComplete?.(i)
          },
        }).to(split.words, {
          color: '#fff',
          opacity: 1,
          stagger: (target.duration ?? 3) / split.words.length,
          ease: 'power1.out',
          duration: 0.3,
        })
      })
    },
    { scope, dependencies: [width, isReady] }
  )

  // Since the content is text, track the font loading.
  // Effect is ready when fonts are loaded.
  useEffect(() => {
    const _howls = howls.current

    // Load the fonts and wait for them to be ready.
    // This is important for the SplitText to work as expected.
    document.fonts.ready.then(() => {
      setIsReady(true)
    })

    // Initialize the Howl instances for each target with a voice.
    targets.current.forEach((target, i) => {
      if (target.voice) {
        howls.current[i] = new Howl({
          src: Array.isArray(target.voice) ? target.voice : [target.voice],
          volume: target.volume || 0.7,
        })

        howls.current[i].on('play', () => {
          howls.current[i].needsResume = true
        })

        howls.current[i].on('end', () => {
          howls.current[i].needsPlay = false
          howls.current[i].needsResume = false
        })

        howls.current[i].needsPlay = true
        howls.current[i].needsResume = false
      }
    })

    // Pause the sound when the window visibility changes.
    // The sound is paused if it was playing and resumed when visibility is back.
    const onVisibilityChange = () => {
      howls.current.forEach((howl) => {
        if (howl && howl.needsPlay && howl.needsResume) {
          document.hidden ? howl.pause() : howl.play()
        }
      })
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      // Unload all the sounds.
      _howls.forEach((howl) => {
        if (howl) {
          howl.unload()
        }
      })

      // Clean up the state.
      setIsReady(false)

      // Clean up the event listener.
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [targets])
}
