import React, {useContext} from 'react';
import UserContext from "../../../containers/users/context";
import ConversationContext from "../../../containers/conversation/context";
import MenuIcon from '@material-ui/icons/Menu';

const ConversationBar = () => {

  const { users } = useContext(UserContext);
  const { actualInterlocutors, toggleDrawer } = useContext(ConversationContext);

  const user = users.find(user => user._id === actualInterlocutors);


  return (
    <div className='conversation-bar'>
      { window.innerWidth <= 700 && <MenuIcon onClick={toggleDrawer} className='mr-2'/> }
      <p className='has-text-light'>{user ? user.name : 'Choose user'}</p>
    </div>
  );
};

export default ConversationBar;
