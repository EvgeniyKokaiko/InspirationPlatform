import { transform } from '@babel/core';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../BLL/CurrentUserProps';
import { colors } from '../../Parts/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, mockupHeightToDP } from '../../Parts/utils';
import { actionImpl } from '../../redux/actions';
import { MP } from '../../Styles/MP';
import { StylesOne } from '../../Styles/StylesOne';
import { StackScreens } from '../Core/MainNavigationScreen';
import { INavigation } from '../Core/OverrideNavigation';
import Input from './Input';
import { UserListItem } from './UserListItem';

type IProps = {};
type IState = {
  items: Array<SearchedUser>;
  isVisible: boolean;
};

type SearchedUser = {
  description: string;
  full_name: string;
  username: string;
};

function SearchUserModal(props: IProps) {
  const fader = useRef(new Animated.Value(0)).current;
  const [getState, setState] = useState<IState>({
    items: [],
    isVisible: false,
  });
  const dispatch = useDispatch();
  const store: any = useSelector<any>((store) => store.searchUserByNameReducer);
  function onChange(v: string) {
    if (v === void 0 || v === null || v === '' || v === ' ') {
      hide();
      return;
    }
    show();
    fetchUsers(v);
  }

  const fetchUsers = async (v: string) => {
    await dispatch(actionImpl.searchUserByName(v));
  };

  const show = () => {
    Animated.timing(fader, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setState({ ...getState, isVisible: true });
  };

  const hide = () => {
    Animated.timing(fader, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setState({ ...getState, isVisible: false });
  };

    const onFollowingItemPress = (name: string): void => {
        if (name === currentUser.currentUserId) {
            INavigation.navigate(StackScreens.MyProfile)
            return
        }
        INavigation.navigate(StackScreens.UserProfile, { ownerId: name });
    }

  const renderList = () => {
    if (getState.items === void 0 || getState.items.length <= 0) {
      return (
        <View>
          <Text>No matches</Text>
        </View>
      );
    }
   return getState.items.map((user, index) => {
       const body = {
           ...user,
           showButtons: false,
           onFollowingItemPress: onFollowingItemPress

       }
        return ( <UserListItem key={index} {...body} /> )
    });
  };

  useEffect(() => {
    if (store.statusCode === 200) {
      const d = store.data;
      if (d === void 0 || d === null || !Array.isArray(d)) {
        return;
      }
      setState({ ...getState, items: store.data });
    }
  }, [store]);

  useEffect(() => {
    if (!getState.isVisible) {
      setState({ ...getState, items: [] });
    }
  }, [getState.isVisible]);

  return (
    <View>
      <View style={MP.ph15}>
        <Input debounced={true} placeholder="Search" onChange={onChange} />
      </View>
      <Animated.View
        style={[
          StylesOne.absolute,
          {
            top: mockupHeightToDP(60),
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT - mockupHeightToDP(60),
            zIndex: 9999,
            opacity: fader,
            backgroundColor: colors.SignIn_Font,
            display: getState.isVisible ? 'flex' : 'none',
          },
          MP.pb80,
        ]}
      >
        <ScrollView style={[StylesOne.flex1]}>
            {renderList()}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

export { SearchUserModal };
