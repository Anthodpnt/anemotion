import s from './Message.module.scss'

const Message = ({ icon, text, title }) => {
  return (
    <div className={s.message}>
      {icon}
      {title && <p className={s.title}>{title}</p>}
      {text && <p className={s.text}>{text}</p>}
    </div>
  )
}

export default Message
