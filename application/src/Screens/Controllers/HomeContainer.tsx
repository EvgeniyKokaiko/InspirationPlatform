import React, {useCallback, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import HomeComponent from '../HomeComponent';
import {useDispatch, useSelector} from "react-redux";
import {actionImpl} from "../../redux/actions";
import {Post} from "../../Types/Models";
import {onBlur, onFocus} from "../Core/MainNavigationScreen";
import { HomePostEntity } from '../../BLL/entity/HomePostEntity';

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
  console.log('modified')
  const onRefresh = useCallback(() => {
    setState({...getState, refresh: true})
    dispatch(actionImpl.getMyNewsLine(getState.page))
    setState({...getState, refresh: false})
  }, [getState.page])

  const onBurgerPress = () => {
    console.log('onBurgerPress');
  }

  const onLikePress = useCallback((postHash: string, owner: string) => {
   dispatch(actionImpl.likePost(postHash, owner))
  }, []);

  const onCommendPress = () => {
    console.log('onCommendPress');
  }
  const onRepostPress = () => {
    console.log('onRepostPress');
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
    onRepostPress
  };

 
  useEffect(() => {
    console.log(store.GetMyNewsLineReducer.isModify, 'focusde')
  }, [props])


  onFocus(() => {
    dispatch(actionImpl.getMyNewsLine(getState.page))
  }, [getState.page])

  useEffect(() => {
    console.log('modified2')
    const news = store.GetMyNewsLineReducer
    if (news !== void 0 && news.statusCode === 200) {
      setState({...getState, data: news.data})
      console.log(news);
    }
  }, [store.GetMyNewsLineReducer.isModify])

  return <HomeComponent {...STATE} />;
};

export default HomeContainer;
