import cn from 'clsx'

import s from './Container.module.scss'

const Container = ({ children, className }) => {
  return <div className={cn(s.container, className)}>{children}</div>
}

export default Container
