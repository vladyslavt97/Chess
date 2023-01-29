import React, { useEffect, useState } from 'react'
import './Chat.css'
import Calls from './calls/Calls'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


export default function Chat() {
  const clickedUserId = useSelector((state: RootState) => state.board.id);
  console.log('clickedUserIdclickedUserId: ', clickedUserId);
  
  const myId = useSelector((state: RootState) => state.board.myId);
  console.log('only my id', myId);
  

  // const messages = useSelector((state: RootState) => state.messages);
  const messages = useSelector((state: RootState) => state.messages.messagesValue.filter(m=>
    m.recipient_id === clickedUserId && m.sender_id === myId ||
    m.recipient_id === myId && m.sender_id === clickedUserId));

    console.log('messagesmessagesmessages: ', messages);
    
  const changeDate = (arg: string | number | Date) =>{
      let time = new Date(arg).toLocaleString();
      return time;
  }

  return (
    <div id='chat-div'>
          {/* <h1>Calls</h1>
        <div id='calls-div'>
          <Calls />
        </div> */}
          <h1>Chat</h1>
        <div id='chat-messages-div'>
            {messages.map((m) => 
                    <div key={m.id} id="actual-chat">
                        {m.sender_id === clickedUserId && 
                        <div id='message-totheleft'>
                            <div id='message-and-img-div'>
                                <h4 id="actual-message"><i>{m.message}</i></h4>
                                <h5 id='first_last_message'>{m.first} {m.last}</h5> 
                                <h6 id='date_message'>{changeDate(m.created_at)}</h6>
                            </div>
                            <div id="message-and-img-div-corner" ></div>
                        </div>}
                        {m.recipient_id === clickedUserId && 
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

        <textarea placeholder='Type Your Message' id='textarea-chat'/>
        <button id='button-send'>Send</button>
    </div>
  )
}
