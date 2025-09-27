import { useEffect, useState } from 'react'
import { gsap, SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

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
        const split = new SplitText(target, { type: 'lines,words' })

        // Initial state of the motion.
        gsap.set(split.words, {
          opacity: 0,
        })

        // Phase `in` - Reveal the words.
        gsap.to(split.words, {
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: target,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
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
