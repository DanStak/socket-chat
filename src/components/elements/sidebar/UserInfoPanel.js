import React from 'react';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {clearLocalStorage, getFromLocalStorage} from "../../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../../configs/local-storage-items";
import { withRouter } from "react-router-dom";

const UserInfoPanel = (props) => {
  const savedUser = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER);

  const logOut = () => {
    clearLocalStorage();
    props.history.replace('/')
    console.log('log-out')
  }

  return (
    <div className='sidebar__user-info'>
      <p>{ savedUser.name }</p>
      <div className='log-out-icon'>
        <ExitToAppIcon onClick={logOut}/>
      </div>
    </div>
  );
};

export default withRouter(UserInfoPanel);
