import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import Section from '@layout/Section'
import Slide from '@layout/Slide'
import { useReadingMotion } from '@motion/useReadingMotion'

import s from './SectionDefinition.module.scss'

const SectionDefinition = ({ definitions = [] }) => {
  const scope = useRef()
  const targets = useRef([])
  const captions = useRef([])

  // Motion - Reveal caption.
  const { contextSafe } = useGSAP({ scope })

  // Motion - Reading effect & Background.
  const onComplete = contextSafe((index) => {
    if (captions.current[index]) {
      gsap.to(captions.current[index], {
        opacity: 1,
        ease: 'power1.out',
        duration: 0.2,
      })
    }
  })

  useReadingMotion(scope, targets, onComplete)

  return (
    <Section ref={scope}>
      {definitions.map((definition, i) => (
        <Slide key={`definition-${i}`} className={s.definition}>
          <blockquote>
            <p 
              ref={(el) =>
                (targets.current[i] = {
                  el,
                  voice: definition.voice,
                  volume: definition.volume,
                  duration: definition.duration,
                })
              }
              className={s.text}
            >
              "{definition.text}"
            </p>
            {definition.caption && <cite ref={(el) => captions.current[i] = el} className={s.caption}>{definition.caption}</cite>}
          </blockquote>
        </Slide>
      ))}
    </Section>
  )
}

export default SectionDefinition
