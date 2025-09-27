import { gsap, ScrollTrigger } from 'gsap/all'

import * as data from '@data'
import { useLocomotiveScroll } from '@hooks/useLocomotiveScroll'

import Header from '@layout/Header'
import Footer from '@layout/Footer'
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
