import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import LocomotiveScroll from 'locomotive-scroll'

import * as data from './data'
import Header from './components/Header'
import SectionDefinition from './components/SectionDefinition'
import SectionIntro from './components/SectionIntro'
import SectionTitle from './components/SectionTitle'

// Remove scroll restoration on page load.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const scroller = useRef()

  useEffect(() => {
    // Create new Locomotive Scroll instance.
    const locomotive = new LocomotiveScroll()

    // Connect ScrollTrigger to Locomotive Scroll.
    locomotive.lenisInstance.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(scroller.current, {
      scrollTop(value) {
        return locomotive.scrollTo(value, { immediate: true })
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    // Force a scroll reset.
    locomotive.scrollTo(0, { immediate: true })

    // Recalculate ScrollTrigger positions.
    ScrollTrigger.refresh()

    // Cleanup on unmount.
    return () => {
      if (locomotive) {
        locomotive.destroy()
      }

      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <main ref={scroller} data-scroll-container>
      <Header />

      <SectionTitle {...data.intro} />
      <SectionIntro />

      <SectionTitle {...data.emotion} />
      <SectionDefinition definitions={data.emotion.definitions} />

      <SectionTitle {...data.animation} />
      <SectionDefinition definitions={data.animation.definitions} />
    </main>
  )
}

export default App
