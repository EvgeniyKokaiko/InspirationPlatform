import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import MenuComponent from '../MenuComponent';
import { BaseProps } from '../../Types/Types';
import { StackScreens } from '../Core/MainNavigationScreen';
import { useDispatch, useSelector } from 'react-redux';
import { actionImpl } from '../../redux/actions';
import { Post } from '../../Types/Models';
import {Alert, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {mockupHeightToDP} from "../../Parts/utils";
import {INavigation} from "../Core/OverrideNavigation";
import { homeEntityProps, HomePostEntity } from '../../BLL/entity/HomePostEntity';

export interface menuState {
  page: number;
  data: Post[];
  refresh: boolean;
}

type IProps = {} & BaseProps;

const MenuContainer: React.FC<IProps> = (props: IProps): JSX.Element => {
  const [menuState, setMenuState]: [menuState, Function] = useState({
    page: 0,
    data: [],
    refresh: false,
  });
  const [isRequested, setIsRequested] = useState(false)
  //{data: Post[], statusCode: number, statusMessage: string}
  const dispatch = useDispatch();
  const state: any = useSelector<any>((state) => state.getNewsLineReducer);

  const onPostPress = (postHash: string) => {
    INavigation.navigate(StackScreens.PostDetails, { pHash: postHash });
  }

  const onRefresh = useCallback(() => {
    console.log()
    setMenuState({...menuState, page: 0, refresh: true})
    dispatch(actionImpl.getNewsline(0));
    setMenuState({...menuState, refresh: false})
  }, [])


   const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nEv = e.nativeEvent;
     console.log('OFFSET GOT', menuState.page)
    const offsetY = nEv.contentOffset.y;
    if (offsetY > (nEv.contentSize.height - nEv.layoutMeasurement.height - 600)) {
      if (!isRequested && menuState.page !== state[0].pages) {
        setMenuState({...menuState, page: menuState.page += 1})
        dispatch(actionImpl.getNewsline(menuState.page));
        setIsRequested(true);
      }
    }
   }


  const STATE = {
    menuState,
    setMenuState,
    onPostPress,
    onRefresh,
    onScroll,
  };


  useEffect(() => {
    if (menuState.page === 0) {
      dispatch(actionImpl.getNewsline(menuState.page));
    }
  }, []);


  useEffect(() => {
    try {
    if (state.length > 0 && typeof state !== "undefined") {
      if (state[0].statusCode === 200) {
                setMenuState({...menuState, data: [...menuState.data, ...state[0].data]})
                console.log(menuState.data, 'MENUSTATE')
              setIsRequested(false)
      } else {
        Alert.alert('Error!', 'Something went wrong');
      }
    } else {
    }
    } catch (exception) {
      console.log("menuState ex", exception)
    }
  }, [state]);

  return <><MenuComponent {...STATE} /></>;
};

export default MenuContainer;
