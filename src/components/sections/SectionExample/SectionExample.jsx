import { forwardRef, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Howl } from 'howler'
import cn from 'clsx'

import Rocket from '@icons/Rocket'
import Verified from '@icons/Verified'
import Section from '@layout/Section'
import Slide from '@layout/Slide'

import s from './SectionExample.module.scss'

// Sound effect.
const sound = new Howl({
  src: ['/sounds/level-up.mp3'],
  volume: 0.7,
})

// Color for the particles.
const COLORS = [
  '#ffd93d',
  '#ff3d68',
  '#3dffae',
  '#3da9ff',
  '#b23dff',
  '#ff8c42',
  '#ff6ec7',
  '#00ffc2',
  '#ffd700',
  '#ff4e00',
]

const Model = forwardRef(({ name, level, description, children }, ref) => {
  return (
    <div ref={ref} className={s.model}>
      <div className={s.inner}>
        <figure className={s.image}>
          <span className={s.corner} />
          <span className={s.corner} />
          {children}
        </figure>

        <header className={s.header}>
          <p className={s.name}>{name}</p>
          <p className={s.level}>
            <sub>Lvl</sub> {level}
          </p>

          <svg width="20" height="20" viewBox="0 0 16 16" className={s.star}>
            <path d="M8 0 A8 8 0 0 0 16 8 A8 8 0 0 0 8 16 A8 8 0 0 0 0 8 A8 8 0 0 0 8 0 Z" />
          </svg>
        </header>

        <div className={s.content}>
          <p className={s.text} dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        <svg viewBox="0 0 370 570" className={s.border}>
          <path
            d="M8 0 A8 8 0 0 0 16 8 A8 8 0 0 0 8 16 A8 8 0 0 0 0 8 A8 8 0 0 0 8 0 Z"
            className={s.star}
            transform="translate(0,0)"
          />

          <path
            d="M8 0 A8 8 0 0 0 16 8 A8 8 0 0 0 8 16 A8 8 0 0 0 0 8 A8 8 0 0 0 8 0 Z"
            className={s.star}
            transform="translate(354,0)"
          />

          <path
            d="M8 0 A8 8 0 0 0 16 8 A8 8 0 0 0 8 16 A8 8 0 0 0 0 8 A8 8 0 0 0 8 0 Z"
            className={s.star}
            transform="translate(354,554)"
          />

          <path
            d="M8 0 A8 8 0 0 0 16 8 A8 8 0 0 0 8 16 A8 8 0 0 0 0 8 A8 8 0 0 0 8 0 Z"
            className={s.star}
            transform="translate(0,554)"
          />

          <path
            d="M30 0 H340 A30 30 0 0 0 370 30 V540 A30 30 0 0 0 340 570 H30 A30 30 0 0 0 0 540 V30 A30 30 0 0 0 30 0 Z M30 1 A29 29 0 0 1 1 30 V540 A29 29 0 0 1 30 569 H340 A29 29 0 0 1 369 540 V30 A29 29 0 0 1 340 1 H30 Z"
            className={s.shape}
          />
        </svg>
      </div>
    </div>
  )
})

const SectionExample = ({ models }) => {
  const scope = useRef()
  const items = useRef([])

  // Motion - Arc slider.
  const running = useRef(false)

  const { contextSafe } = useGSAP(
    () => {
      const angle = 25
      const length = items.current.length - 1

      // Organize the items in an arc formation.
      gsap.set(items.current, {
        rotate: (i) => i * angle,
        opacity: (i) => (i === 0 ? 1 : 0),
      })

      // Create the motion based on the scroll.
      const motion = (progress) => {
        items.current.forEach((item, i) => {
          const rotate = i * angle - progress * angle
          const opacity = 1 - Math.min(Math.abs(rotate) / angle, 1)

          gsap.set(item, {
            rotate,
            opacity,
          })
        })
      }

      // Motion of the items on scroll.
      const progress = { value: 0 }

      gsap.to(progress, {
        value: length,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: 'bottom bottom',
          snap: {
            ease: 'power1.inOut',
            snapTo: 1 / length,
            duration: 0.3,
          },
          scrub: true,
        },
        onUpdate: () => motion(progress.value),
      })
    },
    { scope }
  )

  // Motion - Particle effect on interaction.
  const label = useRef()
  const particles = useRef()

  const handleRelease = contextSafe((e) => {
    if (running.current) {
      return
    }

    // Flag the running state to avoid spamming.
    running.current = true

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Create particles at the mouse position.
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('span')
      particle.classList.add(s.particle)
      particles.current.appendChild(particle)

      // Generate a new particle.
      const color = COLORS[gsap.utils.random(0, COLORS.length - 1, 1)]

      gsap.set(particle, {
        x,
        y,
        scale: 1,
        opacity: 1,
        backgroundColor: color,
      })

      // Calculate the random distance and angle for the particle to travel.
      const angle = gsap.utils.random(0, Math.PI * 2, 0.01)
      const duration = gsap.utils.random(0.8, 1.2, 0.1)
      const distance = gsap.utils.random(50, 100, 1)

      gsap.to(particle, {
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        ease: 'power1.out',
        scale: 0,
        opacity: 0,
        duration,
        onStart: () => {
          if (i === 0) {
            sound.play()
          }
        },
        onComplete: () => {
          particle.remove()
        },
      })
    }

    // Label text animation.
    const tl = gsap.timeline()

    tl.to('.label', {
      ease: 'power3.out',
      yPercent: -100,
      duration: 0.3,
    }).to('.label', {
      ease: 'power3.out',
      delay: 1,
      yPercent: 0,
      duration: 0.3,
      onComplete: () => (running.current = false),
    })
  })

  // Motion - Light effect on edges.
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const center = window.innerWidth / 2
      const progress = (e.clientX - center) / center
      setAngle(90 + progress * 90)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Section ref={scope} className={s.section}>
      <Slide className={s.container}>
        <div className={s.slider}>
          <div className={s.roller}>
            <Model ref={(el) => (items.current[0] = el)} {...models[0]}>
              <button type="button" className={s.basic}>
                Release
              </button>
            </Model>

            <Model ref={(el) => (items.current[1] = el)} {...models[1]}>
              <button type="button" className={s.better}>
                Release
              </button>
            </Model>

            <Model ref={(el) => (items.current[2] = el)} {...models[2]}>
              <button type="button" style={{ '--angle': `${angle}deg` }} onClick={handleRelease} className={s.best}>
                <span ref={label} className={s.label}>
                  <span className="label">
                    <Rocket /> Release
                  </span>
                  <span className="label">
                    <Verified /> Success
                  </span>
                </span>

                <span ref={particles} className={s.particles} />

                <span className={cn(s.effect, s.glow)} />
                <span className={cn(s.effect, s.light)} />
                <span className={cn(s.effect, s.shadow)} />
                <span className={cn(s.effect, s.outline)} />
                <span className={cn(s.effect, s.highlight)} />
              </button>
            </Model>
          </div>
        </div>
      </Slide>
    </Section>
  )
}

export default SectionExample
