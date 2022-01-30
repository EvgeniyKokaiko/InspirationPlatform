import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { StylesOne } from '../../Styles/StylesOne';
import { MP } from '../../Styles/MP';
import { colors } from '../../Parts/colors';
import { SThree } from '../../Styles/StylesThree';
import { images } from '../../assets/images';
import { BaseProps } from '../../Types/Types';
import {StylesFour} from "../../Styles/StylesFour";
import {mockupWidthToDP} from "../../Parts/utils";

type IProps = {
  icon?: ImageSourcePropType;
  title: string;
  counter?: number;
  route?: string;
  onPress?(): void;
  isDisabled?: boolean;
  secondTitle?: string;
} & BaseProps;

const SelectSegment = (props: IProps) => {
  const onItemPress = () => {
    props.onPress && props.onPress();
  };

  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      onPress={props.route ? onItemPress : props.onPress}
      style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mt20, StylesOne.w100]}
    >
      <View style={[StylesOne.flex_row, StylesOne.flex_ai_c]}>
        <Text style={StylesFour.select_title}>{props.title}</Text>
      </View>
      <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c]}>
        <Text numberOfLines={1} style={[StylesFour.select_secTitle, {maxWidth: mockupWidthToDP(200)}]}>
          {props.secondTitle ? props.secondTitle : ''}
        </Text>
        <Image style={[StylesOne.image24, { tintColor: colors.Dark }, MP.ml20]} source={images.arrowRight} />
      </View>
    </TouchableOpacity>
  );
};

export default SelectSegment;
