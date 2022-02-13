import React, {useCallback, useEffect, useState} from 'react';
import FollowingListComponent from "../FollowingListComponent";
import {INavigation} from "../Core/OverrideNavigation";
import {useDispatch, useSelector} from "react-redux";
import {actionImpl} from "../../redux/actions";
import {Requests} from "../../Types/Models";
import {BaseProps} from "../../Types/Types";
import {onBlur, onFocus, StackScreens} from "../Core/MainNavigationScreen";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {isMe} from "../../Parts/utils";

type IProps = {} & BaseProps
type IState = {
    followingList: Requests[];
    refresh: boolean;
    currentIndex: number;
    myUserId: string | null;
}

const FollowingListContainer = (props: IProps) => {
    const dispatch = useDispatch()
    const {userId, listType}: {userId: string, listType: number} = props.route.params
    console.log(userId, listType)
    const store: any = useSelector<any>(state => state)
    const [getState, setState] = useState<IState>({
        followingList: [],
        refresh: false,
        currentIndex: -1,
        myUserId: ''
    })
    const onBackBtn = () => {
        INavigation.goBack()
    };


    const onFollowingItemPress = async (ownerId: string) => {
          if (getState.myUserId !== null) {
              console.log(getState.myUserId, ownerId, 'IDS')
              if (getState.myUserId as string === ownerId) {
                  INavigation.navigate(StackScreens.MyProfile)
              } else {
                  INavigation.navigate(StackScreens.UserProfile, {ownerId: ownerId})
              }
          }

    }


    const onRefresh = useCallback(() => {
        dispatch(actionImpl.getFollowerList(userId, listType))
        console.log(getState.followingList)
    }, [listType])

    const STATE = {
        onRefresh,
        refresh:getState.refresh,
        onBackBtn,
        data: getState.followingList,
        params: {userId, listType},
        onFollowingItemPress,
        isMe: getState.myUserId,
    }



    onFocus(() => {
        dispatch(actionImpl.getFollowerList(userId, listType))
        isMe().then((e) => {
            setState({...getState, myUserId: e})
        })
    }, [listType])

    onBlur(() => {
        dispatch(actionImpl.ClearFollowing());
        setState({...getState, followingList: []});
    }, [listType])





    useEffect(() => {
        if (store.followerListReducer?.statusCode === 200) {
            setState({...getState, followingList: store.followerListReducer.data})
            console.log(getState.followingList, store.followerListReducer, 'requests')
        }
    }, [store.followerListReducer, onRefresh, listType])
    return (
       <FollowingListComponent {...STATE} />
    );
};

export default FollowingListContainer;