import React, {useEffect, useMemo, useState} from 'react';
import {View} from "react-native";
import ManageAccountComponent from "../ManageAccountComponent";
import {ImagePickerResponse} from "react-native-image-picker";
import {actionImpl, apiURL} from "../../redux/actions";
import {User} from "../../Types/Models";
import {useDispatch, useSelector} from "react-redux";
import {INavigation} from "../Core/OverrideNavigation";

type IProps = {}
export type ManageAccountState = {
    email: string | number;
    isPrivate: number;
    avatar: ImagePickerResponse | number;
    gender: string | number;
    description: string | number;
    location: string | number;
    fName: string | number;
    dateOfBirth: string | number;
    personalSite: string | number;
    originalData: User | any;
    type: ManageAccountState | null | string;
    modalVisible: boolean;
}

const ManageAccountContainer: React.FC<ManageAccountState> = (props: IProps) => {
    const dispatch = useDispatch()
    const store: any = useSelector(state => state);
    const [getState, setState] = useState<ManageAccountState>({
        avatar: -1,
        dateOfBirth: -1,
        description: -1,
        fName: -1,
        gender: -1,
        isPrivate: -1,
        location: -1,
        personalSite: -1,
        email: -1,
        originalData: {},
        type: null,
        modalVisible: false,
    })

    const avatarURL: string = `http://${apiURL}/storage/${getState.originalData!?.username as User}/avatar/avatar.png?ab=${Date.now()}`;


    const openModal = (flag: boolean, type: ManageAccountState | null | string = null) => {
        if (flag === getState.modalVisible) {
            return
        }
        console.log(getState, "GETSTATE")
        setState({...getState, modalVisible: flag, type: type})
    }

    const onBackPress = () => {
        INavigation.goBack()
    }

    const getIsPrivate = (): string => getState.originalData.is_private ? 'Yes' : 'No';

    const STATE = {
        state: getState,
        setState,
        avatarURL,
        modalVisible: getState.modalVisible,
        openModal,
        getIsPrivate,
        onBackPress,
    }




    useMemo(() => {
        dispatch(actionImpl.getMe())
    }, [])


    useEffect(() => {
        setState({...getState, originalData: store.meReducer.data?.userData})
    }, [store.meReducer])


    return <ManageAccountComponent {...STATE} />
};

export default ManageAccountContainer;