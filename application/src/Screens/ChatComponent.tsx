import React from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image, ImageBackground, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator, RefreshControl } from 'react-native';
import { StylesOne } from '../Styles/StylesOne';
import { chatStyles } from '../Styles/ChatStyles';
import { FormTextBoxSegment } from './segments/FormTextBoxSegment';
import { FormTextBoxContainer } from './Controllers/FormTextBoxContainer';
import { MP } from '../Styles/MP';
import { St } from '../Styles/StylesTwo';
import { images, messageStatuses } from '../assets/images';
import { PlainMessage } from '../Types/Models';
import { MessageEntity } from '../BLL/entity/MessageEntity';
import { KeyboardAvoidingComponent } from './Core/KeyboardAvoidingComponent';
import PlainMessageView from './segments/MessageViews/PlainMessageView';
import { HomePostEntity } from '../BLL/entity/HomePostEntity';
import { MessageStorage } from '../BLL/MessageStorage';
import { colors } from '../Parts/colors';
import { MessageOptionsModal } from './segments/MessageViews/MessageOptionsModal';
import { MessagesPreloader } from './segments/MessageViews/MessagesPreloader';

type IProps = {
  onMessageSend(text: string): void;
  onEmojiPress(): void;
  onBurgerPress(): void;
  chatWith: string;
  avatarURL: string;
  onBackBtn(): void;
  messages: MessageStorage;
  flatListRef: React.MutableRefObject<FlatList>;
  scrollToEnd(): void;
  onScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  messageOptionsModel: React.RefObject<typeof MessageOptionsModal>
  messagePreloader: React.RefObject<typeof MessagesPreloader>
  showOptionsModal(m: MessageEntity, coords: {x: number; y: number}): void;
  onDeleteMessagePress(message: MessageEntity): void;
  onUpdateMessagePress(message: MessageEntity): void;
};

const ChatComponent = (state: IProps) => {
  const renderList = ({ item, index }: { item: MessageEntity; index: number }) => {
    if (state.messages.models.length >= index && state.messages.initial) {
      state.scrollToEnd();
    }
    return <PlainMessageView onMessagePress={state.showOptionsModal} messageEntityProps={item} />;
  };
  return (
    <View style={[StylesOne.wh100]}>
      <MessageOptionsModal onDeleteMessagePress={state.onDeleteMessagePress} onUpdateMessagePress={state.onUpdateMessagePress} ref={state.messageOptionsModel} />
      <View style={[chatStyles.chatHeader, StylesOne.flex_row, StylesOne.flex_jc_sb, MP.ph15, StylesOne.flex_ai_c]}>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c]}>
          <TouchableOpacity onPress={state.onBackBtn} style={[StylesOne.image24, MP.mr15]}>
            <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
          </TouchableOpacity>
          <View style={[St.round100image35]}>
            <Image style={[StylesOne.wh100, StylesOne.rounded]} source={{ uri: state.avatarURL }} />
          </View>
          <View style={MP.ml10}>
            <Text style={St.ownerText_second}>{state.chatWith}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={state.onBurgerPress} style={[StylesOne.flex_row, StylesOne.flex_ai_c]}>
            <Image style={St.image20} source={images.burgerBtn} />
          </TouchableOpacity>
        </View>
      </View>
      <MessagesPreloader ref={state.messagePreloader} />
        {state.messages !== void 0 ? <FlatList
          fadingEdgeLength={0}
          extraData={state.chatWith}
          decelerationRate={'fast'}
          ref={state.flatListRef}
          onScrollEndDrag={state.onScroll}
          data={state.messages.models}
          renderItem={renderList}
          style={[chatStyles.chatContainer]}
          onLayout={state.scrollToEnd}
          maxToRenderPerBatch={30}
          updateCellsBatchingPeriod={100}
          removeClippedSubviews={true}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        /> : (
          <View style={[StylesOne.wh100, StylesOne.flexCenter]}>
            <ActivityIndicator color={colors.PrimaryBlue} size={'large'} />
          </View>
        )}
        <FormTextBoxSegment onMessageSend={state.onMessageSend} onEmojiButtonPress={state.onEmojiPress} />
    </View>
  );
};

export default ChatComponent;
