import React, {useContext, useEffect} from 'react';
import UserContext from "../../../containers/users/context";
import ConversationContext from "../../../containers/conversation/context";
import SocketContext from "../../../containers/socket/context";
import {getFromLocalStorage} from "../../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../../configs/local-storage-items";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ClassNames from 'classnames';


const Sidebar = () => {
  const { setActualInterlocutors, startOrJoinToConversation, unreadMessagesInterlocutorsIds } = useContext(ConversationContext);
  const { socket } = useContext(SocketContext);
  const savedUser = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER);

  useEffect(() => {
    if(socket) {
      socket.on('join-to-room', ({roomName, sender}) => {
        socket.emit('lets-join', roomName, () => {
          setActualInterlocutors(sender)
        });
      })
    }
  }, [socket])


  const renderUsers = () => {
    const { users } = useContext(UserContext)
    return (
      users.map((user, index) => {

        const classes = ClassNames({
          'has-text-light': true,
          'has-text-weight-bold': checkIsUnread(user._id)

        })

        return (
          <li
            key={index}
          >
            <a
              className={classes}
              onClick={() => startOrJoinToConversation(user)}
            >
              {user.name}
            </a>
          </li>
        )
      })
    );
  }

  const checkIsUnread = (id) => {
    return unreadMessagesInterlocutorsIds.includes(id);
  }

  const logOut = () => {
    console.log('log-out')
  }

  return (
    <div className='sidebar'>
      <aside className="menu sidebar__aside">
        <div className='sidebar__users'>
          <p className="menu-label is-size-6 has-text-light">Conversations</p>
          <ul className="menu-list">
            {renderUsers()}
          </ul>
        </div>

        <div className='sidebar__user-info'>
          <p>{ savedUser.name }</p>
          <ExitToAppIcon onClick={logOut}/>
        </div>
      </aside>
    </div>

  );
};

export default Sidebar;
