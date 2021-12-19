import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StylesOne } from '../../Styles/StylesOne';
import { MP } from '../../Styles/MP';
import { St } from '../../Styles/StylesTwo';
import { images } from '../../assets/images';
import { StackScreens } from '../Core/MainNavigationScreen';
import { BaseProps } from '../../Types/Types';
import Carousel from "react-native-snap-carousel";
import {DEVICE_HEIGHT, DEVICE_WIDTH, mockupHeightToDP, mockupWidthToDP} from "../../Parts/utils";
import {Post} from "../../Types/Models";
import {SThree} from "../../Styles/StylesThree";

type IProps = {
  onBackBtn?(): void;
  _renderItem: ({item, index}: any) => JSX.Element
  createList(): number[];
  postData: Post;
  ownerAvatar: string;
} & BaseProps;


const CarouselHeight: number = DEVICE_HEIGHT - 300;
const CarouselWidth: number = DEVICE_WIDTH;

const ExpandedPostComponent = (state: IProps) => {
    return (
    <View style={[StylesOne.screenContainer, MP.ph25]}>
      <View style={[StylesOne.w100]}>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
          <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
            <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
          </TouchableOpacity>
          <Text style={StylesOne.CheckBox_text}>Post Details</Text>
          <View></View>
        </View>
      </View>
        <ScrollView style={St.PhotoList} contentContainerStyle={St.PhotoListhund}>
            <View style={{}}>
                <Image source={{uri: state.ownerAvatar}} />
            </View>
            <View style={{height: CarouselHeight + 100 }}>
        <Carousel
            data={state.createList()}
            renderItem={state._renderItem}
            sliderWidth={mockupWidthToDP(CarouselWidth) - 30}
            sliderHeight={mockupHeightToDP(CarouselHeight)}
            itemWidth={mockupWidthToDP(CarouselWidth) - 50}
            itemHeight={mockupHeightToDP(CarouselHeight)}
            activeAnimationType="spring"
        />
            </View>
            <View style={[]}>
                <Text style={SThree.post_caption_word}>Caption:</Text>
                <Text style={[SThree.post_caption_expanded]}>{state.postData.caption}</Text>
            </View>
        </ScrollView>
    </View>
  );
};

export default ExpandedPostComponent;
