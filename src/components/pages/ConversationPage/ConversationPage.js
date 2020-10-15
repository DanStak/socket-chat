import React, { useEffect, useState } from 'react';
import connect from "../../../containers/conversation/connect";
import io from "socket.io-client";
import queryString from "query-string";

const SERVER_URL = 'http://localhost:5000';
let socket;

const ConversationPage = ({ conversation, location: { search } }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');


  useEffect (() => {
    const {name, room} = queryString.parse(search);

    socket = io(SERVER_URL);

    socket.emit('join', { name, room }, () => {})

    return () => {
      console.log(name, room)
      socket.emit('disconnect', { name, room }, () => {});
    }
  }, [SERVER_URL, search]);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message, 'MESSAGE RECEIVED')
      setMessages((messages) => [...messages, message]);
    })
  }, [])


  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    socket.emit('send-message', message, (error) => {
      if(error) {
        console.log(error, 'ERROR')
      }
      setMessage('')
    });
  }

  return (
    <div>
      <input
        name='message'
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={handleKeyPress}
      />
      {console.log(messages)}
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationPage;
