import React from 'react';
import connect from "../../../containers/conversation/connect";

const ConversationPage = ({ conversation }) => {

  console.log(conversation)
  return (
    <div>
      CONVERSATION
    </div>
  );
};

export default connect(ConversationPage);
