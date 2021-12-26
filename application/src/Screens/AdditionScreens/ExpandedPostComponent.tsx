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


const CarouselHeight: number = DEVICE_HEIGHT;
const CarouselWidth: number = DEVICE_WIDTH;

const ExpandedPostComponent = (state: IProps) => {
    return (
    <View style={[StylesOne.screenContainer]}>
      <View style={[StylesOne.w100, MP.ph25]}>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
          <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
            <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
          </TouchableOpacity>
          <Text style={StylesOne.CheckBox_text}>Post Details</Text>
          <View></View>
        </View>
      </View>
        <ScrollView style={St.PhotoList} contentContainerStyle={St.PhotoListhund}>
            <View style={{height: mockupHeightToDP(30), width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: mockupWidthToDP(20), marginBottom: mockupHeightToDP(15), marginTop: mockupHeightToDP(20)}}>
                <Image style={[{width: mockupHeightToDP(30), height: mockupHeightToDP(30), borderRadius: 100}]} source={{uri: state.ownerAvatar}} />
                <Text style={[St.ownerTextWithoutOffsets, MP.ml10]}>{state.postData.owner}</Text>
            </View>
            <View style={St.horizontalLine} />
            <View style={{height: CarouselHeight, flexDirection: 'row', justifyContent: 'center', marginLeft: mockupWidthToDP(5)}}>
        <Carousel
            data={state.createList()}
            renderItem={state._renderItem}
            sliderWidth={mockupWidthToDP(CarouselWidth)}
            sliderHeight={mockupHeightToDP(CarouselHeight)}
            itemWidth={mockupWidthToDP(CarouselWidth) - 30}
            itemHeight={mockupHeightToDP(CarouselHeight)}
            maximumZoomScale={0}
            activeAnimationType="spring"
        />
            </View>
            <View style={[MP.ph15]}>
                <Text style={SThree.post_caption_word}>Caption:</Text>
                <Text style={[SThree.post_caption_expanded]}>{state.postData.caption}</Text>
            </View>
        </ScrollView>
    </View>
  );
};

export default ExpandedPostComponent;
