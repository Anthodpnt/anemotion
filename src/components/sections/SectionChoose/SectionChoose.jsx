import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'
import cn from 'clsx'

import Check from '@icons/Check'
import Cross from '@icons/Cross'
import Container from '@layout/Container'

import s from './SectionChoose.module.scss'

const SectionChoose = ({ left, right }) => {
  const section = useRef()
  const background = useRef()

  // Motion - Year transition on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      // Motion of the section background on scroll.
      // Phase `in` - Expand the background to full width.
      gsap.to(background.current, {
        left: 0,
        right: 0,
        borderTopLeftRadius: '0rem',
        borderTopRightRadius: '0rem',
        scrollTrigger: {
          trigger: section.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      })

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
          scrollTrigger: {
            trigger: section.current,
            start: 'bottom center',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

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
    { scope: section, dependencies: [width] }
  )

  return (
    <section ref={section} className={s.section}>
      <Container className={s.container}>
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
      </Container>

      <div ref={background} className={s.background} />
    </section>
  )
}

export default SectionChoose
