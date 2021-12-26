import React, { useCallback } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView,
    FlatList,
    RefreshControl,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';
import { StylesOne } from '../Styles/StylesOne';
import { MP } from '../Styles/MP';
import Input from './segments/Input';
import UserMenuPost from './segments/UserMenuPost';
import { mockupHeightToDP } from '../Parts/utils';
import { SThree } from '../Styles/StylesThree';
import { Post } from '../Types/Models';
import {menuState} from "./Controllers/MenuContainer";

type IProps = {
  menuState: menuState;
  setMenuState: Function;
  onChange(e: any): void;
  onPostPress(postData: Post): void;
  onRefresh(): void;
  onScroll(e: NativeSyntheticEvent<NativeScrollEvent>): void;
};

const MenuComponent: React.FC<IProps> = (state) => {
  const renderPosts = () => {
    const expandedIndex = 8;
   return  (state.menuState.data.length < 0 ? [] : state.menuState.data).map((post,index) => {
      return <UserMenuPost key={`${post.image}${index}`} onPostPress={() => state.onPostPress(post)} postData={post} isExpanded={!(index % expandedIndex)} />
    })
  }

  return (
    <View style={[StylesOne.screenContainer, MP.ph15]}>
      <View>
        <Input placeholder="Search" currentValue={state.menuState.search} onChange={state.onChange} />
      </View>
      <ScrollView onScroll={(e) => state.onScroll(e)} refreshControl={<RefreshControl refreshing={state.menuState.refresh} onRefresh={state.onRefresh} /> } contentContainerStyle={SThree.menuPostsContainer}>
        {renderPosts()}
      </ScrollView>
    </View>
  );
};

export default MenuComponent;
