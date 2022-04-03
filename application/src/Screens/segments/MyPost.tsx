import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { St } from '../../Styles/StylesTwo';
import { safeAreaInsetsTop, StylesOne } from '../../Styles/StylesOne';
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
import { SingleCarouselComponent } from './Carousel/SingleCarouselComponent';
import { ImageStyles } from '../../Styles/Images';
import { StylesFour } from '../../Styles/StylesFour';
import { LabelView } from './LabelView';
import { ActionTypes } from '../../redux/types/ActionTypes';
import axios from 'axios';
import { currentUser } from '../../BLL/CurrentUserProps';

type myPostProps = {
  index: number;
  isMe: boolean;
  onCommendPress(): void;
  onRepostPress(): void;
  reload?: number;
  setReload?(value: number): void;
  onLikePress?(post_hash: string, owner: string): void;
  entity: HomePostEntity
};

type IState = {
  showModal: boolean;
  index: number;
  longPressed: boolean;
  carouselData: {
    data_count: number;
    owner: string;
    post_hash: string;
  };
  labelText: string;
  refreshOrUpdate: number;
};

const MyPost = (props: myPostProps) => {
  const dispatch = useDispatch();
  const dataPath = `http://${apiURL}/storage/${props.entity.owner}/posts/${props.entity.image.length > 0 && props.entity.data_count > 0 ? props.entity.image : props.entity.video}/`;
  const [getState, setState] = useState<IState>({
    showModal: false,
    index: -1,
    longPressed: false,
    carouselData: {
      data_count: props.entity.data_count,
      owner: props.entity.owner,
      post_hash: props.entity.image,
    },
    labelText: `1 of ${props.entity.data_count}`,
    refreshOrUpdate: 0,
  });
  const state: any = useSelector<any>((state) => state.postDelete);

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
  }, [props]);

  const showModal = () => {
    setState({ ...getState, showModal: true, index: props.index });
  };

  const hideModal = () => {
    setState({ ...getState, showModal: false, index: -1 });
  };

  const getLikes = async () => {
    const response = await axios.get(`http://${apiURL}/likes/getLikes/${props.entity.image}`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
    if (response.data.statusCode === 200) {
      const data: {isLiked: boolean; likesData: {likesCount: number; post_hash: string}} = response.data.data;
      props.entity.likesCount = data.likesData.likesCount;
      props.entity.post_hash = data.isLiked ?  data.likesData.post_hash : null;
      setState({...getState, refreshOrUpdate: getState.refreshOrUpdate + 1});
    }
   }

  useEffect(() => {
   getLikes();
   console.log(props.entity.likesCount, getState)
  }, [props.entity])


  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    let selected = Math.round(contentOffset / viewSize);
    setState({ ...getState, labelText: `${selected + 1} of ${props.entity.data_count}` });
  };

  const onAlertDeletePost = useCallback(() => {
    dispatch(actionImpl.deletePost(props.entity.image, props.entity.owner));
    props.setReload!(2);
  }, [props.entity.image, props.entity.owner]);


  useEffect(() => {
    if (state?.statusCode !== void 0) {
      if (state?.statusCode === 200 && getState.index === props.index) {
        setState({ ...getState, showModal: false, index: -1 });
        Alert.alert('Accepted', 'Post was delete successfully');
        dispatch(actionImpl.getMe());
      }
      if (state.statusCode === 423 && getState.index === props.index) {
        Alert.alert('Error!', 'Something went wrong');
      }
      if (state.statusCode === 0 && getState.index === props.index) {
        return;
      }
    }
  }, [state]);

  return (
    <View key={props.index} style={[St.postListItem, St.zIndex2]}>
      <TouchableOpacity onPress={showModal} key={props.index} style={St.image100}>
        <Image style={[StylesOne.wh100, St.borderImage]} source={{ uri: `${dataPath}0.png` }} />
      </TouchableOpacity>
      <Modal transparent={true} visible={getState.showModal} animationType={'fade'} style={[]}>
        <ScrollView style={[styles.modalView, { paddingTop: safeAreaInsetsTop }]}>
          <View style={[StylesOne.w100, StylesOne.flex_row, StylesOne.flex_ai_c, MP.pv15]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={hideModal}
              style={[StylesOne.minWidth15, StylesOne.h100, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_fs, MP.pl15]}
            >
              <View>
                <Image style={[ImageStyles.imageDoubleAvatar, ImageStyles.tintColorWhite]} source={images.arrowLeft} />
              </View>
            </TouchableOpacity>
            <View style={[StylesOne.width70, StylesOne.flex_row, StylesOne.flex_jc_c]}>
              <LabelView
                styles={{
                  text: [StylesFour.headerCarouselText],
                  container: [StylesOne.h100],
                }}
                defaultText={getState.labelText}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPostDelete}
              style={[StylesOne.minWidth15, StylesOne.h100, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_fs, MP.pl15]}
            >
              <View>
                <Image style={[ImageStyles.imageDoubleAvatar, ImageStyles.tintColorWhite]} source={images.burger} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[StylesOne.flex1, StylesOne.flexCenter]}>
            <SingleCarouselComponent reload={props.reload} onMomentumScrollEnd={onMomentumScrollEnd} carouselData={getState.carouselData} />
          </View>
          <View style={[StylesOne.flex_row, MP.mt10, MP.mb20]}>
            <HomeButtonView refreshOrUpdate={getState.refreshOrUpdate} textColor={'white'} entity={props.entity} onLikePress={props.onLikePress!} />
            <TouchableOpacity
              onPress={props.onCommendPress}
              style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}
            >
              <Image style={[StylesOne.wh100, StylesOne.rm_c]} source={images.commend} />
              <Text style={{ color: 'white' }}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onRepostPress}
              style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}
            >
              <Image style={[StylesOne.wh100, StylesOne.rm_c]} source={images.repost} />
            </TouchableOpacity>
          </View>
          <View style={[StylesOne.flex_row, StylesOne.flex_jc_fs, StylesOne.w100, MP.ph15]}>
            <Text selectable style={[SThree.post_caption, { color: 'white' }]}>{props.entity.caption}</Text>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MyPost;
