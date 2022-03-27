import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../../assets/images';
import { MP } from '../../../Styles/MP';
import { StylesOne } from '../../../Styles/StylesOne';
import { St } from '../../../Styles/StylesTwo';
import { INavigation } from '../../Core/OverrideNavigation';

type IProps = {
  headerTitle: string;
};

function HeaderSegment(props: IProps) {
  const onBackPressHandler = () => {
    INavigation.goBack();
  };

  return (
    <View style={[StylesOne.w100, MP.ph15]}>
      <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
        <View style={[StylesOne.w15]}>
          <TouchableOpacity onPress={onBackPressHandler} style={StylesOne.image24}>
            <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
          </TouchableOpacity>
        </View>
        <View style={[StylesOne.w70, StylesOne.flex_row, StylesOne.flex_jc_c]}>
          <Text style={StylesOne.CheckBox_text}>{props.headerTitle}</Text>
        </View>
        <View style={[StylesOne.w15]}></View>
      </View>
      <View style={[StylesOne.horizontalLine]} />
    </View>
  );
}


export {HeaderSegment}
