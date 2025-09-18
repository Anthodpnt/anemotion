import { forwardRef, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useWindowSize } from 'react-use'

import Container from '@/components/Container'
import Image from '@/components/Image'

import s from './SectionShowcase.module.scss'

const Project = forwardRef(({ accent, title, suptitle, subtitle }, ref) => {
  return (
    <article ref={ref} style={{ '--accent': accent }} className={s.project}>
      <Container className={s.container}>
        <header className={s.header}>
          <div className={s.inner}>
            {suptitle && <p className={s.suptitle}>{suptitle}</p>}
            <h2 className={s.title}>{title}</h2>
            {subtitle && <p className={s.subtitle}>{subtitle}</p>}
          </div>
        </header>

        <div className={s.content}>
          <div className={s.image} data-scroll data-scroll-speed="0.1">
            <Image src="//picsum.photos/600/400.webp?blur=10" width={600} height={400} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.1">
            <Image src="//picsum.photos/600/400.webp?blur=10" width={600} height={400} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.1">
            <Image src="//picsum.photos/600/400.webp?blur=10" width={600} height={400} />
          </div>

          <div className={s.image} data-scroll data-scroll-speed="0.3">
            <Image src="//picsum.photos/600/400.webp?blur=10" width={600} height={400} />
          </div>
        </div>
      </Container>
    </article>
  )
})

const SectionShowcase = ({ projects }) => {
  const root = useRef()
  const sections = useRef([])
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
      projects.forEach((project, i) => {
        gsap.to(background.current, {
          backgroundColor: project.color,
          ease: 'none',
          scrollTrigger: {
            trigger: sections.current[i],
            start: `top+=${window.innerHeight * 0.5} bottom`,
            end: `top+=${window.innerHeight * 0.5} center`,
            scrub: true,
          },
          immediateRender: false,
        })
      })
    },
    { scope: root, dependencies: [width] }
  )

  return (
    <section ref={root} className={s.section}>
      {projects.map((project, i) => (
        <Project ref={(el) => (sections.current[i] = el)} key={`project-${i}`} {...project} />
      ))}

      <div ref={background} className={s.background} />
    </section>
  )
}

export default SectionShowcase
