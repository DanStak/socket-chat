import React, {Fragment} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import RegularMessage from "../../common/messages/RegularMessage";
import MessageInput from "../../common/inputs/MessageInput";
import connectConversation from '../../../containers/conversation/connect'
import ConversationBar from "./ConversationBar";
import {getFromLocalStorage} from "../../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../../configs/local-storage-items";
import WelcomeMessage from "../../elements/WelcomeMessage";
import Factory from "../../common/messages/Factory";


const MessagesArea = ({ conversation: { actualInterlocutors, messages } }) => {

  const user = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER)

  return (
    <div className='message-area'>
      <ConversationBar/>
        {actualInterlocutors.length !== 0 ? (
          <Fragment>
            <ScrollToBottom
              className='message-area__scroll-list'
            >
              <ul className='message-area__messages-list'>
                {messages.map(message => Factory.create(message))}
              </ul>
            </ScrollToBottom>
            <MessageInput/>
          </Fragment>
        ) : <WelcomeMessage/>}
    </div>
  );
};

export default connectConversation(MessagesArea);
