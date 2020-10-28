import {useUser} from '../lib/use-user'
import {useState, useRef, useEffect} from 'react'
import {messages} from '../lib/firebase'

export default function ChatBox() {
    const [user, setUser] = useUser()
    const [newUser, setNewUser] = useState(user?.name ?? '')
    const [message, setMessage] = useState('')

    const messageInputRef = useRef()

    useEffect(() => {
        messageInputRef.current.focus()
    }, [])

    const submitMessage = () => {
        if (!user || !message) {
            return
        }

        messages().push({
            author: user,
            timestamp: Date.now(),
            content: message
        })

        setMessage('')
    }

    return <div>
        <input
            value={user || newUser}
            onChange={({target}) => setNewUser(target.value)}
            onKeyDown={({keyCode}) => keyCode === 13 && setUser(newUser)}
        />
        <button onClick={() => setUser(newUser)}>Set Name</button>
        <br/>
        <input
            ref={messageInputRef}
            disabled={!user}
            value={message}
            onChange={({target}) => setMessage(target.value)}
            onKeyDown={({keyCode}) => keyCode === 13 && submitMessage()}
        />
        <button disabled={!user || !message} onClick={submitMessage}>Send</button>
    </div>
}
