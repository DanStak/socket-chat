import Message from './Message'
import { CHAT_MESSAGES_TYPES } from '../../schemas/messages-schemas';

class Regular extends Message {

  constructor(message) {
    super(message);
    this.text = message.body;
  }

  raw() {
    return {
      ...super.raw(),
      text: this.text,
      type: CHAT_MESSAGES_TYPES.TEXT
    }
  }
}

export default Regular;
