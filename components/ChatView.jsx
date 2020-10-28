import React, {useRef, useEffect} from 'react'
import {useList} from 'react-firebase-hooks/database'
import ChatBox from './ChatBox'
import {messages} from '../lib/firebase';
import ChatMessage from './ChatMessage';

export default function ChatView() {
    const [snapshots, loading, error] = useList(messages().limitToLast(100));
    const lastMessage = useRef()

    useEffect(() => {
        if (lastMessage.current) {
            lastMessage.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [snapshots])

    if (loading) return 'Loading...'
    if (error) return <span style={{color: 'red'}}>{error}</span>

    return <div style={{width: '800px'}}>
        <button onClick={() => messages().remove()}>Purge</button>
        <div style={{overflowY: 'scroll', height: '600px', outline: '1px solid gray'}}>
            {snapshots.map(snapshot => (
                <div key={snapshot.key} ref={lastMessage}>
                    <ChatMessage {...snapshot.val()}/>
                </div>
            ))}
        </div>
        <hr/>
        <ChatBox/>
    </div>
}
