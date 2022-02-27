import React from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StylesOne } from '../Styles/StylesOne';
import { chatStyles } from '../Styles/ChatStyles';
import { FormTextBoxSegment } from './segments/FormTextBoxSegment';
import { FormTextBoxContainer } from './Controllers/FormTextBoxContainer';
import { MP } from '../Styles/MP';
import { St } from '../Styles/StylesTwo';
import { images } from '../assets/images';
import {PlainMessage} from "../Types/Models";
import {MessageEntity} from "../BLL/entity/MessageEntity";

type IProps = {
  onMessageSend(text: string): void;
  onEmojiPress(): void;
  onBurgerPress(): void;
  chatWith: string;
  avatarURL: string;
  onBackBtn(): void;
  messages: MessageEntity[]
};

const ChatComponent = (state: IProps) => {


    const renderList = ({item, index}: {item: MessageEntity, index: number}) => {
            return (
                <View style={{backgroundColor: 'black', marginVertical: 10}}>
                    <View>
                        <Text>From: {item.sender}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 22}}>Message: {item.plain_message}</Text>
                    </View>
                    <View>
                        <Text>To: {item.companion}</Text>
                    </View>
                    <View>
                        <Text>In {new Date(item.created_at).toString()}</Text>
                    </View>
                </View>
            )
    }


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
      <FlatList data={state.messages} renderItem={renderList} style={[chatStyles.chatContainer]} />
      <FormTextBoxSegment onMessageSend={state.onMessageSend} onEmojiButtonPress={state.onEmojiPress} />
    </View>
  );
};

export default ChatComponent;
