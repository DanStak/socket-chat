import React from 'react';
import ConversationContext from "./context";

const connect = Component => props => (
  <ConversationContext.Consumer>
    {(context) => <Component {...props} conversation={context}/>}
  </ConversationContext.Consumer>
);

export default connect;
