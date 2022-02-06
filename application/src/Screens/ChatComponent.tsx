import React from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity, Image} from 'react-native';
import { StylesOne } from '../Styles/StylesOne';
import { chatStyles } from '../Styles/ChatStyles';
import { FormTextBoxSegment } from './segments/FormTextBoxSegment';
import { FormTextBoxContainer } from './Controllers/FormTextBoxContainer';
import {MP} from "../Styles/MP";
import {St} from "../Styles/StylesTwo";
import {images} from "../assets/images";

type IProps = {
    onMessageSend(): void;
    onEmojiPress(): void;
    onBurgerPress(): void;
    chatWith: string;
    avatarURL: string;
};

const ChatComponent = (state: IProps) => {
  return (
    <View style={[StylesOne.wh100]}>
      <View style={[chatStyles.chatHeader, StylesOne.flex_row, StylesOne.flex_jc_sb, MP.ph15, StylesOne.flex_ai_c]}>
          <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c]}>
              <View style={[St.round100image35]}>
              <Image style={[StylesOne.wh100, StylesOne.rounded]} source={{uri: state.avatarURL}} />
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
      <FlatList style={[chatStyles.chatContainer]} />
      <FormTextBoxSegment onMessageSend={state.onMessageSend} onEmojiButtonPress={state.onEmojiPress}  />
    </View>
  );
};

export default ChatComponent;
