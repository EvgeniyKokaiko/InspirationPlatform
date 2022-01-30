import React, {useCallback, useEffect, useState} from 'react';
import UserProfileComponent from "../AdditionScreens/UserProfileComponent";
import {BaseProps} from "../../Types/Types";
import {useDispatch, useSelector} from "react-redux";
import {actionImpl, apiURL} from "../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackScreens} from "../Core/MainNavigationScreen";
import {Linking} from "react-native";
import {User} from "../../Types/Models";
import {checkForAvatar} from "../../Parts/utils";
import {INavigation} from "../Core/OverrideNavigation";

type IProps = {} & BaseProps

type userDataProps = {
    userData: any;
    refresh: boolean;
    avatarStatus: number;
    isFollowed: boolean;
}


const UserProfileContainer = (props: IProps) => {
    const ownerId: string = props.route.params.ownerId
    const dispatch = useDispatch()
    const ownerAvatar: string = `http://${apiURL}/storage/${ownerId}/avatar/avatar.png`;
    const store: any = useSelector<any>(state => state)
    const isMe = false;
    const [userState, setUserState] = useState<userDataProps>({
        userData: {},
        refresh: false,
        avatarStatus: -1,
        isFollowed: false,
    });

    const makeRequest = useCallback(() => {
        dispatch(actionImpl.getUser(ownerId));
    }, [ownerId]);


    async function onPersonalSitePress() {
        await Linking.openURL((userState.userData.userData as User).personal_site);
    }

    const onBackBtn = () => {
        //TODO Fix this
        // INavigation.goBack();
    };

    const onUnfollowPress = useCallback(() => {
        dispatch(actionImpl.makeUnfollow(ownerId))
    }, [ownerId])

    const onSubscribePress = useCallback(() => {
        dispatch(actionImpl.makeSubscribe(ownerId))
    }, [ownerId])


    const STATE = {
        ownerId,
        makeRequest,
        user: userState.userData,
        refresh: userState.refresh,
        isFollowed: userState.isFollowed,
        onPersonalSitePress,
        ownerAvatar,
        onBackBtn,
        avatarStatus: userState.avatarStatus,
        onSubscribePress,
        onUnfollowPress,
        isMe
    }



    useEffect(() => {
        if (!userState.userData?.isSubscribe) {
            setUserState({...userState, isFollowed: false})
        }
    }, [userState.userData])

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
        dispatch(actionImpl.getUser(ownerId))
        checkForAvatar(ownerAvatar).then((el) => {
            setUserState({...userState, avatarStatus: el})
        })
    }, [ownerId])


    useEffect(() => {
        setUserState({...userState, userData: store.getUserDataReducer.data, isFollowed: store.getUserDataReducer.data?.isSubscribe})
        console.log(store, userState.userData, "DATA")
    }, [store.getUserDataReducer])

    return <UserProfileComponent {...STATE} />
};

export default UserProfileContainer;