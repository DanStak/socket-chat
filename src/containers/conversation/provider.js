import React, {useContext, useEffect, useState} from 'react';
import ConversationContext from "./context";
import { withRouter } from "react-router-dom";
import {getFromLocalStorage, setInLocalStorage} from "../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../configs/local-storage-items";
import axios from "axios";
import API from "../../services/API";
import connectSocket from '../socket/connect'
import Factory from "../../models/Messages/Factory";

const ConversationProvider = ({ socket: { socket }, children }) => {
  const [actualInterlocutors, setActualInterlocutors] = useState('');
  const [ messages, setMessages ] = useState([]);
  const [ unreadMessagesInterlocutorsIds, setUnreadMessagesInterlocutorsIds ] = useState([]);
  const [ isDrawerOpen, setIsDrawerOpen] = useState(false)

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
        onReceiveMessage(message);
      })
    }

    return () => {
      if(socket) {
        socket.off('receive-message');
      }
    }
  }, [socket, actualInterlocutors]);

  const onReceiveMessage = (message) => {
    const isCurrentConversationMatchWithSender = message.sender.id === actualInterlocutors;
    if(isCurrentConversationMatchWithSender) {
      setMessages(prevMessages => {return [...prevMessages, message]});
    } else {
      setUnreadMessagesInterlocutorsIds((prevState => {
        return [...prevState, message.sender.id];
      }))
    }
  }

  const sendMessage = (value, callback) => {
    const message = Factory.create({
      body: value,
      type: 'text',
    }).raw();

    setMessages(prevMessages => {return [...prevMessages, message]});

    socket.emit('send-message', message, () => {
      callback();
    });
  }

  const startOrJoinToConversation = (actualInterlocutor) => {
    setActualInterlocutors(actualInterlocutor._id);
    const interlocutors = [actualInterlocutor._id, user._id];

    saveConversationStateInLocalStorage(actualInterlocutor);

    socket.emit('start-conversation', interlocutors);

    removeInterlocutorFromUnread(actualInterlocutor._id);

    if(isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }

  const saveConversationStateInLocalStorage = (actualInterlocutors) => {
    const conversationState = {
      sender: {
        name: user.name,
        id: user._id,
      },
      actualInterlocutors: actualInterlocutors._id,
    }

    setInLocalStorage(LOCAL_STORAGE_ITEMS.CONVERSATION_STATE, conversationState)
  }

  const removeInterlocutorFromUnread = (id) => {
    const unreadWithoutCurrent = unreadMessagesInterlocutorsIds.filter(interlocutorId => interlocutorId !== id );
    setUnreadMessagesInterlocutorsIds(unreadWithoutCurrent);
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  const getContext = () => ({
    actualInterlocutors,
    setActualInterlocutors,
    messages,
    sendMessage,
    startOrJoinToConversation,
    unreadMessagesInterlocutorsIds,
    isDrawerOpen,
    toggleDrawer,
  })

  return (
    <ConversationContext.Provider value={getContext()}>
      {children}
    </ConversationContext.Provider>
  );
}

export default connectSocket(withRouter(ConversationProvider));

