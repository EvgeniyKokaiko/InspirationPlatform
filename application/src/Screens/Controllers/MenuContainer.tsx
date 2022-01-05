import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import MenuComponent from '../MenuComponent';
import { BaseProps } from '../../Types/Types';
import { StackScreens } from '../Core/MainNavigationScreen';
import { useDispatch, useSelector } from 'react-redux';
import { actionImpl } from '../../redux/actions';
import { Post } from '../../Types/Models';
import {Alert, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {mockupHeightToDP} from "../../Parts/utils";

export interface menuState {
  search: string;
  page: number;
  data: Post[];
  refresh: boolean;
}

type IProps = {} & BaseProps;

const MenuContainer: React.FC<IProps> = (props: IProps): JSX.Element => {
  const [menuState, setMenuState]: [menuState, Function] = useState({
    search: '',
    page: 0,
    data: [],
    refresh: false,
  });
  const [isRequested, setIsRequested] = useState(false)
  //{data: Post[], statusCode: number, statusMessage: string}
  const dispatch = useDispatch();
  const state: any = useSelector<any>((state) => state.getNewsLineReducer);


  function onChange(v: string) {
    setMenuState({ ...menuState, search: v });
  }

  const onPostPress = (postData: Post) => {
    props.navigation.navigate(StackScreens.PostDetails, { postData });
  }

  const onRefresh = useCallback(() => {
    console.log()
    setMenuState({...menuState, page: 0, refresh: true})
    dispatch(actionImpl.getNewsline(0, true));
    setMenuState({...menuState, refresh: false, isRequested: false})
  }, [])


   const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nEv = e.nativeEvent;
     console.log('OFFSET GOT', menuState.page)
    const offsetY = nEv.contentOffset.y;
    if (offsetY > (nEv.contentSize.height - nEv.layoutMeasurement.height - 600)) {
      if (!isRequested && menuState.page !== state[0].pages) {
        setMenuState({...menuState, page: menuState.page += 1})
        console.log(menuState.page, "PAGE")
        dispatch(actionImpl.getNewsline(menuState.page, false));
        setIsRequested(true);
      }
    }
   }


  const STATE = {
    menuState,
    setMenuState,
    onChange,
    onPostPress,
    onRefresh,
    onScroll,
  };

  // useEffect(() => {
  //   console.log(state)
  //   try {
  //     if (state.length > 1) {
  //       for (let i=0;i< state.length;i++) {
  //        setMenuState({...menuState, data: [...menuState.data, ...state[i].data]})
  //         console.log(menuState.data, 'MENUSTATE')
  //       }
  //       setIsRequested(false)
  //     }
  //     console.log(menuState.data)
  //   } catch (e) {
  //     console.log('foreach ex', e)
  //   }
  // }, [state])

  useEffect(() => {
    if (menuState.page === 0) {
      dispatch(actionImpl.getNewsline(menuState.page));
    }
  }, []);


  useEffect(() => {
    try {
    if (state.length > 0 && typeof state !== "undefined") {
      if (state[0].statusCode === 200) {
        if (!isRequested) {
          setMenuState({...menuState, data: [menuState.data.length > 0 && menuState.data, state[0].data]})
        } else {
          if (state.length > 1 && menuState.data.length !== 0) {
              for (let i=0;i< state.length;i++) {
                setMenuState({...menuState, data: [...menuState.data, ...state[i].data]})
                console.log(menuState.data, 'MENUSTATE')
              }
              setIsRequested(false)
          }
        }
      } else {
        Alert.alert('Error!', 'Something went wrong');
      }
    } else {
    }
    } catch (exception) {
      console.log("menuState ex", exception)
    }
  }, [state]);

  return <MenuComponent {...STATE} />;
};

export default MenuContainer;
