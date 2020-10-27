import React, {useContext, useEffect, useState} from 'react';
import ConversationContext from "./context";
import { withRouter } from "react-router-dom";
import {getFromLocalStorage} from "../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../configs/local-storage-items";
import axios from "axios";
import API from "../../services/API";
import connectSocket from '../socket/connect'

const ConversationProvider = ({ socket: { socket }, children }) => {
  const [actualInterlocutors, setActualInterlocutors] = useState('');
  const [ messages, setMessages ] = useState([]);
  const [ unreadMessagesInterlocutorsIds, setUnreadMessagesInterlocutorsIds ] = useState([]);
  const user = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER)

  useEffect(() => {
    if(actualInterlocutors) {
      const interlocutorsIds = [ actualInterlocutors, user._id ];
      const roomName = interlocutorsIds.sort().join('-');

      axios.get(API.API_BASE + `conversations/${roomName}`)
        .then((response) => {
          setMessages(response.data)
        })
        .catch((error) => {})
    }
  }, [actualInterlocutors]);


  useEffect(() => {
    if(socket) {
      socket.on('receive-message', (message) => {
        const isCurrentConversationMatchWithSender = message.senderId === actualInterlocutors;
        if(isCurrentConversationMatchWithSender) {
          setMessages(prevMessages => {return [...prevMessages, message]});
        } else {
          setUnreadMessagesInterlocutorsIds((prevState => {
            return [...prevState, message.senderId];
          }))
        }
      })
    }

    return () => {
      if(socket) {
        socket.off('receive-message');
      }
    }
  }, [socket, actualInterlocutors]);


  const sendMessage = (value, callback) => {
    const message = {
      text: value,
      interlocutors: [actualInterlocutors, user._id],
      senderId: user._id,
      senderName: user.name,
    }
    setMessages(prevMessages => {return [...prevMessages, message]});

    socket.emit('send-message', message, () => {
      callback();
    });
  }

  const startOrJoinToConversation = (actualInterlocutor) => {
    setActualInterlocutors(actualInterlocutor._id);
    const interlocutors = [actualInterlocutor._id, user._id]
    socket.emit('start-conversation', interlocutors);
    removeInterlocutorFromUnread(actualInterlocutor._id)
  }

  const removeInterlocutorFromUnread = (id) => {
    const unreadWithoutCurrent = unreadMessagesInterlocutorsIds.filter(interlocutorId => interlocutorId !== id );
    setUnreadMessagesInterlocutorsIds(unreadWithoutCurrent);
  }

  const getContext = () => ({
    actualInterlocutors,
    setActualInterlocutors,
    messages,
    sendMessage,
    startOrJoinToConversation,
    unreadMessagesInterlocutorsIds,
  })

  return (
    <ConversationContext.Provider value={getContext()}>
      {children}
    </ConversationContext.Provider>
  );
}

export default connectSocket(withRouter(ConversationProvider));

