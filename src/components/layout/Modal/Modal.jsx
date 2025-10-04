import { useEffect } from 'react'
import cn from 'clsx'

import Cross from '@icons/Cross'
import Button from '@components/Button'

import s from './Modal.module.scss'

const Modal = ({ onClose, children, className }) => {
  // Manage the keyboard for closing the modal.
  // The ESC button will close the modal.
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
    <div className={cn(s.modal, className)}>
      <Button type="button" onClick={onClose} className={s.close}>
        <Cross />
      </Button>

      <div className={s.content}>
        {children}
      </div>

      <div onClick={onClose} className={s.background} />
    </div>
  )
}

export default Modal;
