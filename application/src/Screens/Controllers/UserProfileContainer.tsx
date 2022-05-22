import React, {useCallback, useEffect, useState} from 'react';
import UserProfileComponent from "../AdditionScreens/UserProfileComponent";
import {BaseProps} from "../../Types/Types";
import {useDispatch, useSelector} from "react-redux";
import {actionImpl, apiURL} from "../../redux/actions";
import {onFocus, StackScreens} from "../Core/MainNavigationScreen";
import {Linking} from "react-native";
import {User} from "../../Types/Models";
import {INavigation} from "../Core/OverrideNavigation";
import { ActionTypes } from '../../redux/types/ActionTypes';

type IProps = {} & BaseProps

type userDataProps = {
    refresh: boolean;
    isFollowed: boolean;
}


const UserProfileContainer = (props: IProps) => {
    const ownerId: string = props.route.params.ownerId
    const dispatch = useDispatch()
    const ownerAvatar: string = `http://${apiURL}/storage/${ownerId}/avatar/avatar.png`;
    const store: any = useSelector<any>(state => state)
    const userData: any = useSelector<any>(state => state.getUserDataReducer.data);
    const isMe = false;
    const [userState, setUserState] = useState<userDataProps>({
        refresh: false,
        isFollowed: false,
    });
    const makeRequest = useCallback(() => {
        dispatch(actionImpl.getUser(ownerId));
    }, [ownerId]);


    async function onPersonalSitePress() {
        await Linking.openURL((userData as User).personal_site);
    }

    const onBackBtn = () => {
        INavigation.goBack();
    };

    const onUnfollowPress = useCallback(() => {
        dispatch(actionImpl.makeUnfollow(ownerId))
    }, [ownerId])

    const onSubscribePress = useCallback(() => {
        dispatch(actionImpl.makeSubscribe(ownerId))
    }, [ownerId])

    const goToChatScreen = () => {
        console.log(userData)
        INavigation.navigate(StackScreens.U2UChat, {userId: ownerId, socketHash: userData.isSubscribed.socket_hash})
    }

    function onFollowingPress() {
        INavigation.navigate(StackScreens.Following, {userId: ownerId, listType: 1})
    }

    function onFollowersPress() {
        INavigation.navigate(StackScreens.Following, {userId: ownerId, listType: 0})
    }


    const onLikePress = useCallback((postHash: string, owner: string) => {
        dispatch(actionImpl.likePost(postHash, owner, ActionTypes.LikeUserPosts))
       }, []);

       const onCommendPress = (post_hash: string) => {
        const data = {
          post_hash: post_hash,
        }
        INavigation.navigate(StackScreens.Comments, data);
      };
    

      onFocus(() => {
        dispatch(actionImpl.getUser(ownerId))
      }, [ownerId])


    const STATE = {
        ownerId,
        makeRequest,
        user: userData,
        refresh: userState.refresh,
        isFollowed: userState.isFollowed,
        onPersonalSitePress,
        ownerAvatar,
        onCommendPress,
        onBackBtn,
        onSubscribePress,
        onUnfollowPress,
        isMe,
        goToChatScreen,
        onFollowingPress,
        onFollowersPress,
        onLikePress,
    }


    useEffect(() => {
        console.log(userData, store);
        if (!userData?.isSubscribe) {
            setUserState({...userState, isFollowed: false})
        }
    }, [userData])

    useEffect(() => {
        if (store.unfollowReducer.statusCode === 200) {
            setUserState({...userState, isFollowed: false})
        }
    }, [store.unfollowReducer])

    useEffect(() => {
        if (store.subscribeReducer.statusCode === 200) {
            setUserState({...userState, isFollowed: true})
        }
    }, [store.subscribeReducer])




    useEffect(() => {
        setUserState({...userState, isFollowed: store.getUserDataReducer.data?.isSubscribe})
    }, [store.getUserDataReducer])

    return <UserProfileComponent {...STATE} />
};

export default UserProfileContainer;