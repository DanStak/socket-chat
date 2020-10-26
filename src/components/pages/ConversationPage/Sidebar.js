import React, {useEffect, useState} from 'react';
import axios from "axios";
import API from "../../../services/API";
import LOCAL_STORAGE_ITEMS from "../../../configs/local-storage-items";
import connectSocket from '../../../containers/socket/connect';
import connectConversation from '../../../containers/conversation/connect';
import {getFromLocalStorage} from "../../../utils/localStorage";

const Sidebar = ({ conversation: { setActualInterlocutors }, socket: { socket } }) => {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if(socket) {
      socket.on('join-to-room', ({roomName, sender}) => {
        socket.emit('lets-join', roomName, () => {
          console.log(roomName, sender)
          setActualInterlocutors(sender)
        });
      })
    }
  }, [socket])


  const getUsers = () => {
    const user = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER);
    axios.get(API.API_BASE + 'users',)
      .then((response) => {
        setUsers(response.data.filter(singleUser => singleUser._id !== user._id))
      })
      .catch((error) => {})
  }

  const renderUsers = () => {
    return (
      users.map((user, index) => (
        <li
          key={index}
        >
          <a
            className='has-text-light'
            onClick={() => startOrJoinToConversation(user)}
          >
            {user.name}
          </a>
        </li>
      ))
    );
  }

  const startOrJoinToConversation = (actualInterlocutor) => {
    const user = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER);
    setActualInterlocutors(actualInterlocutor._id);
    const interlocutors = [actualInterlocutor._id, user._id]
    socket.emit('start-conversation', interlocutors)
  }

  return (
    <div className='sidebar'>
      <aside className="menu">
        <p className="menu-label is-size-6 has-text-light">Conversations</p>
        <ul className="menu-list">
          {renderUsers()}
        </ul>
      </aside>
    </div>

  );
};

export default connectSocket(connectConversation(Sidebar));
