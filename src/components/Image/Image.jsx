import { useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import cn from 'clsx'

import Caption from '@/components/Caption'

import s from './Image.module.scss'

const Image = ({ aspect, caption, className, ...props }) => {
  const image = useRef()
  const outer = useRef()
  const inner = useRef()

  // Motion - Image appearance.
  useGSAP(
    () => {
      // Phase `in` - Expand the image.
      ScrollTrigger.create({
        trigger: outer.current,
        start: 'top bottom',
        end: 'top center',
        ease: 'none',
        scrub: true,
        onUpdate: (self) => {
          gsap.to(inner.current, {
            scale: 0.9 + self.progress * 0.1,
            borderRadius: 3 - self.progress * 2 + 'rem',
            ease: 'none',
            duration: 0,
          })

          gsap.to(image.current, {
            scale: 1.1 - self.progress * 0.1,
            ease: 'none',
            duration: 0,
          })
        },
      })

      // Phase `out` - Shrink the image.
      ScrollTrigger.create({
        trigger: outer.current,
        start: 'bottom center',
        end: 'bottom top',
        ease: 'none',
        scrub: true,
        onUpdate: (self) => {
          gsap.to(inner.current, {
            scale: 1 - self.progress * 0.1,
            borderRadius: 1 + self.progress * 2 + 'rem',
            ease: 'none',
            duration: 0,
          })

          gsap.to(image.current, {
            scale: 1 + self.progress * 0.1,
            ease: 'none',
            duration: 0,
          })
        },
      })
    },
    { scope: outer }
  )

  return (
    <div
      ref={outer}
      style={{ '--aspect': aspect ?? `${props.width} / ${props.height}` }}
      className={cn(s.image, className)}
    >
      <figure ref={inner} className={s.inner}>
        <img ref={image} {...props} />
        {caption && <Caption className={s.caption}>{caption}</Caption>}
      </figure>
    </div>
  )
}

export default Image
