import React, { useEffect, useState } from 'react'
import './Chat.css'
import Calls from './calls/Calls'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { socket } from '../socket/socket';



export default function Chat() {
  const [messageState, setMessageState] = useState('');
  const clickedUserId = useSelector((state: RootState) => state.board.id);
  
  const myId = useSelector((state: RootState) => state.board.myId);

  // const messages = useSelector((state: RootState) => state.messages);
  const messages = useSelector((state: RootState) => state.messages.messagesValue.filter(m=>
    m.recipient_id === clickedUserId && m.sender_id === myId ||
    m.recipient_id === myId && m.sender_id === clickedUserId));

  const changeDate = (arg: string | number | Date) =>{
      let time = new Date(arg).toLocaleString();
      return time;
  }


  //emit to the server
  const handleSubmitMessages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("private_message", {messageState, selectedFriendId: clickedUserId});
    setMessageState('');
  }
  const handleChangeOfMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageState(event.target.value);
  }

  const onEnterKeyDownChat = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      e.preventDefault();
      socket.emit("private_message", {messageState, selectedFriendId: clickedUserId});
      setMessageState('');
    }
  }
console.log('clickedUserId: ', clickedUserId);

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

        {clickedUserId ? <form onSubmit={handleSubmitMessages} id="chat-form">
            <textarea placeholder='Type Your Message' 
              onChange={handleChangeOfMessage}
              onKeyDown={onEnterKeyDownChat}
              id='textarea-chat'
              value={messageState}
            />
            <button id='button-send'>Send</button>
        </form> : null}
    </div>
  )
}
