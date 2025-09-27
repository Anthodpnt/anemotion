import { forwardRef, useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Section from '@layout/Section'
import Container from '@layout/Container'
import Background from '@layout/Background'
import Image from '@components/Image'

import s from './SectionShowcase.module.scss'

const Project = forwardRef(({ title }, ref) => {
  return (
    <article ref={ref} className={s.project}>
      <Container className={s.container}>
        <div className={s.content} data-scroll data-scroll-speed="0.1">
          <div className={s.image}>
            <Image src={`//placehold.co/600x400?text=${title}`} width={600} height={400} />
          </div>

          <div className={s.image}>
            <Image src={`//placehold.co/600x400?text=${title}`} width={600} height={400} />
          </div>

          <div className={s.image}>
            <Image src={`//placehold.co/600x400?text=${title}`} width={600} height={400} />
          </div>

          <div className={s.image}>
            <Image src={`//placehold.co/600x400?text=${title}`} width={600} height={400} />
          </div>
        </div>
      </Container>
    </article>
  )
})

const SectionShowcase = ({ projects }) => {
  const root = useRef()
  const title = useRef()
  const sections = useRef([])
  const subtitle = useRef()
  const suptitle = useRef()
  const background = useRef()

  // Motion - Project transitions on scroll.
  const { width } = useWindowSize()

  useGSAP(
    () => {
      // Initial state of the motion.
      gsap.set(background.current, {
        backgroundColor: projects[0].color,
      })

      // Motion - Color transition.
      projects.forEach((project, i) => {
        gsap.to(background.current, {
          backgroundColor: project.color,
          scrollTrigger: {
            trigger: sections.current[i],
            start: `top bottom`,
            end: `top top`,
            scrub: true,
          },
          immediateRender: false,
        })
      })

      // Motion - Content transition.
      let lastIndex = 0

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onUpdate: (self) => {
          const scroll = self.scroll() - self.start
          const scrollZone = projects.length * window.innerHeight * 2

          const progress = Math.min(Math.max(scroll / scrollZone, 0), 1) * projects.length
          const index = Math.floor(progress)

          if (index >= projects.length || index < 0 || index === lastIndex) {
            return
          }

          // Slide the title.
          gsap.to(title.current, {
            y: `-${(100 / projects.length) * index}%`,
            ease: 'back.inOut',
            duration: 0.5,
          })

          // Fade the suptitle and subtitle.
          gsap.to([suptitle.current, subtitle.current], {
            opacity: 0,
            ease: 'power3.out',
            duration: 0.3,
            onComplete: () => {
              suptitle.current.textContent = projects[index].suptitle
              subtitle.current.textContent = projects[index].subtitle

              gsap.to([suptitle.current, subtitle.current], {
                opacity: 1,
                ease: 'power3.out',
                duration: 0.3,
              })
            },
          })

          // Save the last index.
          lastIndex = index
        },
      })
    },
    { scope: root, dependencies: [width] }
  )

  return (
    <Section ref={root} className={s.section}>
      <header className={s.header}>
        <Container className={s.inner}>
          <p ref={suptitle} className={s.suptitle}>
            {projects[0].suptitle}
          </p>

          <h2 className={s.title}>
            <span ref={title} className={s.list}>
              {projects.map((project, i) => (
                <span key={`title-${i}`} style={{ '--accent': project.accent }}>
                  {project.title}
                </span>
              ))}
            </span>
          </h2>

          <p ref={subtitle} className={s.subtitle}>
            {projects[0].subtitle}
          </p>
        </Container>
      </header>

      <div className={s.projects}>
        {projects.map((_, i) => (
          <Project ref={(el) => (sections.current[i] = el)} key={`project-${i}`} title={`project-${i + 1}`} />
        ))}
      </div>

      <Background ref={background} />
    </Section>
  )
}

export default SectionShowcase
