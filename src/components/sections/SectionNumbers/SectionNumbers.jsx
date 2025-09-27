import { useEffect, useId, useRef } from 'react'
import gsap from 'gsap'

import Section from '@layout/Section'
import Slide from '@layout/Slide'

import s from './SectionNumbers.module.scss'

const SectionNumbers = ({ title, values }) => {
  const id = useId()
  const numbers = useRef([])

  const handleNumbersRoll = (e) => {
    if (numbers.current.length) {
      // Motion - Count up when in view.
      switch (e.detail.way) {
        case 'enter': {
          for (const number of numbers.current) {
            // Extract the value and the suffix from the HTML.
            const match = number.getAttribute('data-value').match(/(\d+)/)
            const value = match ? parseInt(match[1], 10) : 0
            const suffix = number.getAttribute('data-value').replace(/^\d+/, '')

            // Initialize the number at 0.
            number.innerHTML = `0${suffix}`

            // Create an object to do the count up.
            const obj = { value: 0 }

            gsap.to(obj, {
              value,
              ease: 'power1.out',
              duration: 1.5,
              onUpdate: () => (number.innerHTML = `${Math.floor(obj.value)}${suffix}`),
            })
          }
          break
        }

        case 'leave': {
          // Reset the numbers when leaving the viewport.
          for (const number of numbers.current) {
            const suffix = number.getAttribute('data-value').replace(/^\d+/, '')
            number.innerHTML = `0${suffix}`
          }
          break
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener(id, handleNumbersRoll)

    return () => {
      window.removeEventListener(id, handleNumbersRoll)
    }
  }, [id])

  return (
    <Section>
      <Slide className={s.grid}>
        <div className={s.content}>
          {title && <h2 className={s.title}>{title}</h2>}

          <div
            className={s.list}
            data-scroll
            data-scroll-call={id}
            data-scroll-repeat
            data-scroll-position="middle,middle"
          >
            {values.map((item, i) => (
              <div key={`stat-${i}`} className={s.item}>
                <span ref={(el) => (numbers.current[i] = el)} className={s.value} data-value={item.value}>
                  0<sup>%</sup>
                </span>
                <p className={s.text} dangerouslySetInnerHTML={{ __html: item.text }} />
              </div>
            ))}
          </div>
        </div>
      </Slide>
    </Section>
  )
}

export default SectionNumbers
