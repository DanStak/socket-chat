import React, {useContext, useEffect} from 'react';
import UserContext from "../../../containers/users/context";
import ConversationContext from "../../../containers/conversation/context";
import SocketContext from "../../../containers/socket/context";
import UserItem from "./UserItem";
import UserInfoPanel from "./UserInfoPanel";
import Scrollbars from 'react-custom-scrollbars';
import { SwipeableDrawer } from '@material-ui/core';
import Drawer from "./Drawer";

const Sidebar = () => {
  const { setActualInterlocutors } = useContext(ConversationContext);
  const { socket } = useContext(SocketContext);

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
        return (
          <UserItem key={index} user={user}/>
        )
      })
    );
  }

  const sidebar = (
    <div className='sidebar'>
      <aside className="menu sidebar__aside">
        <div className='sidebar__users'>
          <Scrollbars
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHide
          >
            <p className="menu-label is-size-6 has-text-light">USERS</p>
            <ul className="menu-list">
              {renderUsers()}
            </ul>
          </Scrollbars>
        </div>
        <UserInfoPanel/>
      </aside>
    </div>
  )

  const isTablet = () => window.innerWidth <= 700;

  return (
    isTablet() ? <Drawer>{sidebar}</Drawer> : sidebar
  );
};

export default Sidebar;
