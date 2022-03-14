import React, {useCallback, useEffect, useState} from 'react';
import { Image, View } from 'react-native';
import ExpandedPostComponent from '../AdditionScreens/ExpandedPostComponent';
import { BaseProps } from '../../Types/Types';
import { StackScreens } from '../Core/MainNavigationScreen';
import { St } from '../../Styles/StylesTwo';
import { Post } from '../../Types/Models';
import {actionImpl, apiURL} from '../../redux/actions';
import {checkForAvatar} from "../../Parts/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {INavigation} from "../Core/OverrideNavigation";

type IProps = {} & BaseProps;
//source={state.isAvatarIncluded === 999 ? images.standardAvatar : {uri: state.ownerAvatar}}
const ExpandedPostContainer: React.FC<IProps> = (props: IProps): JSX.Element => {
  const [postState, setPostState] = useState(0)
  const dispatch = useDispatch()
  let postData: Post = props.route.params.postData;
  const dataPath = `http://${apiURL}/storage/${postData.owner}/posts/${
    postData.image.length > 0 && postData.data_count > 0 ? postData.image : postData.video
  }/`;
  const ownerAvatar: string = `http://${apiURL}/storage/${postData.owner}/avatar/avatar.png`;
  const onBackBtn = () => {
    postData = props.route.params.postData;
    console.log(postData)
    INavigation.goBack();
  };
  useEffect(() => {
    postData = props.route.params.postData;
  }, []);

  const createList = () => {
    const result: null[] = new Array(postData.data_count); for (let i=0; i<postData.data_count; ++i) result[i] = null;
    console.log(result.length, result, postData.data_count)
    return result;
  };

  const entity = {
    likesCount: 2,
  }

  const _renderItem = ({ item, index }: {item: number, index: number}) => {
    return <Image key={1} style={[St.image100modal]} source={{ uri: `${dataPath}${index}.png?${Date.now()}` }} />;
  }

  const onPostOwnerPress = (): void => {
    if (postData.owner !== void 0) {
      AsyncStorage.getItem("currentUserId").then((el) => {
          if (el !== null || el !== void 0) {
              if (el === postData.owner) {
                INavigation.navigate(StackScreens.MyProfile)
              } else {
                INavigation.navigate(StackScreens.UserProfile, {ownerId: postData.owner})
              }
          } else {
              dispatch(actionImpl.logout())
              dispatch(actionImpl.clear())
              INavigation.navigate(StackScreens.SignIn)
          }
      })
    }
  }



  const STATE = {
    onBackBtn,
    _renderItem,
    createList,
    postData,
    ownerAvatar,
    postState,
    onPostOwnerPress,
    entity
  };


  useEffect(() => {
    checkForAvatar(ownerAvatar).then((el) => {
      setPostState(el)
    })
  }, [postData])

  return <ExpandedPostComponent {...STATE} />;
};

export default ExpandedPostContainer;
