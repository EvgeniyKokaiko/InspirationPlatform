import React, {useCallback, useEffect, useState} from 'react';
import UserProfileComponent from "../AdditionScreens/UserProfileComponent";
import {BaseProps} from "../../Types/Types";
import {useDispatch, useSelector} from "react-redux";
import {actionImpl, apiURL} from "../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackScreens} from "../Core/MainNavigationScreen";
import {Linking} from "react-native";
import {User} from "../../Types/Models";

type IProps = {} & BaseProps

type userDataProps = {
    userData: any,
    refresh: boolean
}

const UserProfileContainer = (props: IProps) => {
    const ownerId: string = props.route.params.ownerId
    const dispatch = useDispatch()
    const ownerAvatar: string = `http://${apiURL}/storage/${ownerId}/avatar/avatar.png`;
    const store: any = useSelector<any>(state => state.getUserDataReducer)
    const [userState, setUserState] = useState<userDataProps>({
        userData: {},
        refresh: false,
    });

    const makeRequest = useCallback(() => {
        dispatch(actionImpl.getUser(ownerId));
    }, [ownerId]);


    async function onPersonalSitePress() {
        await Linking.openURL((userState.userData.userData as User).personal_site);
    }

    const onBackBtn = () => {
        props.navigation.navigate(StackScreens.Menu);
    };

    const STATE = {
        ownerId,
        makeRequest,
        user: userState.userData,
        refresh: userState.refresh,
        onPersonalSitePress,
        ownerAvatar,
        onBackBtn
    }


    useEffect(() => {
        dispatch(actionImpl.getUser(ownerId))
    }, [ownerId])


    useEffect(() => {
        setUserState({...userState, userData: store.data})
        console.log(store, userState.userData, "DATA")
    }, [store])

    return <UserProfileComponent {...STATE} />
};

export default UserProfileContainer;