import { useEffect, useRef, useState } from 'react'
import { gsap, SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Container from '@/components/Container'

import s from './SectionDefinition.module.scss'

const SectionDefinition = ({ definitions = [] }) => {
  const defs = useRef([])
  const section = useRef()
  const background = useRef()

  // Track the ready state of the component.
  const [isReady, setIsReady] = useState(false)

  // Motion - Year transition on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      if (!isReady) {
        return
      }

      // Motion of the section background on scroll.
      // Phase `in` - Expand the background to full width.
      gsap.to(background.current, {
        left: 0,
        right: 0,
        borderTopLeftRadius: '0rem',
        borderTopRightRadius: '0rem',
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })

      gsap.to(defs.current, {
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })

      // Phase `out` - Contract the background back to padding.
      gsap.fromTo(
        background.current,
        {
          left: 0,
          right: 0,
          borderBottomLeftRadius: '0rem',
          borderBottomRightRadius: '0rem',
        },
        {
          left: '3rem',
          right: '3rem',
          borderBottomLeftRadius: '8rem',
          borderBottomRightRadius: '8rem',
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'bottom center',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        defs.current,
        { x: 0 },
        {
          x: '3rem',
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'bottom center',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

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

    return () => {
      setIsReady(false)
    }
  }, [])

  return (
    <section ref={section} className={s.section}>
      <Container>
        {definitions.map((definition, i) => (
          <div key={`definition-${i}`} className={s.definition}>
            <blockquote ref={(el) => (defs.current[i] = el)}>
              <p className={s.text}>"{definition.text}"</p>
              {definition.caption && <cite className={s.caption}>{definition.caption}</cite>}
            </blockquote>
          </div>
        ))}
      </Container>

      <div ref={background} className={s.background} />
    </section>
  )
}

export default SectionDefinition
