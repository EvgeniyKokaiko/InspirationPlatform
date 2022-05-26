import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatComponent from '../ChatComponent';
import { BaseProps } from '../../Types/Types';
import { actionImpl, apiURL } from '../../redux/actions';
import { Socket, SocketEvents } from '../../BLL/Socket';
import { INavigation } from '../Core/OverrideNavigation';
import { onBlur, onFocus } from '../Core/MainNavigationScreen';
import { useDispatch, useSelector } from 'react-redux';
import { MessageEntity } from '../../BLL/entity/MessageEntity';
import { modulesImpl } from '../../redux/actions/modules';
import { currentUser } from '../../BLL/CurrentUserProps';
import { FlatList, Keyboard, LayoutAnimation, NativeScrollEvent, NativeSyntheticEvent, ToastAndroid } from 'react-native';
import { Utilities } from "../../BLL/Utilities";
import { useUpdate } from '../../BLL/hooks';
import { MessageStorage } from '../../BLL/MessageStorage';
import { PlainMessage } from '../../Types/Models';
import { MessageOptionsModal, MessageOptionsModalForward } from '../segments/MessageViews/MessageOptionsModal';
import { MessagesPreloader } from '../segments/MessageViews/MessagesPreloader';
type IProps = {} & BaseProps;
type IState = {};

enum MessageType {
  PlainMessage = 0,
  ImageMessage = 1,
  FileMessage = 3,
  SystemMessage = 4,
}
const U2UChatContainer = (props: IProps) => {
  const dispatch = useDispatch();
  let { userId, socketHash } = props.route.params;
  const flatListRef = useRef<FlatList>(null);
  const store: any = useSelector<any>((store: any) => store.getMessagesReducer);
  const storage = store.data;
  const avatarURL: string = `http://${apiURL}/storage/${userId}/avatar/avatar.png`;
  let socket: Socket | null = null;
  let messageOptionsModel: any = React.createRef<MessageOptionsModalForward>();
  let messagePreloader: any = React.createRef<typeof MessagesPreloader>();
  let isLoading = false;
  const onMessageSend = useCallback(
    async (text: string) => {
      const mHash = Utilities.stingToBase64({ text: Math.random(), companion: userId, date: Date.now() });
      const socketData = {
        plain_message: text,
        companion: userId,
        date: Date.now(),
        messageType: MessageType.PlainMessage,
        message_hash: mHash,
      };

      const plainMessage: PlainMessage = {
        companion: userId,
        created_at: Date.now(),
        plain_message: text,
        sender: currentUser.currentUserId as string,
        status: 1,
        message_hash: mHash,
        type: 0,
      }

      dispatch(modulesImpl.addMessageToStack(plainMessage));
      flatListRef.current!.scrollToEnd({
        animated: true,
      });
      await (socket as Socket).emitByEvent(SocketEvents.sendMessage, socketData);
    },
    [socket, userId]
  );

  const onDeleteMessagePress = (message: MessageEntity) => {
    ToastAndroid.show("onDeleteMessagePress", 2000);
  }

  const onUpdateMessagePress = (message: MessageEntity) => {
    ToastAndroid.show("onUpdateMessagePress", 2000);
  }

  const scrollToEnd = useCallback(() => {
    if (flatListRef !== null) {
      setTimeout(() => {
        flatListRef.current!.scrollToEnd({
          animated: true,
        })
      }, 1000)
    }
  }, [flatListRef])

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const nev = event.nativeEvent;
    if (nev.contentOffset.y <= 150) {
      if (store.pageIndex <= 0) {
        return;
      }
      const totalPages = store.pageIndex - 1;
      dispatch(actionImpl.getMessages(userId, totalPages, false));
      showPreloader();
    }
  }

  function showOptionsModal(message: MessageEntity, coords: { x: number; y: number }) {
    if (messageOptionsModel !== null) {
      messageOptionsModel.current.show(message, coords);
    }
  }

  function hideOptionsModal() {
    messageOptionsModel.current.hide();
  }

  function showPreloader() {
    messagePreloader.current.show();
  }

  function hidePreloader() {
    messagePreloader.current.hide();
  }

  const onEmojiPress = () => { };
  const onBurgerPress = () => { };
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
    messages: storage,
    flatListRef: flatListRef as React.MutableRefObject<FlatList>,
    scrollToEnd: scrollToEnd,
    onScroll,
    messageOptionsModel,
    showOptionsModal,
    onDeleteMessagePress,
    onUpdateMessagePress,
    messagePreloader
  };

  onFocus(async () => {
    dispatch(actionImpl.getMessages(userId, 0, true));
    socket = new Socket(socketHash, currentUser.token, dispatch, userId);
    if (socket !== null) {
    }
  }, [socketHash, userId]);

  async function closeSocket() {
    await socket?.closeSocket();
  }

  onBlur(() => {
    dispatch(modulesImpl.clearAllMessages());
    closeSocket();
  });

  useEffect(() => {
  }, [messageOptionsModel])

  useEffect(() => {
    // Keyboard.addListener('keyboardDidChangeFrame', () => {
    //   if (flatListRef !== null && flatListRef.current !== null) {
    //     flatListRef.current!.scrollToEnd({
    //       animated: true,
    //     });
    //   }
    // });
  }, [flatListRef]);

  useEffect(() => {
    hidePreloader();
  }, [store])


  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.create(250, 'linear', 'opacity'));
  }, [store.isModify]);

  return <ChatComponent {...STATE} />;
};

export default U2UChatContainer;
