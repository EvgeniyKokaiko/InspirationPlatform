
import React from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, ScrollView } from 'react-native';
import { colors } from '../Parts/colors';
import { mockupHeightToDP } from '../Parts/utils';
import { backgrounds } from '../Styles/Backgrounds';
import { MP } from '../Styles/MP';
import { StylesFour } from '../Styles/StylesFour';
import { StylesOne } from '../Styles/StylesOne';
import { Comment } from '../Types/Models';
import { CommentItemView } from './segments/CommentItemView';
import { FormTextBox, FormTextBoxProps } from './segments/FormTextBox';
import { HeaderSegment } from './segments/Header/HeaderSegment';

type IProps = {
  refresh: boolean;
  onRefresh(): void;
  data: Array<Comment>;
  isLoading: boolean;
  formBoxProperties: FormTextBoxProps;
};

const CommentListComponent: React.FC<IProps> = (state: IProps): JSX.Element => {
  const _renderItem = ({ item, index }: {item: Comment, index: number}) => {
    return <CommentItemView {...item} index={index} key={index} />
  };

  return (
    <View style={[backgrounds.newsLine, StylesOne.wh100]}>
      <HeaderSegment headerTitle="Comments" />
      {state.isLoading ? (
        <ScrollView
          refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.onRefresh} />}
          contentContainerStyle={[StylesOne.flex1]}
        >
          <ActivityIndicator style={[MP.mt40]} color={colors.Primary_Red} size={40} />
        </ScrollView>
      ) : (
        <FlatList
          data={state.data}
          renderItem={_renderItem}
          horizontal={false}
          refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.onRefresh} />}
          numColumns={1}
          contentContainerStyle={{ paddingBottom: mockupHeightToDP(70) }}
          keyExtractor={(item, index) => item.comment_hash}
          style={[StylesFour.myNewsLine_List, backgrounds.newsLine]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text style={{ color: 'black' }}>No Comments</Text>
              </View>
            );
          }}
        />
      )}
      <FormTextBox {...state.formBoxProperties} />
    </View>
  );
};

export { CommentListComponent };
