import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/all'
import LocomotiveScroll from 'locomotive-scroll'

import navigate from '@utils/navigate'

export const useLocomotiveScroll = () => {
  useEffect(() => {
    const locomotive = new LocomotiveScroll()

    // Refresh ScrollTrigger.
    ScrollTrigger.refresh()

    // Keyboard navigation support.
    const navigator = navigate(locomotive)

    // Cleanup on unmount.
    return () => {
      navigator.destroy()

      if (locomotive) {
        locomotive.destroy()
      }

      ScrollTrigger.killAll()
    }
  }, [])
}
