import { gsap, ScrollTrigger } from 'gsap/all'

import * as data from '@data'
import { useLocomotiveScroll } from '@hooks/useLocomotiveScroll'

import Header from '@layout/Header'
import Footer from '@layout/Footer'
import Background from '@layout/Background'
import SectionBalance from '@sections/SectionBalance'
import SectionCompare from '@sections/SectionCompare'
import SectionCompareVideo from '@sections/SectionCompareVideo'
import SectionDefinition from '@sections/SectionDefinition'
import SectionExample from '@sections/SectionExample'
import SectionIntro from '@sections/SectionIntro'
import SectionNumbers from '@sections/SectionNumbers'
import SectionShowcase from '@sections/SectionShowcase'
import SectionTitle from '@sections/SectionTitle'
import SectionVideo from '@sections/SectionVideo'
import SectionChoose from '@sections/SectionChoose/SectionChoose'

import s from './App.module.scss'

// Remove scroll restoration on page load.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const App = () => {
  // Enable the navigation with Locomotive Scroll and keyboard.
  useLocomotiveScroll()

  return (
    <main className={s.root} data-scroll-container>
      <Header />

      <SectionTitle {...data.intro.header} />
      <SectionIntro />

      <SectionTitle {...data.emotion.header} />
      <div className={s.group}>
        <SectionDefinition definitions={data.emotion.definitions} />
        <Background />
      </div>

      <SectionTitle {...data.animation.header} />
      <div className={s.group}>
        <SectionDefinition definitions={data.animation.definitions} />
        <Background />
      </div>

      <SectionTitle {...data.anemotion.header} />
      <div className={s.group}>
        <SectionDefinition definitions={data.anemotion.definitions} />
        <Background />
      </div>

      <SectionTitle {...data.experiment.header} />
      <div className={s.group}>
        <SectionVideo {...data.experiment.video} />
        <SectionDefinition definitions={data.experiment.definitions} />
        <SectionNumbers {...data.experiment.statistics} />
        <Background />
      </div>

      <SectionTitle {...data.painting.header} />
      <div className={s.group}>
        <SectionCompare {...data.painting.subject} />
        <SectionCompare {...data.painting.color} />
        <Background />
      </div>

      <SectionTitle {...data.movie.header} />
      <div className={s.group}>
        <SectionVideo {...data.movie.acting} />
        <SectionCompareVideo {...data.movie.music} />
        <SectionCompareVideo {...data.movie.sound} />
        <Background />
      </div>

      <SectionTitle {...data.showcase.header} />
      <SectionShowcase projects={data.showcase.projects} />

      <SectionTitle {...data.simple} />
      <SectionTitle {...data.complex} />

      <SectionExample {...data.example} />

      <SectionTitle {...data.balance.header} />
      <div className={s.group}>
        <SectionBalance contents={data.balance.contents} />
        <Background />
      </div>

      <SectionTitle {...data.choose.header} />
      <div className={s.group}>
        <SectionChoose {...data.choose.content} />
        <Background />
      </div>

      <SectionTitle {...data.thanks.header} />

      <Footer />
    </main>
  )
}

export default App
