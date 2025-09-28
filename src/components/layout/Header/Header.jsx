import { useState } from 'react'

import Code from '@icons/Code'
import CodeModal from '@layout/Code'

import s from './Header.module.scss'

const Header = () => {
  const [showCode, setShowCode] = useState(false)

  const handleCodeToggle = () => {
    setShowCode((prev) => !prev)
  }

  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img src="/images/logo-evs-white.png" alt="Logo of EVS" />
      </div>

      <button type="button" onClick={handleCodeToggle} className={s.code}>
        <Code width={32} />
      </button>

      {showCode && <CodeModal onClose={handleCodeToggle} />}
    </header>
  )
}

export default Header
