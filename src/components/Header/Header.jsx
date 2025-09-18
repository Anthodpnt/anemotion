import Button from '@/components/Button'

import s from './Header.module.scss'

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img src="/images/logo-evs.png" alt="Logo of EVS" />
      </div>

      <Button type="button" className={s.button}>
        <span className={s.icon}>
          <span className={s.line} />
          <span className={s.line} />
          <span className={s.line} />
        </span>
      </Button>
    </header>
  )
}

export default Header
