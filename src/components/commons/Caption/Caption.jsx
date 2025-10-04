import cn from 'clsx'

import s from './Caption.module.scss'

const Caption = ({ children, className }) => {
  return (
    <p className={cn(s.caption, className)}>
      {children}
    </p>
  )
}

export default Caption
