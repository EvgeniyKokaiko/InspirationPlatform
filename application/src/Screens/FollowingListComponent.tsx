import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { apiURL } from '../redux/actions';
import { StylesOne } from '../Styles/StylesOne';
import { MP } from '../Styles/MP';
import { St } from '../Styles/StylesTwo';
import { images } from '../assets/images';
import { fontSizeDP, mockupWidthToDP } from '../Parts/utils';
import { Requests } from '../Types/Models';

type IProps = {
  onRefresh(): void;
  refresh: boolean;
  onBackBtn(): void;
  data: Requests[];
  params: { userId: string; listType: number };
  onFollowingItemPress(ownerId: string): void;
  isMe: string | null;
};

const FollowingListComponent = (state: IProps) => {
  const renderList = () => {
    return state.data.map((el, index) => {
      console.log(el, index, "RENDER");
      let avatar = `http://${apiURL}/storage/${el!.username}/avatar/avatar.png?ab=${Date.now()}`;
      return (
        <View key={index} style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c ,MP.mv10, MP.ph15, { width: '100%' }]}>
          <TouchableOpacity onPress={() => state.onFollowingItemPress(el.username)} style={[StylesOne.flex_row]}>
            <View style={[MP.mr10]}>
              <Image style={[St.round100image40]} source={{uri : avatar}} />
            </View>
            <View style={[StylesOne.flex_column, StylesOne.flex_jc_c, { width: mockupWidthToDP(120) }]}>
              <Text numberOfLines={1} style={[StylesOne.requests_username]}>
                {el.username}
              </Text>
              <Text numberOfLines={1} style={[StylesOne.requests_fullName]}>
                {el.full_name}
              </Text>
            </View>
          </TouchableOpacity>
          {typeof state.isMe === 'string' && state.isMe === state.params.userId ? <View style={[StylesOne.flex_row, { justifyContent: 'flex-end', alignItems: 'center' }]}>
            {state.params.listType === 1 ? <TouchableOpacity style={[MP.mr5, StylesOne.followerListButton]}>
              <Text style={[StylesOne.following_title, { fontSize: fontSizeDP(12)}]}>{'Unfollow'}</Text>
            </TouchableOpacity>
                :
            <TouchableOpacity style={[MP.mr5, StylesOne.followerListButton]}>
              <Text style={[StylesOne.following_title, { fontSize: fontSizeDP(12)}]}>{'Remove'}</Text>
            </TouchableOpacity>}
          </View>
          : null}
        </View>
      );
    });
  };

  if (state.data.length > 0) {
    return (
      <ScrollView style={[StylesOne.screenContainer]} refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.onRefresh} />}>
        <View style={[StylesOne.w100, MP.ph25]}>
          <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
            <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
              <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
            </TouchableOpacity>
            <Text style={StylesOne.CheckBox_text}>{state.params.listType === 1 ? 'Following' : 'Followers'}</Text>
            <View />
          </View>
        </View>
        <View>{renderList()}</View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      style={[StylesOne.screenContainer, MP.ph25]}
      refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.onRefresh} />}
    >
      <View style={[StylesOne.w100]}>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
          <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
            <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
          </TouchableOpacity>
          <Text style={StylesOne.CheckBox_text}>{state.params.listType === 1 ? 'Following' : 'Followers'}</Text>
          <View />
        </View>
      </View>
      <View>
        <Text style={{ color: 'black' }}>No {state.params.listType === 1 ? 'Following' : 'Followers'}</Text>
      </View>
    </ScrollView>
  );
};

export default FollowingListComponent;
