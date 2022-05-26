import React, {useCallback, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import HomeComponent from '../HomeComponent';
import {useDispatch, useSelector} from "react-redux";
import {actionImpl} from "../../redux/actions";
import {Post} from "../../Types/Models";
import {onBlur, onFocus, StackScreens} from "../Core/MainNavigationScreen";
import { HomePostEntity } from '../../BLL/entity/HomePostEntity';
import { ActionTypes } from '../../redux/types/ActionTypes';
import { INavigation } from '../Core/OverrideNavigation';

type IProps = {};

type IState = {
  refresh: boolean;
  page: number;
  data: HomePostEntity[];
};

const HomeContainer: React.FC<IProps> = (props) => {
  const [getState, setState] = useState<IState>({
    refresh: false,
    data: [],
    page: 0,
  });
  const dispatch = useDispatch();
  const store: any = useSelector(store => store);
  const onRefresh = useCallback(() => {
    setState({...getState, refresh: true})
    dispatch(actionImpl.getMyNewsLine(getState.page))
    setState({...getState, refresh: false})
  }, [getState.page])

  const onBurgerPress = () => {
  }

  const onLikePress = useCallback((postHash: string, owner: string) => {
   dispatch(actionImpl.likePost(postHash, owner, ActionTypes.LikePost))
  }, []);
  

  const onCommendPress = (id: string) => {
    const data = {
      post_hash: id,
    }
    INavigation.navigate(StackScreens.Comments, data);
  };
  
  const onRepostPress = () => {
  }

  const onBackBtn = () => {
    INavigation.goBack();
  }

  onBlur(() => {
   setState({...getState, data: []})
  })

  const STATE = {
    onRefresh,
    refresh: getState.refresh,
    data: getState.data,
    onBurgerPress,
    onLikePress,
    onCommendPress,
    onRepostPress,
    onBackBtn
  };

 
  useEffect(() => {
  }, [props])


  onFocus(() => {
    dispatch(actionImpl.getMyNewsLine(getState.page))
  }, [getState.page])

  useEffect(() => {
    const news = store.GetMyNewsLineReducer
    if (news !== void 0 && news.statusCode === 200) {
      setState({...getState, data: news.data})
    }
  }, [store.GetMyNewsLineReducer.isModify])

  return <HomeComponent {...STATE} />;
};

export default HomeContainer;
