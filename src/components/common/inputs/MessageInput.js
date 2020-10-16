import React, { useState } from 'react';
import connect from '../../../containers/conversation/connect';

const MessageInput = ({ conversation: { socket }}) => {
  const [message, setMessage] = useState('');
  const [isMessageSending, setIsMessageSending] = useState(false);

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    console.log(message)
    socket.emit('send-message', message, (error) => {
      if(error) {
        console.log(error, 'ERROR')
      }
      setMessage('');
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
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>

  );
};

export default connect(MessageInput);
