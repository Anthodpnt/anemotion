import { useEffect, useState } from 'react'
import { gsap, SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'
import { Howl } from 'howler'

// This motion makes some text appear words by words on scroll.
// The result is a reading effect.
// Note: It supports multiple targets as an array of refs.
export const useReadingMotion = (scope, targets) => {
  const { width } = useWindowSize()
  const [isReady, setIsReady] = useState(false)

  useGSAP(
    () => {
      if (!isReady) {
        return
      }

      targets.current.forEach((target) => {
        const split = new SplitText(target.el, { type: 'lines,words' })

        // Create the voice.
        let voice

        if (target.voice) {
          voice = new Howl({
            src: [target.voice],
            volume: 0.2,
          })
        }

        // Initial state of the motion.
        gsap.set(split.words, {
          opacity: 0,
        })

        // Phase `in` - Reveal the words.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: target.el,
            start: 'top bottom',
            end: 'bottom top',
            onLeave: () => {
              if (voice) {
                voice.stop()
              }
            },
            onLeaveBack: () => {
              if (voice) {
                voice.stop()
              }
            },
            toggleActions: 'play complete play complete',
          },
        })

        tl.to(split.words, {
          opacity: 0.2,
          stagger: 0.05,
          ease: 'power1.out',
          duration: 0.2,
          onComplete: () => {
            if (voice) {
              voice.play()
            }
          },
        }).to(split.words, {
          opacity: 1,
          stagger: target.duration / split.words.length,
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
    document.fonts.ready.then(() => {
      setIsReady(true)
    })

    return () => {
      setIsReady(false)
    }
  }, [])
}
