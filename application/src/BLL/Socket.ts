export enum SocketEvents {
  sendMessage = 'SendMessage',
  connect = 'Connect',
  close = "Close",
}

class Socket {
  private readonly _cHash: string;
  private _socket: WebSocket;
  private readonly serverURL: string = 'ws://192.168.1.90:8080/messaging';
  constructor(cHash: string, token: string) {
    this._cHash = cHash;
    this._socket = new WebSocket(`${this.serverURL}/${token}/${cHash}`);
    this._socket.onopen = () => {
      this.emitByEvent(SocketEvents.connect, "abibas")
      this.emitByEvent(SocketEvents.sendMessage, "Idi nahuy chort")
      console.log('Socket opened successfully!')
    }
    this._socket.onclose = () => {
      this.emitByEvent(SocketEvents.close, 0)
    }
    this._socket.onerror = (e) => {
      console.log('socket onError ex', e.message);
      this._connectAndOpenSocket()
    }
    this._socket.onmessage = this.handleByEvent
  }


  public emitByEvent = async (eventName: SocketEvents, data: any) => {
      const socketBody: {event: string, data: any} = {
        event: eventName,
        data: JSON.stringify(data),
      }
      const bodyStr = JSON.stringify(socketBody);
      if (this._socket.readyState === 1) {
        this._socket.send(bodyStr);
        console.log('sended')
      } else {
       await this._connectAndOpenSocket()
      }
  }

  private _connectAndOpenSocket = async () => {
    this._socket = new WebSocket(`${this.serverURL}/${this._cHash}`)
  }

  private handleByEvent = async (evt: WebSocketMessageEvent) => {
    try {
      const socketData = JSON.parse(evt.data)
      console.log(socketData);
      switch (socketData.event) {
        case SocketEvents.sendMessage:
          console.log('sended');
          break;
        default:
          console.log('default event');
      }
    } catch (e) {
      console.warn('SocketError!', e)
    }
  };
}

export { Socket };
