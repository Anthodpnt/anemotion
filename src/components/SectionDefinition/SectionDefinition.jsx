import { useEffect, useRef, useState } from 'react'
import { gsap, SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Container from '@/components/Container'

import s from './SectionDefinition.module.scss'

const SectionDefinition = ({ definitions = [] }) => {
  const defs = useRef([])
  const section = useRef()

  // Track the ready state of the component.
  const [isReady, setIsReady] = useState(false)

  // Motion - Year transition on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      if (!isReady) {
        return
      }

      // Motion of the definitions on scroll.
      // Fade in/out based on scroll position.
      defs.current.forEach((def) => {
        const split = new SplitText(def, { type: 'lines,words' })

        gsap.fromTo(
          split.words,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: {
              trigger: def,
              start: 'top bottom',
              end: '+=50%',
              scrub: true,
            },
          }
        )
      })
    },
    { scope: section, dependencies: [width, isReady] }
  )

  // Track font loading.
  // Component is ready when fonts are loaded.
  useEffect(() => {
    document.fonts.ready.then(() => {
      setIsReady(true)
    })
  }, [])

  return (
    <section ref={section} className={s.section}>
      <Container>
        {definitions.map((definition, i) => (
          <div key={`definition-${i}`} className={s.definition}>
            <blockquote ref={(el) => (defs.current[i] = el)}>
              <p className={s.text}>"{definition.text}"</p>
              <cite className={s.author}>{definition.author}</cite>
            </blockquote>
          </div>
        ))}
      </Container>
    </section>
  )
}

export default SectionDefinition
