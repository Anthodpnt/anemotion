import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

// This motion stretches the element vertically on scroll.
// The result is an element stretched that gets to its normal size.
export const useStretchMotion = (scope, target) => {
  const { width } = useWindowSize()

  useGSAP(
    () => {
      // Define the motion values.
      const scaleFrom = 4
      const scaleTo = 1

      // Create the motion based on the scroll.
      const motion = (scroll) => {
        gsap.set(target.current, {
          scaleY: scaleFrom - (scaleFrom - scaleTo) * scroll.progress,
        })
      }

      // Initial state of the motion.
      gsap.set(target.current, {
        scaleY: scaleFrom,
      })

      // Phase `in` - Stretch the element.
      ScrollTrigger.create({
        trigger: scope.current,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        onUpdate: motion,
      })
    },
    { scope, dependencies: [width] }
  )
}
