import React from 'react'
import './Chat.css'
export default function Chat() {
  return (
    <div id='chat-div'>
        <div>Chat</div>
        <div id='chat-messages-div'>
            <div>messages</div>
        </div>

        <textarea placeholder='Type Yout Message' id='textarea-chat'/>
        <button id='button-send'>Send</button>
    </div>
  )
}
