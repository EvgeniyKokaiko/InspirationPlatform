import React, { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import ExpandedPostComponent from '../AdditionScreens/ExpandedPostComponent';
import { BaseProps } from '../../Types/Types';
import { onBlur, onFocus, StackScreens } from '../Core/MainNavigationScreen';
import { St } from '../../Styles/StylesTwo';
import { Post } from '../../Types/Models';
import { actionImpl, apiURL } from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { INavigation } from '../Core/OverrideNavigation';
import { HomePostEntity } from '../../BLL/entity/HomePostEntity';
import { currentUser } from '../../BLL/CurrentUserProps';
import { ActionTypes } from '../../redux/types/ActionTypes';

type IProps = {} & BaseProps;
type IState = {
  data: HomePostEntity | {};
  isLoading: boolean;
  carouselData: {
    data_count: number;
    owner: string;
    post_hash: string;
  };
};
//source={state.isAvatarIncluded === 999 ? images.standardAvatar : {uri: state.ownerAvatar}}
const ExpandedPostContainer: React.FC<IProps> = (props: IProps): JSX.Element => {
  const [getState, setState] = useState<IState>({
    data: {},
    carouselData: {
      data_count: 0,
      owner: '',
      post_hash: '',
    },
    isLoading: false,
  });
  const dispatch = useDispatch();
  const store: any = useSelector<any>((store) => store.getPostWithLikesReducer);
  let post_hash: string = props.route.params.pHash;
  const dataPath = `http://${apiURL}/storage/${getState.data?.owner}/posts/${getState.data?.image}/0.png`;
  const ownerAvatar: string = `http://${apiURL}/storage/${getState.data.owner}/avatar/avatar.png`;
  const onBackBtn = () => {
    INavigation.goBack();
  };

  // const _renderItem = ({ item, index }: {item: number, index: number}) => {
  //   return <Image key={1} style={[St.image100modal]} source={{ uri: `${dataPath}${index}.png?${Date.now()}` }} />;
  // }

  const onPostOwnerPress = (): void => {
    const ownerId = (getState.data as HomePostEntity).owner;
    if (ownerId !== void 0) {
      if (currentUser.currentUserId !== null || currentUser.currentUserId !== void 0) {
        if (currentUser.currentUserId === ownerId) {
          INavigation.navigate(StackScreens.MyProfile);
        } else {
          INavigation.navigate(StackScreens.UserProfile, { ownerId: ownerId });
        }
      }
    }
  };
  const onLikePress = useCallback(() => {
    const {image, owner} = getState.data as HomePostEntity;
    dispatch(actionImpl.likePost(image, owner, ActionTypes.LikeSinglePost))
   }, [getState.data]);

  const onCommendPress = () => {
    const id = {
      post_hash: getState.carouselData.post_hash
    }
    INavigation.navigate(StackScreens.Comments, id);
  };

  const onRepostPress = () => {};

  onFocus(() => {
    if (dispatch !== void 0) {
      dispatch(actionImpl.getPostWithLikesAndSub(post_hash));
    }
  }, [props.route.params, post_hash]);



  useEffect(() => {
    if (store.statusCode === 200) {
      if (store.data instanceof HomePostEntity) {
        setState({
          ...getState,
          data: store.data,
          carouselData: { data_count: store.data.data_count, owner: store.data.owner, post_hash: store.data.image },
        });
      } else {
        console.warn('Error! expanded post ex');
      }
    }
  }, [store]);

  const STATE = {
    onBackBtn,
    ownerAvatar,
    onPostOwnerPress,
    entity: getState.data as HomePostEntity,
    dataPath,
    onLikePress,
    onCommendPress,
    onRepostPress,
    carouselData: getState.carouselData,
  };

  return <ExpandedPostComponent {...STATE} />;
};

export default ExpandedPostContainer;
