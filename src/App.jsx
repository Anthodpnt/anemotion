import { useState } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useMedia } from 'react-use'

import * as data from '@data'
import { useLocomotiveScroll } from '@hooks/useLocomotiveScroll'

import Help from '@icons/Help'
import Mouse from '@icons/Mouse'
import Header from '@layout/Header'
import Footer from '@layout/Footer'
import Message from '@layout/Message'
import Tutorial from '@layout/Tutorial'
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
  const [showTutorial, setShowTutorial] = useState(true)

  // Track media queries and show coming soon message.
  const isSoon = useMedia('(max-width: 1279px)')

  // Enable the navigation with Locomotive Scroll and keyboard.
  useLocomotiveScroll()

  // Toggle the tutorial modal.
  const handleTutorialToggle = () => {
    setShowTutorial((prev) => !prev)
  }

  if (isSoon) {
    return (
      <Message icon={<Help width={48} />} title="Coming soon" text="This website looks better on a wider screen." />
    )
  }

  return (
    <main className={s.root} data-scroll-container>
      <Header />

      <div className={s.group}>
        <SectionTitle {...data.intro.header} />
        {showTutorial && <Tutorial onClose={handleTutorialToggle} />}

        <button type="button" onClick={handleTutorialToggle} className={s.tutorial}>
          <Help />
        </button>

        <Mouse width={32} />
      </div>
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
        <SectionNumbers {...data.experiment.statistics} />
        <SectionDefinition definitions={data.experiment.definitions} />
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

      <SectionTitle {...data.evolution} />
      <SectionShowcase projects={data.showcase.projects} />

      <SectionTitle {...data.simple} />
      <SectionTitle {...data.complex} />

      <SectionExample {...data.example.demo} />
      <div className={s.group}>
        <SectionVideo {...data.example.video} />
        <Background />
      </div>

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
