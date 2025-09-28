import { useEffect } from 'react'

import s from './Tutorial.module.scss'

const Tutorial = ({ onClose }) => {
  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleClose)

    return () => {
      window.removeEventListener('keydown', handleClose)
    }
  }, [onClose])

  return (
    <div className={s.modal}>
      <div className={s.content}>
        <div className={s.inner}>
          <div className={s.leftSide}>
            <p className={s.title}>About</p>
            <p className={s.text}>
              This website is a companion to the talk <b>Anemotion</b>, which shows how animations can be used to shape
              emotions on the web.
            </p>
          </div>

          <div className={s.line} />

          <div className={s.rightSide}>
            <p className={s.title}>How to explore</p>
            <p className={s.text}>
              You can explore this website using the <b>mouse</b> or the <b>arrow keys</b> on your keyboard.
            </p>
          </div>
        </div>

        <button type="button" onClick={onClose} className={s.button}>
          Got it!
        </button>
      </div>

      <div onClick={onClose} className={s.background} />
    </div>
  )
}

export default Tutorial
