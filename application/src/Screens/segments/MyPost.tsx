import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, TouchableOpacity, View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { St } from '../../Styles/StylesTwo';
import { StylesOne } from '../../Styles/StylesOne';
import { Post } from '../../Types/Models';
import { actionImpl, apiURL } from '../../redux/actions';
import { images } from '../../assets/images';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { DEVICE_WIDTH, mockupHeightToDP, mockupWidthToDP } from '../../Parts/utils';
import { useDispatch, useSelector } from 'react-redux';
import { SThree } from '../../Styles/StylesThree';
import { MP } from '../../Styles/MP';
import { HomeButtonView } from './HomeButtonView';
import { HomePostEntity } from '../../BLL/entity/HomePostEntity';

type myPostProps = {
  index: number;
  isMe: boolean;
  onCommendPress():void;
  onLikePress(postHash: string, owner: string): void
  onRepostPress(): void;
} & Post;

const MyPost = (props: myPostProps) => {
  const dispatch = useDispatch();
  const dataPath = `http://${apiURL}/storage/${props.owner}/posts/${props.image.length > 0 && props.data_count > 0 ? props.image : props.video}/`;
  const [modal, showModal]: [boolean, Function] = useState(false);
  const [index, setIndex] = useState(-1);
  const [longPressed, setLongPressed] = useState(false);
  const state: any = useSelector<any>((state) => state.postDelete);
  const createList = () => {
    const result = [];
    for (let i = 0; i < props.data_count; i++) {
      result.push(i);
    }
    return result;
  };
  const _renderItem = useCallback(({ item, index }) => {
    return <Image key={1} style={[St.image100modal]} source={{ uri: `${dataPath}${item}.png?ab=${props.image}` }} />;
  }, []);

  const entity = {
      likesCount: 54,
  }

  const onPostDelete = useCallback(() => {
    Alert.alert('Warning', 'This move irreversibly', [
      {
        text: 'Delete',
        onPress: onAlertDeletePost,
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  }, []);

  const onAlertDeletePost = useCallback(() => {
    dispatch(actionImpl.deletePost(props.image, props.owner));
  }, []);

  useEffect(() => {
    if (state?.statusCode !== void 0) {
      if (state?.statusCode === 200 && index === props.index) {
        showModal(false);
        Alert.alert('Accepted', 'Post was delete successfully');
      }
      if (state.statusCode === 423 && index === props.index) {
        Alert.alert('Error!', 'Something went wrong');
      }
      if (state.statusCode === 0 && index === props.index) {
        return;
      }
    }
  }, [state.statusCode]);

  const CarouselWidth = (DEVICE_WIDTH / 80) * 100;
  return (
    <View key={props.id} style={[St.postListItem, St.zIndex2]}>
      <TouchableOpacity
        onPress={() => {
          showModal(true);
          setIndex(props.index);
        }}
        key={props.id}
        style={St.image100}
      >
        <Image style={[StylesOne.wh100, St.borderImage]} source={{ uri: `${dataPath}0.png` }} />
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={modal}>
        <View style={St.modalWidth}>
          <View style={[St.centeredView, St.zIndex999]}>
            <View style={St.modalView}>
              <TouchableOpacity
                onPress={() => {
                  showModal(false);
                  setIndex(-1);
                }}
                style={[St.deletePost, props.isMe ? {} : { right: mockupWidthToDP(10) }]}
              >
                <Image source={images.shrink} style={St.image100} />
              </TouchableOpacity>
              {props.isMe && (
                <TouchableOpacity onPress={onPostDelete} style={[St.exitButton]}>
                  <Image source={images.burger} style={St.image100} />
                </TouchableOpacity>
              )}
              <Text style={St.ownerText}>
                <Image style={St.image15} source={images.userImg} /> {props.owner}
              </Text>
              <ScrollView style={[St.PhotoList]}>
                  <View style={{height: mockupHeightToDP(500), width: '100%'}}>
                <Carousel
                  data={createList()}
                  renderItem={_renderItem}
                  sliderWidth={mockupHeightToDP(320)}
                  itemWidth={mockupHeightToDP(320)}
                  activeAnimationType="spring"
                />
                </View>
                <View>
                <View style={[StylesOne.flex_row, MP.mt10, MP.mb20]}>
                  <HomeButtonView entity={entity as HomePostEntity} onLikePress={props.onLikePress} />
                  <TouchableOpacity
                    onPress={props.onCommendPress}
                    style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}
                  >
                    <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.commend} />
                    <Text style={{ color: 'black' }}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={props.onRepostPress}
                    style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}
                  >
                    <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.repost} />
                  </TouchableOpacity>
                </View>
                <Text style={[SThree.post_caption]}>{props.caption}</Text>
                </View>
              </ScrollView>
              {/*<Pagination*/}
              {/*    dotsLength={a.length}*/}
              {/*    activeDotIndex={1}*/}
              {/*    containerStyle={{ backgroundColor: "transparent" }}*/}
              {/*    dotStyle={{*/}
              {/*        width: 10,*/}
              {/*        height: 5,*/}
              {/*        borderRadius: 5,*/}
              {/*        marginHorizontal: 8,*/}
              {/*        backgroundColor: 'rgba(0, 0, 0, 0.4)'*/}
              {/*    }}*/}
              {/*    inactiveDotStyle={{*/}
              {/*        // Define styles for inactive dots here*/}
              {/*    }}*/}
              {/*    inactiveDotOpacity={0.4}*/}
              {/*    inactiveDotScale={0.6}*/}
              {/*/>*/}
              <ScrollView style={[]}>
    
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyPost;
