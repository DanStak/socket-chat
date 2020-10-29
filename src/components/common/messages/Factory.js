import React from 'react'
import CHAT_MESSAGES_TYPES from '../../../schemas/messages-schemas'
import has from 'lodash.has';

class Factory {

  static create(message) {
    let Component = null
    if(!has(CHAT_MESSAGES_TYPES, message.type)) {
      console.log(`There is no chat message schema for message type: \' ${message.type}`);
    } else {
      Component = CHAT_MESSAGES_TYPES[message.type].component
    }

    return <Component message={message} key={message._id}/>
  }
}

export default Factory;
