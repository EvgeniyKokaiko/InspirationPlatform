import React, {useCallback, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import HomeComponent from '../HomeComponent';
import {useDispatch, useSelector} from "react-redux";
import {actionImpl} from "../../redux/actions";
import {Post} from "../../Types/Models";

type IProps = {};

type IState = {
  refresh: boolean;
  page: number;
  data: Post[];
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
    dispatch(actionImpl.getMyNewsLine(getState.page))
  }, [])

  const onBurgerPress = () => {
    console.log('onBurgerPress');
  }

  const onLikePress = () => {
    console.log('onLikePress');
  }

  const onCommendPress = () => {
    console.log('onCommendPress');
  }
  const onRepostPress = () => {
    console.log('onRepostPress');
  }

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
    dispatch(actionImpl.getMyNewsLine(getState.page))
  }, [])

  useEffect(() => {
    const news = store.GetMyNewsLineReducer
    if (news !== void 0 && news.statusCode === 200) {
      setState({...getState, data: store.GetMyNewsLineReducer.data})
      console.log(news);
    }
  }, [store])

  return <HomeComponent {...STATE} />;
};

export default HomeContainer;
