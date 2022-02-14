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
type IState = {};


enum MessageType {
  PlainMessage   = 0,
  ImageMessage   = 1,
  FileMessage    = 3,
  SystemMessage  = 4,
}
const U2UChatContainer = (props: IProps) => {
  const [getState, setState] = useState<IState>({

  });
  const {userId, socketHash} = props.route.params;
  let socket: null | Socket = null;
  const avatarURL: string = `http://${apiURL}/storage/${userId}/avatar/avatar.png`;
  console.log(userId, socketHash, props.route.params);
  const onMessageSend = async (text: string) => {
    const socketData = {
      plain_message: text,
      to: userId,
      date: new Date().getTime(),
      messageType: MessageType.PlainMessage,
      salt: Math.random()
    }
    await socket!.emitByEvent(SocketEvents.sendMessage, socketData);
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

  onFocus(async () => {
    if (socket === void 0 || socket === null) {
      getToken((el: string) => {
       socket = new Socket(socketHash, el)
      }).then();
    }
  })

  onBlur(() => {
    console.log('blur')
    console.log(socket)
    socket!.closeSocket();
    socket = null;
  })

  return <ChatComponent {...STATE} />;
};

export default U2UChatContainer;
