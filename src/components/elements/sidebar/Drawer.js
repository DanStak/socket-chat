import React, {useContext, useState} from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import ConversationContext from "../../../containers/conversation/context";


const Drawer = (props) => {
  const { isDrawerOpen, toggleDrawer } = useContext(ConversationContext)
  return (
    <SwipeableDrawer
      open={isDrawerOpen}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
    >
      {props.children}
    </SwipeableDrawer>
  );
};

export default Drawer;
