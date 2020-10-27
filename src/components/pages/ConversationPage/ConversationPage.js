import React from 'react';
import PageContainer from "../../common/PageContainer";
import Sidebar from "./Sidebar";
import MessagesArea from "./MessagesArea";
import SocketProvider from "../../../containers/socket/provider";
import ConversationProvider from "../../../containers/conversation/provider";
import UserProvider from "../../../containers/users/provider";


const ConversationPage = () => (
  <SocketProvider>
    <UserProvider>
      <ConversationProvider>
        <PageContainer className='conversation-page'>
          <Sidebar/>
          <MessagesArea/>
        </PageContainer>
      </ConversationProvider>
    </UserProvider>
  </SocketProvider>
);

export default ConversationPage;
