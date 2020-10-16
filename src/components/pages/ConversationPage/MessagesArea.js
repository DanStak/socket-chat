import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import SingleMessage from "./SingleMessage";
import connect from "../../../containers/conversation/connect";

const MessagesArea = ({ messages, conversation: { name } }) => {
  return (
    <ScrollToBottom
      className='message-area'
    >
      <ul>
        {messages.map((message, index) => (
          <SingleMessage key={index} message={message} userName={name}/>
        ))}
      </ul>
    </ScrollToBottom>

  );
};

export default connect(MessagesArea);
