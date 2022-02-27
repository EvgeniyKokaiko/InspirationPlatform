import React, {useCallback, useEffect, useState} from 'react';
import ChatComponent from '../ChatComponent';
import { BaseProps } from '../../Types/Types';
import {actionImpl, apiURL} from '../../redux/actions';
import { Socket, SocketEvents } from '../../BLL/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from "../../Parts/utils";
import {INavigation} from "../Core/OverrideNavigation";
import {onBlur, onFocus} from "../Core/MainNavigationScreen";
import {useDispatch, useSelector} from "react-redux";
import {PlainMessage} from "../../Types/Models";
import {MessageEntity} from "../../BLL/entity/MessageEntity";
import {modulesImpl} from "../../redux/actions/modules";
import {currentUser} from "../../BLL/CurrentUserProps";
import {useFocusEffect} from "@react-navigation/native";

type IProps = {} & BaseProps;
type IState = {
  messages: MessageEntity[]
  // socket: Socket;
};


enum MessageType {
  PlainMessage   = 0,
  ImageMessage   = 1,
  FileMessage    = 3,
  SystemMessage  = 4,
}
const U2UChatContainer = (props: IProps) => {
  const dispatch = useDispatch();
  const {userId, socketHash} = props.route.params;
  const [getState, setState] = useState<IState>({
    messages: [],
  });
  const store: any = useSelector((store: any) => store)
  const avatarURL: string = `http://${apiURL}/storage/${userId}/avatar/avatar.png`;
  console.log(userId, socketHash, props.route.params);
  let socket: Socket | null = null;

  const onMessageSend = useCallback(async (text: string) => {
    const socketData = {
      plain_message: text,
      companion: userId,
      date: new Date().getTime(),
      messageType: MessageType.PlainMessage,
      salt: Math.random()
    }
    await (socket as Socket).emitByEvent(SocketEvents.sendMessage, socketData);
  }, [socket])



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
    onBackBtn,
    messages: getState.messages,
  };

  onFocus(async () => {
    console.log('focused')
    socket = new Socket(socketHash, currentUser.token, dispatch)
    dispatch(actionImpl.getMessages(userId))
    dispatch(modulesImpl.getToken())
  })


  async function closeSocket() {
   await socket?.closeSocket();
  }

  onBlur(() => {
    closeSocket()
  })


  useEffect(() => {
    console.log(store)
    if (store.getMessagesReducer.statusCode !== 200) {
      return
    } else {
      setState({...getState, messages: store.getMessagesReducer.data})
      console.log(getState.messages, "MESSAGES")
    }
  }, [store.getMessagesReducer])


  return <ChatComponent {...STATE} />;
};

export default U2UChatContainer;
