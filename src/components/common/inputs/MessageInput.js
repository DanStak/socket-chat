import React, { useState } from 'react';
import withInputControl from "../../../hooks/withInputControl";
import connect from "../../../containers/socket/connect";
import connectConversation from '../../../containers/conversation/connect'
import {getFromLocalStorage} from "../../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../../configs/local-storage-items";


const MessageInput = ({ socket: { socket }, value, onSetValue, conversation: { actualInterlocutors }}) => {
  const [isMessageSending, setIsMessageSending] = useState(false);

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    const user = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER);
    const message = {
      text: value,
      interlocutors: [actualInterlocutors, user._id],
      from: user._id,
    }
    socket.emit('send-message', message, () => {
      console.log('wiadomość wysłana')
      onSetValue('');
      setIsMessageSending(true);
    });
  }

  return (
    <div className='message-input '>
      <input
        className='input'
        type="text"
        name='message'
        placeholder='Type a message'
        value={value}
        onChange={(event) => onSetValue(event.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>

  );
};

export default connect(connectConversation(withInputControl(MessageInput)));
