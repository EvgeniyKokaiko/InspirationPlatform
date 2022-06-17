import React, { useCallback, useEffect, useState } from 'react';
import { BaseProps } from '../Types/Types';
import { View, Text, TouchableOpacity, Image, Linking, ScrollView, RefreshControl, FlatList } from 'react-native';
import { goBack, noGoBack, onFocus, StackScreens } from './Core/MainNavigationScreen';
import { StylesOne } from '../Styles/StylesOne';
import { MP } from '../Styles/MP';
import { images } from '../assets/images';
import { St } from '../Styles/StylesTwo';
import { backgrounds } from '../Styles/Backgrounds';
import Avatar from './segments/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../redux/reducers/reducers';
import { actionImpl, apiURL } from '../redux/actions';
import { Post, User } from '../Types/Models';
import MyPost from './segments/MyPost';
import FullScreenPreloader from './segments/FullScreenPreloader';
import { INavigation } from "./Core/OverrideNavigation";
import {DEVICE_HEIGHT, mockupHeightToDP} from '../Parts/utils';
import { HomePostEntity } from '../BLL/entity/HomePostEntity';
import { ActionTypes } from '../redux/types/ActionTypes';

type IProps = BaseProps & {};

type IState = {
  user: any;
  refresh: boolean;
  avatar: 1;
  posts: Post[];
  reload: number;
  counts: {
    owner_count: number,
    subscriber_count: number
  }
};

const MyProfileComponent: React.FC<IProps> = (props: IProps) => {
  const isMe = true;
  const [getState, setState] = useState({
    user: {},
    refresh: false,
    avatar: -1,
    posts: [],
    reload: 0,
    counts: {
      owner_count: 0,
      subscriber_count: 0
    }
  })
  const dispatch = useDispatch();
  const state: any = useSelector<Reducers>((state) => state);
  noGoBack();


  const onLikePress = useCallback((postHash: string, owner: string) => {
    dispatch(actionImpl.likePost(postHash, owner, ActionTypes.LikeMyPosts))
  }, []);

  const setReload = (value: number) => {
    setState({ ...getState, reload: value });
  }

  onFocus(() => {
    dispatch(actionImpl.getMe());
    dispatch(actionImpl.getMyPosts());
    setState({ ...getState, refresh: false });
  }, [])


  useEffect(() => {
    setState({ ...getState, user: {}, posts: [], counts: { owner_count: 0, subscriber_count: 0 } })
    dispatch(actionImpl.getMe());
    dispatch(actionImpl.getMyPosts());
  }, [getState.reload])

  const makeRequest = useCallback(() => {
    dispatch(actionImpl.getMe());
    dispatch(actionImpl.getMyPosts());
  }, []);

  const onCommendPress = (post_hash: string) => {
    const data = {
      post_hash: post_hash,
    }
    INavigation.navigate(StackScreens.Comments, data);
  };

  useEffect(() => {
    setState({ ...getState, user: state.meReducer.data?.userData, posts: state.mePostsReducer?.data, counts: state.meReducer.data?.counts })
  }, [state.meReducer, state.mePostsReducer]);

  const renderPosts = () => {
   const result = [];
   if (!getState.posts) {
     return [];
   }
   for (let i = getState.posts.length; i >= 0; i--) {
     const item = getState.posts[i];
     if (!item) {
       continue;
     }
     result.push(
         <React.Fragment key={i}>
            <MyPost
                makeRequest={makeRequest}
                onRepostPress={() => {}}
                onCommendPress={onCommendPress}
                onLikePress={onLikePress}
                entity={item}
                setReload={setReload}
                isMe={isMe}
                index={i} />
         </React.Fragment>);
   }
   return result;
  };
//

  async function onPersonalSitePress() {
    await Linking.openURL((getState.user as unknown as User).personal_site);
  }

  function onSettingsPress() {
    INavigation.navigate(StackScreens.Settings, { isPrivate: (getState.user! as any).is_private });
  }

  //0 - мои подписки
  //1 - мои подписчики
  function onFollowingPress() {
    INavigation.navigate(StackScreens.Following, { userId: (getState.user! as any).username, listType: 1 })
  }

  function onFollowersPress() {
    INavigation.navigate(StackScreens.Following, { userId: (getState.user! as any).username, listType: 0 })
  }


  return getState.user && getState.posts ? (
  <View style={{height: DEVICE_HEIGHT}}>
    <ScrollView nestedScrollEnabled style={[StylesOne.screenContainer, MP.ph25]} refreshControl={<RefreshControl refreshing={getState.refresh} onRefresh={makeRequest} />}>
      <View style={[StylesOne.w100]}>
        <View style={[StylesOne.flex_column, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
          <Image source={images.logo} style={[StylesOne.image40, { tintColor: 'black' }]} />
          <Text style={St.ownerTextWithoutOffsets}>{(getState.user! as any).username}</Text>
        </View>
      </View>
      <View style={[MP.mt20, StylesOne.w100, St.borderRadius30, backgrounds.myProfileBlocks, MP.pv20, MP.ph20]}>
        <View style={[StylesOne.flex_row]}>
          <View style={[MP.mb20]}>
            <Avatar icon={getState.avatar === 999 ? images.standardAvatar : { uri: `http://${apiURL}/storage/${(getState.user! as any).username}/avatar/avatar.png?asd=${Date.now()}` }} size={60} />
          </View>
          <View style={[StylesOne.flex_row, StylesOne.flex_ai_c, { height: mockupHeightToDP(75) }]}>
            <TouchableOpacity onPress={onFollowingPress} style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
              <Text style={St.myAccButtonsHeader}>{getState.counts.subscriber_count}</Text>
              <Text style={St.myAccButtonsDescr}>Following</Text>
            </TouchableOpacity>
            <View style={[St.verticalLine]} />
            <TouchableOpacity onPress={onFollowersPress} style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
              <Text style={St.myAccButtonsHeader}>{getState.counts.owner_count}</Text>
              <Text style={St.myAccButtonsDescr}>Followers</Text>
            </TouchableOpacity>
            <View style={[St.verticalLine]} />
            <View style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
              <Text style={St.myAccButtonsHeader}>{getState.posts.length}</Text>
              <Text style={St.myAccButtonsDescr}>Posts</Text>
            </View>
          </View>
        </View>
        <View style={[StylesOne.flex_row]}>
          <View style={[St.w240]}>
            <View>
              <Text numberOfLines={1} style={St.myAccName}>
                {(getState.user as User).full_name}
              </Text>
            </View>
            <View>
              <Text numberOfLines={1} style={St.myAccDescr}>
                {(getState.user as User).description}
              </Text>
            </View>
          </View>
          <View style={[StylesOne.flex_row]}>
            <TouchableOpacity onPress={onPersonalSitePress}>
              <Image style={St.imgIcon} source={images.personalSite} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSettingsPress}>
              <Image style={St.imgIcon} source={images.settings} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*<View>*/}
      {/*    <TouchableOpacity>*/}
      {/*        <Image source={} />*/}
      {/*    </TouchableOpacity>*/}
      {/*    <TouchableOpacity>*/}
      {/*    </TouchableOpacity>*/}
      {/*</View>*/}
      <View style={[St.postListStyles]}>
        {renderPosts()}
      </View>
    </ScrollView>
  </View>
  ) : (
    <ScrollView
      contentContainerStyle={[StylesOne.screenContainer, MP.ph25]}
      refreshControl={<RefreshControl refreshing={getState.refresh} onRefresh={makeRequest} />}
    >

      <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20, St.zIndex999]}>
        <View />
        <Image source={images.logo} style={[StylesOne.image40, { tintColor: 'black' }]} />
        <View style={[StylesOne.image24]}></View>
      </View>
      <FullScreenPreloader />
    </ScrollView>
  );
};

//
// <TouchableOpacity
//     onPress={() => {
//       /*goBack(props.navigation)*/
//     }}
//     style={StylesOne.image24}
// >
//   <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
// </TouchableOpacity>

export default MyProfileComponent;
