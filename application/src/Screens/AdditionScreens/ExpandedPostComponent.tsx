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
import { HomeButtonView } from '../segments/HomeButtonView';

type IProps = {
  onBackBtn?(): void;
  _renderItem: ({item, index}: any) => JSX.Element
  createList(): null[];
  postData: Post;
  ownerAvatar: string;
  postState: number
  onPostOwnerPress(): void;
} & BaseProps;


const CarouselHeight: number = DEVICE_HEIGHT / 1.2;
const CarouselWidth: number = DEVICE_WIDTH / 1.08;

const ExpandedPostComponent = (state: IProps) => {
    console.log('width:' , CarouselWidth, 'height:', CarouselHeight)
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
            <View style={{height: mockupHeightToDP(30), width: '100%', paddingHorizontal: mockupWidthToDP(20), marginBottom: mockupHeightToDP(15), marginTop: mockupHeightToDP(20)}}>
                <TouchableOpacity onPress={state.onPostOwnerPress} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={[{width: mockupHeightToDP(30), height: mockupHeightToDP(30), borderRadius: 100}]} source={state.postState === 999 ? images.standardAvatar : {uri: state.ownerAvatar}} />
                <Text style={[St.ownerTextWithoutOffsets, MP.ml10]}>{state.postData.owner}</Text>
                </TouchableOpacity>
                </View>
            <View style={St.horizontalLine} />
            <View style={{height: CarouselHeight, flexDirection: 'row', justifyContent: 'center', marginLeft: mockupWidthToDP(5)}}>
        <Carousel
            data={state.createList()}
            renderItem={state._renderItem}
            sliderWidth={mockupWidthToDP(CarouselWidth)}
            sliderHeight={mockupHeightToDP(CarouselHeight)}
            itemWidth={mockupWidthToDP(CarouselWidth)}
            itemHeight={mockupHeightToDP(CarouselHeight)}
            maximumZoomScale={0}
            activeAnimationType="spring"
        />
            </View>
            <View style={[StylesOne.flex_row, MP.mt10, MP.mb20, MP.ph6]}>
            <HomeButtonView entity={state.entity} onLikePress={state.onLikePress} />
          <TouchableOpacity onPress={state.onCommendPress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.commend} />
            <Text style={{ color: 'black' }}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={state.onRepostPress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.repost} />
          </TouchableOpacity>
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
