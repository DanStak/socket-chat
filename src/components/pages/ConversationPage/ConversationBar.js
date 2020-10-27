import React, {useContext} from 'react';
import UserContext from "../../../containers/users/context";
import ConversationContext from "../../../containers/conversation/context";

const ConversationBar = () => {

  const { users } = useContext(UserContext);
  const { actualInterlocutors } = useContext(ConversationContext);

  const user = users.find(user => user._id === actualInterlocutors);


  return (
    <div className='conversation-bar'>
      <p className='has-text-light'>{user.name}</p>
    </div>
  );
};

export default ConversationBar;
