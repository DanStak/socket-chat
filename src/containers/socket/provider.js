import React, {useEffect, useState} from 'react';
import SocketContext from "./context";
import LOCAL_STORAGE_ITEMS from "../../configs/local-storage-items";
import io from 'socket.io-client'
import {getFromLocalStorage} from "../../utils/localStorage";

const SERVER_URL = 'http://localhost:5000'

const SocketProvider = (props) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const user = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER);

    const socketIo = io(SERVER_URL, { query: { id: user._id } })
    setSocket(socketIo);

    socketIo.emit('join');

    return () => {
      console.log(socket, 'UNMMOUNT')
      // socket.close();
    }
  }, []);


  const value = {
    socket,
  }

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
