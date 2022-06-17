import React, { useCallback } from 'react';
import { View, Text, Button, ScrollView, FlatList, RefreshControl, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { StylesOne } from '../Styles/StylesOne';
import { MP } from '../Styles/MP';
import Input from './segments/Input';
import UserMenuPost from './segments/UserMenuPost';
import {mockupHeightToDP, mockupWidthToDP} from '../Parts/utils';
import { SThree } from '../Styles/StylesThree';
import { Post } from '../Types/Models';
import { menuState } from './Controllers/MenuContainer';
import { SearchUserModal } from './segments/SearchUserModal';

type IProps = {
  menuState: menuState;
  setMenuState: Function;
  onPostPress(postData: string): void;
  onRefresh(): void;
  onScroll(e: NativeSyntheticEvent<NativeScrollEvent>): void;
};

const MenuComponent: React.FC<IProps> = (state) => {


  const renderPosts = ({item, index}: {item: Post, index: number}) => {
    const expandedIndex = 20;
      const onPostPress = () => state.onPostPress(item.image)
      return (
        <UserMenuPost
          key={`${item.image}${index}`}
          onPostPress={onPostPress}
          postData={item}
          isExpanded={!(index % expandedIndex)}
        />
      );
  };

  return (
    <View style={[StylesOne.screenContainer]}>
      <View>
        <SearchUserModal />
      </View>
      <FlatList
        onScroll={(e) => state.onScroll(e)}
        refreshControl={<RefreshControl refreshing={state.menuState.refresh} onRefresh={state.onRefresh} />}
        contentContainerStyle={SThree.menuPostsContainer}
        style={{paddingRight: mockupWidthToDP(2)}}
        data={state.menuState.data}
        renderItem={renderPosts}
        columnWrapperStyle={{flexWrap: 'wrap'}}
        keyExtractor={(item, index) => `${index}`}
        numColumns={3}

      />
    </View>
  );
};

export default MenuComponent;
