import s from './Message.module.scss'

const Message = ({ icon, text, title }) => {
  return (
    <div className={s.message}>
      <div className={s.content}>
        <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcm1iY3p3aXN4aXNkczR4ZHBuMnUwY2lyN2tnbmozNnFldzVreGk4cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/15aGGXfSlat2dP6ohs/giphy.gif" alt="" />
        {icon}
        {title && <p className={s.title}>{title}</p>}
        {text && <p className={s.text}>{text}</p>}
      </div>
    </div>
  )
}

export default Message
