import { SocketData } from './Socket';
import { modulesImpl } from '../redux/actions/modules';
import { MessageEntity } from './entity/MessageEntity';
import {MessageStatus} from "../Types/enums";

class SocketHandlers {
  private readonly _dispatch: Function;
  constructor(dispatch: Function) {
    this._dispatch = dispatch;
  }

  public getMessage = async (socketData: SocketData) => {
    console.log(socketData, 'socketData');
    if (socketData.data === void 0 || socketData.data === null) {
        return;
    }
    const newMessage = new MessageEntity({
      companion: socketData.data.companion,
      created_at: socketData.data.created_at,
      plain_message: socketData.data.plain_message,
      sender: socketData.data.sender,
      status: socketData.data.status,
      type: socketData.data.type,
      message_hash: socketData.data.message_hash
    });
    this._dispatch(modulesImpl.addMessageToStack(newMessage))
  };

  public serverGotMessage = async (socketData: SocketData) => {
    setTimeout(() => {
      this._dispatch(modulesImpl.setStatus(MessageStatus.SentToServer, socketData.message.message_hash))
    }, 2000)
  }


}

export { SocketHandlers };
