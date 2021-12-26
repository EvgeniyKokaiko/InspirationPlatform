import React, { useCallback, useEffect } from 'react';
import { Image, View } from 'react-native';
import ExpandedPostComponent from '../AdditionScreens/ExpandedPostComponent';
import { BaseProps } from '../../Types/Types';
import { StackScreens } from '../Core/MainNavigationScreen';
import { St } from '../../Styles/StylesTwo';
import { Post } from '../../Types/Models';
import { apiURL } from '../../redux/actions';
import {images} from "../../assets/images";

type IProps = {} & BaseProps;

const ExpandedPostContainer: React.FC<IProps> = (props: IProps): JSX.Element => {
  let postData: Post = props.route.params.postData;
  const dataPath = `http://${apiURL}/storage/${postData.owner}/posts/${
    postData.image.length > 0 && postData.data_count > 0 ? postData.image : postData.video
  }/`;
  const ownerAvatar: string = `http://${apiURL}/storage/${postData.owner}/avatar/avatar.png`;
  const onBackBtn = () => {
    postData = props.route.params.postData;
    console.log(postData)
    props.navigation.navigate(StackScreens.Menu);
  };
  useEffect(() => {
    postData = props.route.params.postData;
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

  const _renderItem = ({ item, index }: {item: number, index: number}) => {
    console.log(item, index);
    return <Image key={1} style={[St.image100modal]} source={{ uri: `${dataPath}${item}.png?${Date.now()}` }} />;
  }


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
