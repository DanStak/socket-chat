import Regular from '../models/Messages/Regular'
import RegularMessage from "../components/common/messages/RegularMessage";

export const CHAT_MESSAGES_TYPES = {
  TEXT: 'text',
}

export default {
  [CHAT_MESSAGES_TYPES.TEXT]: {
    model: Regular,
    component: RegularMessage
  }
}
