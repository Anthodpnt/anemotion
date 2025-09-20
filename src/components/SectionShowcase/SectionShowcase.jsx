import { forwardRef, useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Container from '@/components/Container'
import Image from '@/components/Image'

import s from './SectionShowcase.module.scss'

const Project = forwardRef((_, ref) => {
  return (
    <article ref={ref} className={s.project}>
      <Container className={s.container}>
        <div className={s.content}>
          <div className={s.image} data-scroll data-scroll-speed="0.1">
            <Image src="//picsum.photos/600/400.webp" width={600} height={400} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.1">
            <Image src="//picsum.photos/600/400.webp" width={600} height={400} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.1">
            <Image src="//picsum.photos/600/400.webp" width={600} height={400} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.3">
            <Image src="//picsum.photos/600/400.webp" width={600} height={400} />
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
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
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
            trigger: root.current,
            start: 'bottom center',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // Color transition for each project.
      gsap.set(background.current, {
        backgroundColor: projects[0].color,
      })

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

      // Content transition for each project.
      let lastIndex = 0

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const length = projects.length

          const scroll = self.scroll() - self.start
          const scrollZone = length * window.innerHeight * 3

          const progress = Math.min(Math.max(scroll / scrollZone, 0), 1) * length
          const index = Math.floor(progress)

          if (index >= length || index < 0 || index === lastIndex) {
            return
          }

          // Slide the title.
          gsap.to(title.current, {
            y: `-${(100 / length) * index}%`,
            ease: 'back.inOut',
            duration: 0.5,
          })

          // Fade the suptitle and subtitle.
          gsap.to([suptitle.current, subtitle.current], {
            opacity: 0,
            duration: 0.3,
            ease: 'power3.out',
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
    <section ref={root} className={s.section}>
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
        {projects.map((project, i) => (
          <Project ref={(el) => (sections.current[i] = el)} key={`project-${i}`} {...project} />
        ))}
      </div>

      <div ref={background} className={s.background} />
    </section>
  )
}

export default SectionShowcase
