import cn from 'clsx'

import Caption from '@components/Caption'

import s from './Image.module.scss'

const Image = ({ caption, className, ...props }) => {
  const aspect = `${props.width} / ${props.height}`

  return (
    <figure style={{ '--aspect': aspect }} className={cn(s.image, className)}>
      <img {...props} />
      {caption && <Caption className={s.caption}>{caption}</Caption>}
    </figure>
  )
}

export default Image
