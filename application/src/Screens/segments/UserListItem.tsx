import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { mockupWidthToDP, fontSizeDP } from '../../Parts/utils';
import { apiURL } from '../../redux/actions';
import { MP } from '../../Styles/MP';
import { StylesOne } from '../../Styles/StylesOne';
import { St } from '../../Styles/StylesTwo';

type IProps = {
    username?: string;
    onFollowingItemPress?(name: string): void;
    full_name?: string;
    isMe?: string;
    params?: any;
    index?: number;
    showButtons?: boolean;
};

 function UserListItem(props: IProps) {
    let avatar = `http://${apiURL}/storage/${props!.username}/avatar/avatar.png`;
    return (
      <View key={props.index} style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c ,MP.mv10, MP.ph15, { width: '100%' }]}>
        <TouchableOpacity onPress={() => props.onFollowingItemPress!(props.username!)} style={[StylesOne.flex_row]}>
          <View style={[MP.mr10]}>
            <Image style={[St.round100image40]} source={{uri : avatar}} />
          </View>
          <View style={[StylesOne.flex_column, StylesOne.flex_jc_c, { width: mockupWidthToDP(120) }]}>
            <Text numberOfLines={1} style={[StylesOne.requests_username]}>
              {props.username}
            </Text>
            <Text numberOfLines={1} style={[StylesOne.requests_fullName]}>
              {props.full_name}
            </Text>
          </View>
        </TouchableOpacity>
        {props.showButtons &&
        <>
        {typeof props.isMe === 'string' && props.isMe === props.params.userId ? <View style={[StylesOne.flex_row, { justifyContent: 'flex-end', alignItems: 'center' }]}>
          {props.params.listType === 1 ? <TouchableOpacity style={[MP.mr5, StylesOne.followerListButton]}>
            <Text style={[StylesOne.following_title, { fontSize: fontSizeDP(12)}]}>{'Unfollow'}</Text>
          </TouchableOpacity>
              :
          <TouchableOpacity style={[MP.mr5, StylesOne.followerListButton]}>
            <Text style={[StylesOne.following_title, { fontSize: fontSizeDP(12)}]}>{'Remove'}</Text>
          </TouchableOpacity>}
        </View>
        : null}
        </>
        }
      </View>
    );
}

export {UserListItem}
