import { useEffect } from 'react'
import LocomotiveScroll from 'locomotive-scroll'

import Header from './components/Header'
import Footer from './components/Footer'
import SectionIntro from './components/SectionIntro'
import SectionTitle from './components/SectionTitle'

const App = () => {
  useEffect(() => {
    new LocomotiveScroll()
  }, [])

  return (
    <>
      <Header />

      <SectionTitle title="Anemotion" subtitle="Emotions with Animations" />
      <SectionIntro />

      <Footer />
    </>
  )
}

export default App
