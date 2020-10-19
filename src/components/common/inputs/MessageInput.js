import React, { useState } from 'react';
import connect from '../../../containers/conversation/connect';
import withInputControl from "../../../hooks/withInputControl";

const MessageInput = ({ conversation: { socket }, value, onSetValue}) => {
  const [isMessageSending, setIsMessageSending] = useState(false);

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    socket.emit('send-message', value, (error) => {
      if(error) {
        console.log(error, 'ERROR')
      }
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

export default withInputControl(connect(MessageInput));
