import { modulesImpl } from '../redux/actions/modules';
import { SocketHandlers } from './SocketHandlers';

export enum SocketEvents {
  sendMessage = 'SendMessage',
  connect = 'Connect',
  close = 'Close',
  addedMessage = "AddedMessage"
}

export type SocketData = {
  event: string;
  data: any;
  message?: any;
}


class Socket {
  private readonly _cHash: string;
  private _socket: WebSocket;
  private _makeDispatch: Function;
  private readonly serverURL: string = 'ws://192.168.1.90:8080/messaging';
  private readonly _handlers: SocketHandlers;
  constructor(cHash: string, token: string | null, dispatch: Function) {
    console.log('new');
    this._handlers = new SocketHandlers(dispatch);
    this._cHash = cHash;
    this._makeDispatch = dispatch;
    this._socket = new WebSocket(`${this.serverURL}/valhalla/${cHash}?token=${token}`);
    this._socket.onopen = () => {
      this.emitByEvent(SocketEvents.connect, '');
      console.log('Socket opened successfully!');
    };
    this._socket.onclose = () => {
      this.emitByEvent(SocketEvents.close, 0);
    };
    this._socket.onerror = (e) => {
      console.log('socket onError ex', e.message);
      // this._connectAndOpenSocket()
    };
    this._socket.onmessage = this.handleByEvent;
  }

  public closeSocket = async () => {
    console.log('close socket');
    await this._socket.close(1000, 'Socket Closed By User');
  };

  get handlers(): SocketHandlers {
    return this._handlers;
  }

  public emitByEvent = async (eventName: SocketEvents, data: any) => {
    const socketBody: { event: string; data: any } = {
      event: eventName || 'default',
      data: data,
    };
    console.log(socketBody);
    const bodyStr = JSON.stringify(socketBody);
    if (this._socket.readyState === 1) {
      this._socket.send(bodyStr);
      console.log('sended');
    } else {
      // await this._connectAndOpenSocket()
    }
  };

  private _connectAndOpenSocket = async () => {
    this._socket = new WebSocket(`${this.serverURL}/${this._cHash}`);
  };

  private handleByEvent = async (evt: WebSocketMessageEvent) => {
    try {
      const socketData: SocketData = JSON.parse(evt.data);
      console.log(socketData);
      switch (socketData.event) {
        case SocketEvents.sendMessage:
         await this.handlers.getMessage(socketData)
          break;
        case SocketEvents.addedMessage:
         await this.handlers.serverGotMessage(socketData)
              break;
        default:
          console.log('messs');
          console.log('default event');
          break;
      }
    } catch (e) {
      console.warn('SocketError!', e);
    }
  };
}

export { Socket };
