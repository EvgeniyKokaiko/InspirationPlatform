import React, { useCallback, useEffect, useState } from 'react';
import { BaseProps } from '../Types/Types';
import { View, Text, TouchableOpacity, Image, Linking, ScrollView, RefreshControl, FlatList } from 'react-native';
import { goBack, noGoBack, StackScreens } from './Core/MainNavigationScreen';
import { StylesOne } from '../Styles/StylesOne';
import { MP } from '../Styles/MP';
import { images } from '../assets/images';
import { St } from '../Styles/StylesTwo';
import { backgrounds } from '../Styles/Backgrounds';
import Avatar from './segments/Avatar';
import { mockupHeightToDP } from '../Parts/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../redux/reducers/reducers';
import { getMe, getMyPosts } from '../redux/actions';
import { User } from '../Types/Models';
import MyPost from './segments/MyPost';
import FullScreenPreloader from './segments/FullScreenPreloader';

type IProps = BaseProps & {};

const UserProfileComponent: React.FC<IProps> = (props: IProps) => {
  const [user, setUser]: [User | null, Function] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const state: any = useSelector<Reducers>((state) => state);
  noGoBack();

  useEffect(() => {
    dispatch(getMe());
    dispatch(getMyPosts());
    setRefresh(false);
  }, []);

  const makeRequest = useCallback(() => {
    dispatch(getMe());
    dispatch(getMyPosts());
  }, []);

  useEffect(() => {
    setUser(state.meReducer.data);
    setAvatar(state.meReducer.avatar);
    setPosts(state.mePostsReducer.data);
  }, [state]);

  const renderPosts = () => {
    return posts.map((el, index) => {
      return <MyPost {...el} key={index} />;
    });
  };

  async function onPersonalSitePress() {
    await Linking.openURL((user as unknown as User).personal_site);
  }

  function onSettingsPress() {
    props.navigation.navigate(StackScreens.Settings);
  }

  return user && avatar && posts ? (
    <ScrollView style={[StylesOne.screenContainer, MP.ph25]} refreshControl={<RefreshControl refreshing={refresh} onRefresh={makeRequest} />}>
      <View style={[StylesOne.w100]}>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
          <View />
          <Image source={images.logo} style={[StylesOne.image40, { tintColor: 'black' }]} />
          <View />
        </View>
      </View>
      <View style={[MP.mt20, StylesOne.w100, St.h190, St.borderRadius30, backgrounds.myProfileBlocks, MP.pv20, MP.ph20]}>
        <View style={[StylesOne.flex_row]}>
          <View style={[MP.mb20]}>
            <Avatar icon={avatar} size={60} />
          </View>
          <View style={[StylesOne.flex_row, StylesOne.flex_ai_c, { height: mockupHeightToDP(75) }]}>
            <TouchableOpacity style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
              <Text style={St.myAccButtonsHeader}>0</Text>
              <Text style={St.myAccButtonsDescr}>Followers</Text>
            </TouchableOpacity>
            <View style={[St.verticalLine]} />
            <TouchableOpacity style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
              <Text style={St.myAccButtonsHeader}>0</Text>
              <Text style={St.myAccButtonsDescr}>Following</Text>
            </TouchableOpacity>
            <View style={[St.verticalLine]} />
            <View style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
              <Text style={St.myAccButtonsHeader}>{posts.length}</Text>
              <Text style={St.myAccButtonsDescr}>Posts</Text>
            </View>
          </View>
        </View>
        <View style={[StylesOne.flex_row]}>
          <View style={[St.w240]}>
            <View>
              <Text numberOfLines={1} style={St.myAccName}>
                {(user as User).full_name}
              </Text>
            </View>
            <View>
              <Text numberOfLines={1} style={St.myAccDescr}>
                {(user as User).description}
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
      <ScrollView showsVerticalScrollIndicator={false} style={[St.postListStyles]} contentContainerStyle={St.listContainer}>
        {renderPosts()}
      </ScrollView>
    </ScrollView>
  ) : (
    <ScrollView
      contentContainerStyle={[StylesOne.screenContainer, MP.ph25]}
      refreshControl={<RefreshControl refreshing={refresh} onRefresh={makeRequest} />}
    >
      <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20, St.zIndex999]}>
        <TouchableOpacity
          onPress={() => {
            /*goBack(props.navigation)*/
          }}
          style={StylesOne.image24}
        >
          <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
        </TouchableOpacity>
        <Image source={images.logo} style={[StylesOne.image40, { tintColor: 'black' }]} />
        <View style={[StylesOne.image24]}></View>
      </View>
      <FullScreenPreloader />
    </ScrollView>
  );
};

export default UserProfileComponent;
