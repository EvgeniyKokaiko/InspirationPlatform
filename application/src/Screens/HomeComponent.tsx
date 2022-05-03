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
import { HomePostEntity } from '../BLL/entity/HomePostEntity';
import { HomePostView } from './segments/HomePostView';
import { HeaderSegment } from './segments/Header/HeaderSegment';

type IProps = {
  onRefresh(): void;
  refresh: boolean;
  data: HomePostEntity[];
  onBurgerPress(): void;
  onLikePress(postHash: string, owner: string): void;
  onCommendPress(id: string): void;
  onRepostPress(): void;
  onBackBtn(): void;
};

const HomeComponent: React.FC<IProps> = (state) => {
  const _renderItem = ({ item }: { item: HomePostEntity }) => {
    return (
      <HomePostView
        entity={item}
        onBurgerPress={state.onBurgerPress}
        onCommendPress={state.onCommendPress}
        onLikePress={state.onLikePress}
        onRepostPress={state.onRepostPress}
        refresh={state.refresh}
      />
    );
  };

  return (
    <View style={[backgrounds.newsLine, StylesOne.wh100]}>
     <HeaderSegment headerTitle='Home' />
      <FlatList
        data={state.data}
        renderItem={_renderItem}
        horizontal={false}
        refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.onRefresh} />}
        numColumns={1}
        keyExtractor={(item, index) => `${item}${index}`}
        style={[StylesFour.myNewsLine_List, backgrounds.newsLine, { marginBottom: mockupHeightToDP(70) }]}
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
