import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { dateParser } from '../../Parts/utils';
import { apiURL } from '../../redux/actions';
import { MP } from '../../Styles/MP';
import { StylesFour } from '../../Styles/StylesFour';
import { StylesOne } from '../../Styles/StylesOne';
import { Notification } from '../../Types/Models';
import { StackScreens } from '../Core/MainNavigationScreen';
import { INavigation } from '../Core/OverrideNavigation';
import Avatar from './Avatar';

type IProps = {} & Notification;

const NotificationItemView: React.FC<IProps> = ({ author, createdAt, holder, post_hash, status, text }) => {
  const avatarURL = `http://${apiURL}/storage/${author}/avatar/avatar.png`;
  const getDate = dateParser(createdAt);

  const onItemPress = () => {
    if (author !== void 0 && author !== null) {
      INavigation.navigate(StackScreens.UserProfile, { ownerId: author });
    }
  };

  return (
    <TouchableOpacity onPress={onItemPress} style={[StylesOne.w100, MP.mb10, MP.mt10]}>
      <View style={[StylesOne.w100]}>
        <View style={[StylesOne.flex_row]}>
          <Avatar icon={{ uri: avatarURL }} size={40} />
          <View style={[StylesOne.w58, MP.ml5]}>
            <View>
              <Text numberOfLines={1} style={StylesFour.commentName_title}>
                {author}
              </Text>
            </View>
            <View>
              <Text numberOfLines={1} style={StylesFour.commentfName_title}>
                To {holder}
              </Text>
            </View>
          </View>
          <View style={[StylesOne.w28]}>
            <Text style={StylesFour.commentDate_title}>{getDate}</Text>
          </View>
        </View>
        <View style={[StylesOne.w100, MP.mt5]}>
          <Text style={StylesFour.commentComment_title}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { NotificationItemView };
