import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Howl } from 'howler'
import cn from 'clsx'

import Container from '@/components/Container'
import Rocket from '@/components/Icons/Rocket'
import Verified from '@/components/Icons/Verified'

import s from './SectionExample.module.scss'

// Sound effect.
const sound = new Howl({
  src: ['/sounds/level-up.mp3'],
  volume: 0.4,
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

const SectionExample = ({ title, subtitle }) => {
  const slider = useRef()
  const section = useRef()
  const running = useRef(false)

  // Motion - Arc Slider
  const models = useRef([])

  const { contextSafe } = useGSAP(
    () => {
      const angle = 25
      const length = models.current.length - 1

      // Organize the models in an arc formation.
      gsap.set(models.current, {
        rotate: (i) => i * angle,
        opacity: (i) => (i === 0 ? 1 : 0),
      })

      // Motion of the models on scroll.
      const progress = { value: 0 }

      gsap.to(progress, {
        value: length,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom bottom',
          snap: {
            ease: 'power1.inOut',
            snapTo: 1 / length,
            duration: 0.3,
          },
          scrub: true,
        },
        onUpdate: () => {
          models.current.forEach((item, i) => {
            const rotation = i * angle - progress.value * angle
            const opacity = 1 - Math.min(Math.abs(rotation) / angle, 1)

            gsap.set(item, {
              rotate: rotation,
              opacity: opacity,
            })
          })
        },
      })
    },
    { scope: section.current }
  )

  // Motion - Particle effect on click.
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
      onComplete: () => {
        running.current = false
      },
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
    <section ref={section} className={s.section}>
      <Container className={s.container}>
        <header className={s.header}>
          <div className={s.inner}>
            <h2 className={s.title} dangerouslySetInnerHTML={{ __html: title }} />
            {subtitle && <p className={s.subtitle}>{subtitle}</p>}
          </div>
        </header>

        <div className={s.content}>
          <div ref={slider} className={s.slider}>
            <div ref={(el) => (models.current[0] = el)} className={s.model}>
              <button type="button" className={s.basic}>
                Release
              </button>
            </div>

            <div ref={(el) => (models.current[1] = el)} className={s.model}>
              <button type="button" className={s.better}>
                Release
              </button>
            </div>

            <div ref={(el) => (models.current[2] = el)} className={s.model}>
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
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SectionExample
