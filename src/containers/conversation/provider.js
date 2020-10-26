import React, {useState} from 'react';
import ConversationContext from "./context";
import { withRouter } from "react-router-dom";


const ConversationProvider = (props) => {
  const [actualInterlocutors, setActualInterlocutors] = useState('');

  const getContext = () => ({
    actualInterlocutors,
    setActualInterlocutors,
  })


    return (
      <ConversationContext.Provider value={getContext()}>
        {props.children}
      </ConversationContext.Provider>
    );
}

export default withRouter(ConversationProvider);

