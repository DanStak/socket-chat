import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import SingleMessage from "./SingleMessage";
import MessageInput from "../../common/inputs/MessageInput";
import connectConversation from '../../../containers/conversation/connect'
import ConversationBar from "./ConversationBar";
import {getFromLocalStorage} from "../../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../../configs/local-storage-items";


const MessagesArea = ({ conversation: { actualInterlocutors, messages } }) => {

  const user = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER)

  if(actualInterlocutors.length === 0) {
    return null
  }

  return (
    <div className='message-area'>
      <ConversationBar/>
      <ScrollToBottom
        className='message-area__scroll-list'
      >
        <ul className='message-area__messages-list'>
          {messages.map((message, index) => (
            <SingleMessage
              key={index}
              message={message}
              myId={user._id}
            />
          ))}
        </ul>
      </ScrollToBottom>
      <MessageInput/>
    </div>
  );
};

export default connectConversation(MessagesArea);
