import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'
import cn from 'clsx'

import Check from '@icons/Check'
import Cross from '@icons/Cross'
import Section from '@layout/Section'
import Slide from '@layout/Slide'

import s from './SectionChoose.module.scss'

const SectionChoose = ({ left, right }) => {
  const scope = useRef()

  // Motion - Content reveal.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      // Phase `in` - Reveal the content.
      gsap.fromTo(
        '.box',
        {
          scale: 0.9,
          borderRadius: '3rem',
        },
        {
          scale: 1,
          borderRadius: '1rem',
          scrollTrigger: {
            trigger: '.box',
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        }
      )

      // Phase `out` - Hide the content.
      gsap.fromTo(
        '.box',
        {
          scale: 1,
          borderRadius: '1rem',
        },
        {
          scale: 0.9,
          borderRadius: '3rem',
          scrollTrigger: {
            trigger: '.box',
            start: 'bottom center',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    },
    { scope, dependencies: [width] }
  )

  return (
    <Section ref={scope}>
      <Slide className={s.grid}>
        <div className={s.content}>
          <div className={cn('box', s.box)} data-scroll data-scroll-repeat data-scroll-position="middle,middle">
            <h3 className={s.title}>{left.title}</h3>

            <div className={s.points}>
              <ul className={s.list}>
                {left.pros.map((item, i) => (
                  <li key={`left-pro-${i}`} className={s.item}>
                    <span className={s.label}>
                      <Check width={28} />
                    </span>
                    <span className={s.text}>{item}</span>
                  </li>
                ))}
              </ul>

              <ul className={s.list}>
                {left.cons.map((item, i) => (
                  <li key={`left-con-${i}`} className={s.item}>
                    <span className={s.label}>
                      <Cross width={28} />
                    </span>
                    <span className={s.text}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={cn('box', s.box)} data-scroll data-scroll-repeat data-scroll-position="middle,middle">
            <h3 className={s.title}>{right.title}</h3>

            <div className={s.points}>
              <ul className={s.list}>
                {right.pros.map((item, i) => (
                  <li key={`right-pro-${i}`} className={s.item}>
                    <span className={s.label}>
                      <Check width={28} />
                    </span>
                    <span className={s.text}>{item}</span>
                  </li>
                ))}
              </ul>

              <ul className={s.list}>
                {right.cons.map((item, i) => (
                  <li key={`right-con-${i}`} className={s.item}>
                    <span className={s.label}>
                      <Cross width={28} />
                    </span>
                    <span className={s.text}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Slide>
    </Section>
  )
}

export default SectionChoose
