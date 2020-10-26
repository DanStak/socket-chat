import React from 'react';
import PageContainer from "../../common/PageContainer";
import Sidebar from "./Sidebar";
import MessagesArea from "./MessagesArea";
import SocketProvider from "../../../containers/socket/provider";
import ConversationProvider from "../../../containers/conversation/provider";


const ConversationPage = () => (
  <SocketProvider>
    <ConversationProvider>
      <PageContainer className='conversation-page'>
        <Sidebar/>
        <MessagesArea/>
      </PageContainer>
    </ConversationProvider>
  </SocketProvider>
);

export default ConversationPage;
