import React, {useCallback, useEffect, useRef, useState} from 'react';
import ChatComponent from '../ChatComponent';
import {BaseProps} from '../../Types/Types';
import {actionImpl, apiURL} from '../../redux/actions';
import {Socket, SocketEvents} from '../../BLL/Socket';
import {INavigation} from '../Core/OverrideNavigation';
import {onBlur, onFocus} from '../Core/MainNavigationScreen';
import {useDispatch, useSelector} from 'react-redux';
import {MessageEntity} from '../../BLL/entity/MessageEntity';
import {modulesImpl} from '../../redux/actions/modules';
import {currentUser} from '../../BLL/CurrentUserProps';
import {FlatList, Keyboard, LayoutAnimation, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {Utilities} from "../../BLL/Utilities";
import { useUpdate } from '../../BLL/hooks';
type IProps = {} & BaseProps;
type IState = {
  messages: MessageEntity[];
  // socket: Socket;
};

enum MessageType {
  PlainMessage = 0,
  ImageMessage = 1,
  FileMessage = 3,
  SystemMessage = 4,
}
const U2UChatContainer = (props: IProps) => {
  const dispatch = useDispatch();
  let { userId, socketHash } = props.route.params;
  const [getState, setState] = useState<IState>({
    messages: [],
  });
  const flatListRef = useRef<FlatList>(null);
  const store: any = useSelector((store: any) => store);
  const avatarURL: string = `http://${apiURL}/storage/${userId}/avatar/avatar.png`;
  console.log(userId, socketHash, props.route.params);
  let socket: Socket | null = null;

  const onMessageSend = useCallback(
    async (text: string) => {
      const mHash = Utilities.stingToBase64({text: Math.random(), companion: userId, date: Date.now()});
      const socketData = {
        plain_message: text,
        companion: userId,
        date: Date.now(),
        messageType: MessageType.PlainMessage,
        message_hash: mHash,
      };

      const newMessage = new MessageEntity({
        companion: userId,
        created_at: Date.now(),
        plain_message: text,
        sender: currentUser.currentUserId as string,
        status: 1,
        message_hash: mHash,
        type: 0,
      });

      dispatch(modulesImpl.addMessageToStack(newMessage));
      flatListRef.current!.scrollToEnd({
        animated: true,
      });
      console.log(socket,'SOCKET CDJIFGRWIJOGWRJIOPG');
      await (socket as Socket).emitByEvent(SocketEvents.sendMessage, socketData);
    },
    [socket, userId]
  );

  function scrollToEnd() {
    if (flatListRef !== null) {
      flatListRef.current!.scrollToEnd({
        animated: true,
      });
    }
  }

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const nev = event.nativeEvent;
  }

  const onEmojiPress = () => {};
  const onBurgerPress = () => {};
  const onBackBtn = () => {
    INavigation.goBack();
  };

  const STATE = {
    onMessageSend,
    onEmojiPress,
    onBurgerPress,
    chatWith: props.route.params.userId,
    avatarURL,
    onBackBtn,
    messages: getState.messages,
    flatListRef: flatListRef as React.MutableRefObject<FlatList>,
    scrollToEnd: scrollToEnd,
    onScroll
  };

  onFocus(async () => {
    dispatch(actionImpl.getMessages(userId));
    socket = new Socket(socketHash, currentUser.token, dispatch, userId);
    if (socket !== null) {
      console.log('read')
    }
    console.log(socket, 'SOCKET SADAS')
  }, [socketHash, userId]);

  async function closeSocket() {
    await socket?.closeSocket();
  }

  onBlur(() => {
    setState({ ...getState, messages: [] });
    dispatch(modulesImpl.clearAllMessages());
    closeSocket();
  });

  useEffect(() => {
    Keyboard.addListener('keyboardDidChangeFrame', () => {
      if (flatListRef !== null) {
        flatListRef.current!.scrollToEnd({
          animated: true,
        });
      }
    });
  }, [flatListRef]);




  useEffect(() => {
    console.log('updates flatlist')
    console.log(store);
    if (store.getMessagesReducer.statusCode !== 200) {
      return;
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.create(250, 'linear', 'opacity'));
      console.log(store.getMessagesReducer, 'messages');
      setState({ ...getState, messages: store.getMessagesReducer.data });
    }
  }, [store.getMessagesReducer.isModify]);

  return <ChatComponent {...STATE} />;
};

export default U2UChatContainer;
