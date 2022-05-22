import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StylesOne } from '../../Styles/StylesOne';
import { MP } from '../../Styles/MP';
import { St } from '../../Styles/StylesTwo';
import { images } from '../../assets/images';
import { StackScreens } from '../Core/MainNavigationScreen';
import { BaseProps } from '../../Types/Types';
import Carousel from 'react-native-snap-carousel';
import { DEVICE_HEIGHT, DEVICE_WIDTH, mockupHeightToDP, mockupWidthToDP } from '../../Parts/utils';
import { Post } from '../../Types/Models';
import { SThree } from '../../Styles/StylesThree';
import { LikeButton } from '../segments/LikeButton';
import { HomePostEntity } from '../../BLL/entity/HomePostEntity';
import { apiURL } from '../../redux/actions';
import { SingleCarouselComponent } from '../segments/Carousel/SingleCarouselComponent';

type IProps = {
  onBackBtn?(): void;
  ownerAvatar: string;
  onPostOwnerPress(): void;
  entity: HomePostEntity;
  dataPath: string;
  onLikePress(): void;
  onCommendPress(): void;
  onRepostPress(): void;
  carouselData: {
    data_count: number;
    owner: string;
    post_hash: string;
  }

} & BaseProps;


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
        <View
          style={{
            height: mockupHeightToDP(30),
            width: '100%',
            paddingHorizontal: mockupWidthToDP(20),
            marginBottom: mockupHeightToDP(15),
            marginTop: mockupHeightToDP(20),
            flex: 1,
          }}
        >
          <TouchableOpacity onPress={state.onPostOwnerPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={[{ width: mockupHeightToDP(30), height: mockupHeightToDP(30), borderRadius: 100 }]} source={{ uri: state.ownerAvatar }} />
            <Text style={[St.ownerTextWithoutOffsets, MP.ml10]}>{state.entity.owner}</Text>
          </TouchableOpacity>
        </View>
        <View style={St.horizontalLine} />
        {/* <View style={[MP.ph15, {height: mockupHeightToDP(500), backgroundColor: 'red'}]}>
              {renderFirstImage()}
            </View> */}
        <SingleCarouselComponent carouselData={state.carouselData} />
        <View style={[StylesOne.flex_row, MP.mt10, MP.mb20, MP.ph6]}>
          <LikeButton owner={state.entity.owner} textColor={'black'} postHash={state.entity.image as string} />
          <TouchableOpacity
            onPress={state.onCommendPress}
            style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}
          >
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.commend} />
            <Text style={{ color: 'black' }}>{/**  counter here */}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={state.onRepostPress}
            style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}
          >
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.repost} />
          </TouchableOpacity>
        </View>
        <View style={[MP.ph15]}>
          <Text style={SThree.post_caption_word}>Caption:</Text>
          <Text selectable style={[SThree.post_caption_expanded]}>{state.entity.caption}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExpandedPostComponent;
