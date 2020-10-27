import React from 'react';
import withInputControl from "../../../hooks/withInputControl";
import connectSocket from "../../../containers/socket/connect";
import connectConversation from '../../../containers/conversation/connect'


const MessageInput = ({ value, onSetValue, conversation: { sendMessage }}) => {

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      sendMessage(value, () => onSetValue(''))
    }
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

export default connectSocket(connectConversation(withInputControl(MessageInput)));
