import cn from 'clsx'

import s from './Image.module.scss'

const Image = ({ aspect, className, ...props }) => {
  return (
    <figure style={{ '--aspect': aspect ?? `${props.width} / ${props.height}` }} className={cn(s.image, className)}>
      <img {...props} />
    </figure>
  )
}

export default Image
