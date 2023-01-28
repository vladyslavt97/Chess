import React from 'react'
import './Chat.css'
export default function Chat() {
  return (
    <div id='chat-div'>
        <div>Chat</div>
        <input type="text" placeholder='Type Yout Message' id='messageyourfriend'/>
        <button>Send</button>
    </div>
  )
}
