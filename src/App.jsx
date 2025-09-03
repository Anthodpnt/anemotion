import { ReactLenis } from 'lenis/react'

import Header from './components/Header'
import Footer from './components/Footer'
import SectionTitle from './components/SectionTitle'

const App = () => {
  return (
    <>
      <ReactLenis root />

      <Header />

      <SectionTitle title="Slide 1" subtitle="Lorem ipsum dolor sit amet." />
      <SectionTitle title="Slide 2" subtitle="Lorem ipsum dolor sit amet." />
      <SectionTitle title="Slide 3" subtitle="Lorem ipsum dolor sit amet." />
      <SectionTitle title="Slide 4" subtitle="Lorem ipsum dolor sit amet." />
      <SectionTitle title="Slide 5" subtitle="Lorem ipsum dolor sit amet." />

      <Footer />
    </>
  )
}

export default App
