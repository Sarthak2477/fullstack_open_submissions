import { useSelector } from "react-redux"

const Notification = () => {
    const message = useSelector((state) => state.notification)

    return message ? <div className={message.class}>{message.text}</div> : null
}

export default Notification
