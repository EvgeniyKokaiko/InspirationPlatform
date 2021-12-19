import React, { useCallback } from 'react';
import { View, Text, Button, ScrollView, FlatList } from 'react-native';
import { StylesOne } from '../Styles/StylesOne';
import { MP } from '../Styles/MP';
import Input from './segments/Input';
import UserMenuPost from './segments/UserMenuPost';
import { mockupHeightToDP } from '../Parts/utils';
import { SThree } from '../Styles/StylesThree';
import { Post } from '../Types/Models';

type IProps = {
  search: string;
  setSearch(prev: any): void;
  onChange(e: any): void;
  onPostPress(postData: Post): void;
};

const MenuComponent: React.FC<IProps> = (state) => {
  const fakePost: Post = {
    id: 1,
    owner: 'evgeniy',
    type: 2,
    image: 'TqWPUlWAcidRlufmYWddEktBDrWMYZ',
    video: '',
    caption: 'A falsis, mons clemens bursa. Riddle, life, and amnesty. A falsis, mons clemens bursa. Riddle, life, and amnesty. A falsis, mons clemens bursa. Riddle, life, and amnesty. A falsis, mons clemens bursa. Riddle, life, and amnesty.  A falsis, mons clemens bursa. Riddle, life, and amnesty. vA falsis, mons clemens bursa. Riddle, life, and amnesty. A falsis, mons clemens bursa. Riddle, life, and amnesty. A falsis, mons clemens bursa. Riddle, life, and amnesty. A falsis, mons clemens bursa. Riddle, life, and amnesty.A falsis, mons clemens bursa. Riddle, life, and amnesty.',
    like_id: 'evgeniy',
    date_of_creation: '2021-12-05',
    data_count: 3,
  };

  return (
    <View style={[StylesOne.screenContainer, MP.ph15]}>
      <View>
        <Input placeholder="Search" currentValue={state.search} onChange={state.onChange} />
      </View>
      <ScrollView contentContainerStyle={SThree.menuPostsContainer}>
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} isExpanded />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
        <UserMenuPost onPostPress={state.onPostPress} postData={fakePost} />
      </ScrollView>
    </View>
  );
};

export default MenuComponent;
