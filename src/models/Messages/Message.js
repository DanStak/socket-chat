import { getFromLocalStorage } from "../../utils/localStorage";
import LOCAL_STORAGE_ITEMS from "../../configs/local-storage-items";


class Message {
  constructor(data) {
    this.message = data;
    this.sendAt = new Date().getTime();
  }

  static getInterlocutorsInfo (data) {
    const conversation = getFromLocalStorage(LOCAL_STORAGE_ITEMS.CONVERSATION_STATE);
    data.sender = conversation.sender;
    data.interlocutors = [ conversation.actualInterlocutors, data.sender.id ];

    return data;
  }

  raw() {
    const messageWithConversationState = Message.getInterlocutorsInfo(this.message)
    return {
      interlocutors: messageWithConversationState.interlocutors,
      sender: messageWithConversationState.sender,
      sendAt: this.sendAt,
    }
  }
}

export default Message
