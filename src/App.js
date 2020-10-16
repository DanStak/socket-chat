import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateOrJoinPage from "./components/pages/LoginPage/CreateOrJoinPage";
import ConversationPage from "./components/pages/ConversationPage/ConversationPage";
import ConversationProvider from "./containers/conversation/provider";


const App = () => (
    <Router>
      <ConversationProvider>
        <Route path='/' exact component={CreateOrJoinPage}/>
        <Route path='/conversation' component={ConversationPage}/>
      </ConversationProvider>
    </Router>
);

export default App;
