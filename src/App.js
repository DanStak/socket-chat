import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from "./components/pages/LoginPage/LoginPage";
import ConversationPage from "./components/pages/ConversationPage/ConversationPage";
import ConversationProvider from "./containers/conversation/provider";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import SocketProvider from "./containers/socket/provider";


const App = () => (
    <Router>
        <Route path='/' exact component={LoginPage}/>
        <Route path='/register' exact component={RegisterPage}/>
        <Route path='/conversation' component={ConversationPage}/>
    </Router>
);

export default App;
