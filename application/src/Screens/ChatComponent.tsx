import React from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
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

type IProps = {
  onMessageSend(text: string): void;
  onEmojiPress(): void;
  onBurgerPress(): void;
  chatWith: string;
  avatarURL: string;
  onBackBtn(): void;
  messages: MessageEntity[];
  flatListRef: React.MutableRefObject<FlatList>;
  scrollToEnd(): void;
};

const ChatComponent = (state: IProps) => {
  const renderList = ({ item, index }: { item: MessageEntity; index: number }) => {
    if (state.messages.length >= index) {
      state.scrollToEnd();
    }
    return <PlainMessageView messageEntityProps={item} />;
  };
  console.log(state.chatWith, 'CHATWITH');
  return (
    <View style={[StylesOne.wh100]}>
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
        <FlatList
          fadingEdgeLength={0}
          extraData={state.chatWith}
          decelerationRate={'fast'}
          ref={state.flatListRef}
          data={state.messages}
          renderItem={renderList}
          style={[chatStyles.chatContainer]}
          onContentSizeChange={state.scrollToEnd}
          onLayout={state.scrollToEnd}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        />
        <FormTextBoxSegment onMessageSend={state.onMessageSend} onEmojiButtonPress={state.onEmojiPress} />
    </View>
  );
};

export default ChatComponent;
