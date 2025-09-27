import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

// This motion animated the background width and border radius.
// The result is a background that stretches and contracts on scroll.
export const useBackgroundMotion = (target) => {
  const { width } = useWindowSize()

  useGSAP(
    () => {
      // Define the motion values.
      const scaleFrom = 0.9
      const scaleTo = 1
      const scaleDelta = Math.abs(scaleTo - scaleFrom)

      const borderRadiusFrom = 10
      const borderRadiusTo = 0
      const borderRadiusDelta = Math.abs(borderRadiusTo - borderRadiusFrom)

      // Create the motion based on the scroll.
      const motionIn = (scroll) => {
        gsap.set(target.current, {
          scaleX: scaleFrom + scaleDelta * scroll.progress,
          borderRadius: `${borderRadiusFrom - borderRadiusDelta * scroll.progress}rem`,
        })
      }

      const motionOut = (scroll) => {
        gsap.set(target.current, {
          scaleX: scaleTo - scaleDelta * scroll.progress,
          borderRadius: `${borderRadiusTo + borderRadiusDelta * scroll.progress}rem`,
        })
      }

      // Initial state of the motion.
      gsap.set(target.current, {
        scaleX: scaleFrom,
        borderRadius: `${borderRadiusFrom}rem`,
      })

      // Phase `in` - Stretch the background.
      ScrollTrigger.create({
        trigger: target.current,
        start: 'top bottom',
        end: 'top center',
        scrub: true,
        onUpdate: motionIn,
      })

      // Phase `out` - Contract the background.
      ScrollTrigger.create({
        trigger: target.current,
        start: 'bottom center',
        end: 'bottom top',
        scrub: true,
        onUpdate: motionOut,
      })
    },
    { dependencies: [width] }
  )
}
