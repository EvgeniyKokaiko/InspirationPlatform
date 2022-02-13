import React, { useEffect, useState } from 'react';
import ChatComponent from '../ChatComponent';
import { BaseProps } from '../../Types/Types';
import { apiURL } from '../../redux/actions';
import { Socket, SocketEvents } from '../../BLL/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from "../../Parts/utils";
import {INavigation} from "../Core/OverrideNavigation";
import {onBlur, onFocus} from "../Core/MainNavigationScreen";

type IProps = {} & BaseProps;
type IState = {
  socketImpl: null | Socket;
};

const U2UChatContainer = (props: IProps) => {
  const [getState, setState] = useState<IState>({
    socketImpl: null,
  });
  const {userId, socketHash} = props.route.params;
  const avatarURL: string = `http://${apiURL}/storage/${userId}/avatar/avatar.png`;
  console.log(userId, socketHash, props.route.params);
  const onMessageSend = async () => {
    await getState.socketImpl!.emitByEvent(SocketEvents.connect, 'abibas');
    await getState.socketImpl!.emitByEvent(SocketEvents.sendMessage, 'Idi nahuy chort');
  };
  const onEmojiPress = () => {};
  const onBurgerPress = () => {};
  const onBackBtn = () => {
    INavigation.goBack();
  }

  const STATE = {
    onMessageSend,
    onEmojiPress,
    onBurgerPress,
    chatWith: userId,
    avatarURL,
    onBackBtn
  };

  onFocus(() => {
    if (getState.socketImpl === void 0 || getState.socketImpl === null) {
      getToken((el: string) => {
        setState({ ...getState, socketImpl: new Socket(socketHash, el) });
      }).then();
    }
  })

  onBlur(() => {
    getState.socketImpl?.closeSocket();
    setState({...getState, socketImpl: null})
  })

  return <ChatComponent {...STATE} />;
};

export default U2UChatContainer;
