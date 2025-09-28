import { useRef } from 'react'

import Section from '@layout/Section'
import Slide from '@layout/Slide'
import { useReadingMotion } from '@motion/useReadingMotion'

import s from './SectionDefinition.module.scss'

const SectionDefinition = ({ definitions = [] }) => {
  const root = useRef()
  const targets = useRef([])

  // Motion - Reading effect & Background.
  useReadingMotion(root, targets)

  return (
    <Section ref={root}>
      {definitions.map((definition, i) => (
        <Slide key={`definition-${i}`} className={s.definition}>
          <blockquote
            ref={(el) =>
              (targets.current[i] = {
                el,
                voice: definition.voice,
                duration: definition.duration ?? 3,
              })
            }
          >
            <p className={s.text}>"{definition.text}"</p>
            {definition.caption && <cite className={s.caption}>{definition.caption}</cite>}
          </blockquote>
        </Slide>
      ))}
    </Section>
  )
}

export default SectionDefinition
