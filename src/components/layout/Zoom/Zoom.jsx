import { useCallback } from 'react'

import Modal from '@layout/Modal'
import Video from '@components/Video'
import { useAppContext } from '@/App.context'

import s from './Zoom.module.scss'

const Zoom = () => {
  const { showVideoModal, showVideoSource, setShowVideoModal, setShowVideoSource } = useAppContext()

  const handleClose = useCallback(() => {
    setShowVideoModal(false)
    setShowVideoSource(null)
  }, [setShowVideoModal, setShowVideoSource])

  if (!showVideoModal) {
    return null
  }

  return (
    <Modal onClose={handleClose}>
      <Video src={showVideoSource} className={s.video} loop muted autoPlay />
    </Modal>
  )
}

export default Zoom
