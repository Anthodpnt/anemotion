import { useEffect } from 'react'

import QRCode from '@icons/Code'

import s from './Code.module.scss'

const Code = ({ onClose }) => {
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
        <p className={s.title}>Scan Me</p>
        <div className={s.code}>
          <QRCode width={250} />
        </div>
        <p className={s.text}>anemotion.vercel.app</p>
      </div>

      <div onClick={onClose} className={s.background} />
    </div>
  )
}

export default Code
