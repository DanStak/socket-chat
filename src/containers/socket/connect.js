import React from 'react';
import SocketContext from "./context";

const connect = Component => props => (
  <SocketContext.Consumer>
    {context => <Component {...props} socket={context}/>}
  </SocketContext.Consumer>
);

export default connect;
