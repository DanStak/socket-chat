import React, {useEffect, useState} from 'react';
import UserContext from "./context";
import {getFromLocalStorage} from "../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../configs/local-storage-items";
import axios from "axios";
import API from "../../services/API";

const UserProvider = ({ children }) => {

  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);


  const getUsers = () => {
    const user = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER);
    axios.get(API.API_BASE + 'users')
      .then((response) => {
        setUsers(response.data.filter(singleUser => singleUser._id !== user._id))
      })
      .catch((error) => {})
  }


  const getContext = ({
    users,
  })

  return (
    <UserContext.Provider value={getContext}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
