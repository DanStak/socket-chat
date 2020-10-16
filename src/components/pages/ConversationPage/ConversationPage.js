import React, { useEffect, useState } from 'react';
import connect from "../../../containers/conversation/connect";
import PageContainer from "../../common/PageContainer";
import MessagesArea from "./MessagesArea";
import MessageInput from "../../common/inputs/MessageInput";


const ConversationPage = ({ conversation: { name, room, socket } , location: { search } }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isMessageSending, setIsMessageSending] = useState(false);


  useEffect (() => {
    if(name && room) {
      socket.emit('join', { name, room }, () => {})
    }
  }, [name, room]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
      setIsMessageSending(false);
    })

    return () => {
      socket.emit('disconnect', { name, room }, () => {});
      socket.off();
    }
  }, [])


  return (
    <PageContainer className='conversation-page'>
        <MessagesArea messages={messages}/>
        <MessageInput/>
    </PageContainer>
  );
};

export default connect(ConversationPage);
