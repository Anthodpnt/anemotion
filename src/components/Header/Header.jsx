import Button from '@/components/Button'

import s from './Header.module.scss'

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img src="/images/logo-evs-white.png" alt="Logo of EVS" />
      </div>
    </header>
  )
}

export default Header
