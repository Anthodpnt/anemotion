import { useRef } from 'react'
import cn from 'clsx'

import Caption from '@components/Caption'
import { useMaskMotion } from '@motion/useMaskMotion'

import s from './Image.module.scss'

const Image = ({ aspect, caption, className, ...props }) => {
  const root = useRef()
  const image = useRef()
  const content = useRef()

  // Motion - Mask reveal.
  useMaskMotion(root, image, content)

  return (
    <div
      ref={root}
      style={{ '--aspect': aspect ?? `${props.width} / ${props.height}` }}
      className={cn(s.image, className)}
    >
      <figure ref={image} className={s.inner}>
        <div ref={content} className={s.content}>
          <img {...props} />
          {caption && <Caption className={s.caption}>{caption}</Caption>}
        </div>
      </figure>
    </div>
  )
}

export default Image
