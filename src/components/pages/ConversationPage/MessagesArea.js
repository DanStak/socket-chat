import React, {useEffect, useState} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import SingleMessage from "./SingleMessage";
import connectSocket from "../../../containers/socket/connect";
import MessageInput from "../../common/inputs/MessageInput";
import connectConversation from '../../../containers/conversation/connect'

const MessagesArea = ({ socket: { socket }, conversation: { actualInterlocutors } }) => {

  const [messages, setMessage] = useState([]);

  useEffect(() => {
    if(socket) {
      socket.on('receive-message', (message) => {
        console.log(message)
        setMessage(prevMessages => {return [...prevMessages, message]});
      })
    }
    return () => {
      if(socket) {
        socket.off('receive-message');
      }
    }
  }, [socket])


  if(actualInterlocutors.length === 0) {
    return null
  }

  return (
    <div className='message-area'>
      <ScrollToBottom
        className='message-area__scroll-list'
      >
        <ul>
          {messages.map((message, index) => (
            <SingleMessage key={index} message={message}/>
          ))}
        </ul>
      </ScrollToBottom>
      <MessageInput/>
    </div>
  );
};

export default connectSocket(connectConversation(MessagesArea));
