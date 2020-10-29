import React from 'react';
import PageContainer from "../../common/PageContainer";
import Sidebar from "../../elements/sidebar/Sidebar";
import MessagesArea from "./MessagesArea";
import SocketProvider from "../../../containers/socket/provider";
import ConversationProvider from "../../../containers/conversation/provider";
import UserProvider from "../../../containers/users/provider";
import {getFromLocalStorage} from "../../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../../configs/local-storage-items";
import { Redirect } from "react-router-dom";

const ConversationPage = (props) => {
  const user = getFromLocalStorage(LOCAL_STORAGE_ITEMS.USER);
  if(!user) {
    return (
      <Redirect to='/'/>
    )
  }

  return (
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
  )
}

export default ConversationPage;
