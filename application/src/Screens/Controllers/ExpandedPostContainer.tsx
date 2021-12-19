import React, { useCallback, useEffect } from 'react';
import { Image, View } from 'react-native';
import ExpandedPostComponent from '../AdditionScreens/ExpandedPostComponent';
import { BaseProps } from '../../Types/Types';
import { StackScreens } from '../Core/MainNavigationScreen';
import { St } from '../../Styles/StylesTwo';
import { Post } from '../../Types/Models';
import { apiUrl } from '../../redux/actions';

type IProps = {} & BaseProps;

const ExpandedPostContainer: React.FC<IProps> = (props: IProps): JSX.Element => {
  const postData: Post = props.route.params.postData;
  const dataPath = `http://${apiUrl}/storage/${postData.owner}/posts/${
    postData.image.length > 0 && postData.data_count > 0 ? postData.image : postData.video
  }/`;
  const ownerAvatar: string = `http://${apiUrl}/storage/${postData.owner}/avatar/avatar.png`;
  const onBackBtn = () => {
    props.navigation.navigate(StackScreens.UserProfile);
  };
  useEffect(() => {
    console.log(props, props.route.params);
    console.log(postData, 'POST DATA');
    console.log(dataPath);
  }, []);

  const createList = () => {
    const result = [];
    for (let i = 0; i < postData.data_count; i++) {
      result.push(i);
    }
    return result;
  };

  const _renderItem = useCallback(({ item, index }) => {
    console.log(item, index);
    return <Image key={1} style={[St.image100modal]} source={{ uri: `${dataPath}${item}.png` }} />;
  }, []);

  const STATE = {
    onBackBtn,
    _renderItem,
    createList,
    postData,
    ownerAvatar,
  };

  return <ExpandedPostComponent {...STATE} />;
};

export default ExpandedPostContainer;
