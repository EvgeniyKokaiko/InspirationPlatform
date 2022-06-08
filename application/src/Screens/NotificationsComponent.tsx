import React from 'react';
import { View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { colors } from '../Parts/colors';
import { backgrounds } from '../Styles/Backgrounds';
import { MP } from '../Styles/MP';
import { StylesFour } from '../Styles/StylesFour';
import { StylesOne } from '../Styles/StylesOne';
import { Notification } from '../Types/Models';
import { HeaderSegment } from './segments/Header/HeaderSegment';
import { NotificationItemView } from './segments/NotificationItemView';

type IProps = {
  loading: boolean;
  items: Array<Notification>;
  onReload(): void;
  refresh: boolean;
};

const NotificationsComponent: React.FC<IProps> = ({ loading, items, onReload, refresh }) => {
  const _renderItem = ({ item, index }: { item: Notification; index: number }) => {
    return <NotificationItemView {...item} key={index} />;
  };

  const renderBody = () => {
    if (loading) {
      return (
        <View style={[StylesOne.wh100, StylesOne.flexCenter, MP.pb80]}>
          <ActivityIndicator color={colors.Dark} size={'large'} />
        </View>
      );
    } else {
      return (
        <View style={[StylesOne.flex1, MP.ph6, MP.pb80]}>
          <FlatList
            nestedScrollEnabled
            scrollEnabled
            renderItem={_renderItem}
            data={items}
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onReload} />}
            ListEmptyComponent={() => {
              return (
                <View style={[StylesOne.w100, StylesOne.flexCenter, MP.mt40]}>
                  <Text style={StylesFour.noItems}>NO NOTIFICATIONS</Text>
                </View>
              );
            }}
          />
        </View>
      );
    }
  };

  return (
    <View style={[backgrounds.newsLine, StylesOne.wh100]}>
      <HeaderSegment hideLeftButton headerTitle="Notifications" />
      {renderBody()}
    </View>
  );
};

export default NotificationsComponent;
