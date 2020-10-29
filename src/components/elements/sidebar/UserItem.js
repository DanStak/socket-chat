import React, {useContext} from 'react';
import ClassNames from "classnames";
import ConversationContext from "../../../containers/conversation/context";

const UserItem = ({ user }) => {

  const { actualInterlocutors, startOrJoinToConversation, unreadMessagesInterlocutorsIds } = useContext(ConversationContext);

  const checkIsUnread = (id) => unreadMessagesInterlocutorsIds.includes(id);

  const checkIsActualInterlocutor = (id) => actualInterlocutors === id;

  const classes = ClassNames({
    'sidebar-conversation-item': true,
    'has-text-weight-bold': checkIsUnread(user._id),
    'sidebar-conversation-item--active': checkIsActualInterlocutor(user._id),
  });

  return (
    <li>
      <a
        className={classes}
        onClick={() => startOrJoinToConversation(user)}
      >
        {user.name}
      </a>
    </li>
  );
};

export default UserItem;
