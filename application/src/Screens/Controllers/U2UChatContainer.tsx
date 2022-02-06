import React, { useEffect, useState } from 'react';
import ChatComponent from '../ChatComponent';
import { BaseProps } from '../../Types/Types';
import { apiURL } from '../../redux/actions';
import { Socket, SocketEvents } from '../../BLL/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

type IProps = {} & BaseProps;
type IState = {
  socketImpl: null | Socket;
};

const U2UChatContainer = (props: IProps) => {
  const [getState, setState] = useState<IState>({
    socketImpl: null,
  });
  const chatWith = props.route.params.userId;
  const avatarURL: string = `http://${apiURL}/storage/${chatWith}/avatar/avatar.png`;
  console.log(chatWith);
  const onMessageSend = async () => {
    await getState.socketImpl!.emitByEvent(SocketEvents.connect, 'abibas');
    await getState.socketImpl!.emitByEvent(SocketEvents.sendMessage, 'Idi nahuy chort');
  };
  const onEmojiPress = () => {};
  const onBurgerPress = () => {};
  const getToken = async (callback: Function) => {
    await AsyncStorage.getItem('Access_TOKEN').then((el: string | null) => {
      try {
        callback(el);
      } catch (ex) {
        console.log('_useToken ex', ex);
      }
    });
  };
  const STATE = {
    onMessageSend,
    onEmojiPress,
    onBurgerPress,
    chatWith,
    avatarURL,
  };

  useEffect(() => {
    if (getState.socketImpl === void 0 || getState.socketImpl === null) {
      getToken((el: string) => {
        setState({ ...getState, socketImpl: new Socket(chatWith, el) });
      });
    }
  }, []);

  return <ChatComponent {...STATE} />;
};

export default U2UChatContainer;
