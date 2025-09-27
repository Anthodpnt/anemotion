import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

// This motion reveals an element with a mask effect on scroll.
// The result is a smooth reveal of the element.
export const useMaskMotion = (scope, target, content, enabled = true) => {
  const { width } = useWindowSize()

  useGSAP(
    () => {
      if (!enabled) {
        return
      }

      // Define the motion values.
      const scaleFrom = 0.9
      const scaleTo = 1
      const scaleDelta = Math.abs(scaleTo - scaleFrom)

      const borderRadiusFrom = 3
      const borderRadiusTo = 1
      const borderRadiusDelta = Math.abs(borderRadiusTo - borderRadiusFrom)

      // Create the motion based on the scroll.
      const motionIn = (scroll) => {
        gsap.set(target.current, {
          scale: scaleFrom + scaleDelta * scroll.progress,
          borderRadius: `${borderRadiusFrom - borderRadiusDelta * scroll.progress}rem`,
        })

        gsap.set(content.current, {
          scale: scaleTo + scaleDelta - scaleDelta * scroll.progress,
        })
      }

      const motionOut = (scroll) => {
        gsap.set(target.current, {
          scale: scaleTo - scaleDelta * scroll.progress,
          borderRadius: `${borderRadiusTo + borderRadiusDelta * scroll.progress}rem`,
        })

        gsap.set(content.current, {
          scale: scaleTo + scaleDelta * scroll.progress,
        })
      }

      // Initial state of the motion.
      gsap.set(target.current, {
        scale: scaleFrom,
        borderRadius: `${borderRadiusFrom}rem`,
      })

      gsap.set(content.current, {
        scale: scaleTo + scaleDelta,
      })

      // Phase `in` - Reveal the element.
      ScrollTrigger.create({
        trigger: target.current,
        start: 'top bottom',
        end: 'top center',
        scrub: true,
        onUpdate: motionIn,
      })

      // Phase `out` - Hide the element.
      ScrollTrigger.create({
        trigger: target.current,
        start: 'bottom center',
        end: 'bottom top',
        scrub: true,
        onUpdate: motionOut,
      })
    },
    { scope, dependencies: [width, enabled] }
  )
}
