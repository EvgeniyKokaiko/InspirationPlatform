import React from 'react';
import { View, Text, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { Post } from '../Types/Models';
import { apiURL } from '../redux/actions';
import { dateParser, mockupHeightToDP, mockupWidthToDP } from '../Parts/utils';
import { StylesOne } from '../Styles/StylesOne';
import { St } from '../Styles/StylesTwo';
import { StylesFour } from '../Styles/StylesFour';
import { MP } from '../Styles/MP';
import { backgrounds } from '../Styles/Backgrounds';
import { images } from '../assets/images';

type IProps = {
  onRefresh(): void;
  refresh: boolean;
  data: Post[];
  onBurgerPress(): void;
  onLikePress(): void;
  onCommendPress(): void;
  onRepostPress(): void;
};

const HomeComponent: React.FC<IProps> = (state) => {
  const _renderItem = ({ item }: { item: Post }) => {
    const src = `http://${apiURL}/storage/${item.owner}/avatar/avatar.png`;
    const date = dateParser(item.date_of_creation, 1);
    const img = `http://${apiURL}/storage/${item.owner}/posts/${item.image}/0.png?ab=${Date.now()}`;
    return (
      <View style={[MP.mb20]}>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, MP.mb10]}>
          <View style={[StylesOne.flex_row]}>
            <Image style={[StylesFour.myNewsLine_avatar]} source={{ uri: src }} />
            <View style={[StylesOne.flex_column, MP.ml5]}>
              <Text numberOfLines={1} style={[StylesFour.myNewsLine_owner]}>
                {item.owner}
              </Text>
              <Text numberOfLines={1} style={[StylesFour.myNewsLine_date]}>
                {date}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={state.onBurgerPress} style={[StylesOne.flex_row, StylesOne.flex_ai_c]}>
            <Image style={St.image20} source={images.burgerBtn} />
          </TouchableOpacity>
        </View>
        <View style={[MP.mb10]}>
          <Text style={[StylesFour.myNewsLine_caption]}>{item.caption}</Text>
        </View>
        <View>
          <Image style={StylesFour.myNewsLine_img} source={{ uri: img }} />
        </View>
        <View style={[StylesOne.flex_row, MP.mt10, MP.mb20]}>
          <TouchableOpacity onPress={state.onLikePress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.like} />
            <Text style={{ color: 'black' }}>62</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={state.onCommendPress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.commend} />
            <Text style={{ color: 'black' }}>62</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={state.onRepostPress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.repost} />
          </TouchableOpacity>
        </View>
          <View style={St.horizontalLine} />
      </View>
    );
  };

  return (
    <View style={[backgrounds.newsLine, StylesOne.wh100]}>
      <FlatList
        data={state.data}
        renderItem={_renderItem}
        horizontal={false}
        refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.onRefresh} />}
        numColumns={1}
        keyExtractor={(item, index) => `${item}${index}`}
        style={[StylesFour.myNewsLine_List, backgrounds.newsLine, {marginBottom: mockupHeightToDP(70)}]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text style={{ color: 'black' }}>No posts</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default HomeComponent;
