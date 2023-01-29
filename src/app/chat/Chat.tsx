import React, { useEffect, useState } from 'react'
import './Chat.css'
import Calls from './calls/Calls'
export default function Chat() {
  const [messages, setMessages] = useState([])


  useEffect(()=>{
        fetch('/api/latestmessages')
        .then((response) => response.json()
        )
        .then((data) => {
          console.log('data mes', data.lm.rows);
          setMessages(data.lm.rows)
        })
        .catch((error) => {
            console.error('Error caught:', error);
        });
    }, [])

  const changeDate = (arg: string | number | Date) =>{
        let time = new Date(arg).toLocaleString();
        return time;
    }

  return (
    <div id='chat-div'>
          <h1>Calls</h1>
        <div id='calls-div'>
          {/* <Calls /> */}
        </div>
          <h1>Chat</h1>
        <div id='chat-messages-div'>
            {messages.map((m) => 
                    <div key={m.id} id="actual-chat">
                        {m.sender_id && 
                        <div id='message-totheleft'>
                            <div id='message-and-img-div'>
                                <h4 id="actual-message"><i>{m.message}</i></h4>
                                <h5 id='first_last_message'>{m.first} {m.last}</h5> 
                                <h6 id='date_message'>{changeDate(m.created_at)}</h6>
                            </div>
                            <div id="message-and-img-div-corner" ></div>
                        </div>}
                        {m.recipient_id && 
                        <div id='message-totheright'>
                            <div id='response-and-img-div'>
                                <h4 id="actual-message"><i>{m.message}</i></h4>
                                <h5 id='first_last_message'>{m.first} {m.last}</h5> 
                                <h6 id='date_message'>{changeDate(m.created_at)}</h6>
                            </div>
                            <div id="response-and-img-div-corner" ></div>
                        </div>}
                    </div>
                )}
        </div>

        <textarea placeholder='Type Yout Message' id='textarea-chat'/>
        <button id='button-send'>Send</button>
    </div>
  )
}
