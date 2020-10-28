import React from 'react'

import styles from './ChatMessage.module.css'

export default function ChatMessage({author, timestamp, content}) {
    return <div>
        <div className={styles.messageHeader}>{author} - {new Date(timestamp).toLocaleTimeString()}</div>
        <p>{content}</p>
    </div>
}
