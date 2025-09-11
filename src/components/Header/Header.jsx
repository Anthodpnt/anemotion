import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { useTimer } from '@/hooks/useTimer'
import { useClock } from '@/hooks/useClock'

import s from './Header.module.scss'

const Header = () => {
  const header = useRef()

  const timer = useTimer()
  const clock = useClock()

  // Motion - Header morph on scroll.
  useGSAP(() => {}, { scope: header })

  return (
    <header ref={header} className={s.header}>
      <p className={s.text}>{clock}</p>
      <img src="/images/logo-evs.png" alt="Logo of EVS" className={s.logo} />
      <p className={s.text}>{timer}</p>
    </header>
  )
}

export default Header
