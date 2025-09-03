import { useTimer } from '@/hooks/useTimer'
import { useClock } from '@/hooks/useClock'

import s from './Header.module.scss'

const Header = () => {
  const timer = useTimer()
  const clock = useClock()

  return (
    <header className={s.header}>
      <p className={s.text}>{clock}</p>
      <p className={s.text}>{timer}</p>
    </header>
  )
}

export default Header
