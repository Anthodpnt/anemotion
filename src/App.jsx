import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import LocomotiveScroll from 'locomotive-scroll'

import * as data from './data'
import navigate from './utils/navigate'

import Header from './components/Header'
import Footer from './components/Footer'
import SectionBalance from './components/SectionBalance'
import SectionCompare from './components/SectionCompare'
import SectionCompareVideo from './components/SectionCompareVideo'
import SectionDefinition from './components/SectionDefinition'
import SectionExample from './components/SectionExample'
import SectionIntro from './components/SectionIntro'
import SectionNumbers from './components/SectionNumbers'
import SectionShowcase from './components/SectionShowcase'
import SectionTitle from './components/SectionTitle'
import SectionVideo from './components/SectionVideo'
import SectionChoose from './components/SectionChoose/SectionChoose'

import s from './App.module.scss'

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

    // Keyboard navigation support.
    const navigator = navigate(locomotive)

    // Initialize the keyboard navigation.
    navigator.init()

    // Cleanup on unmount.
    return () => {
      navigator.destroy()

      if (locomotive) {
        locomotive.destroy()
      }

      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <main ref={scroller} className={s.root} data-scroll-container>
      <Header />

      <SectionTitle {...data.intro.header} />
      <SectionIntro />

      <SectionTitle {...data.emotion.header} />
      <SectionDefinition definitions={data.emotion.definitions} />

      <SectionTitle {...data.animation.header} />
      <SectionDefinition definitions={data.animation.definitions} />

      <SectionTitle {...data.anemotion.header} />
      <SectionDefinition definitions={data.anemotion.definitions} />

      <SectionTitle {...data.experiment.header} />
      <SectionVideo {...data.experiment.video} />
      <SectionDefinition definitions={data.experiment.definitions} />
      <SectionNumbers {...data.experiment.statistics} />

      <SectionTitle {...data.painting.header} />
      <SectionCompare {...data.painting.subject} />
      <SectionCompare {...data.painting.color} />

      <SectionTitle {...data.movie.header} />
      <SectionVideo {...data.movie.acting} />
      <SectionCompareVideo {...data.movie.music} />
      <SectionCompareVideo {...data.movie.sound} />

      <SectionTitle {...data.showcase.header} />
      <SectionShowcase projects={data.showcase.projects} />

      <SectionTitle {...data.simple} />
      <SectionTitle {...data.complex} />

      <SectionExample {...data.example} />

      <SectionTitle {...data.balance.header} />
      <SectionBalance contents={data.balance.contents} />

      <SectionTitle {...data.choose.header} />
      <SectionChoose {...data.choose.content} />

      <SectionTitle {...data.thanks.header} />

      <Footer />
    </main>
  )
}

export default App
