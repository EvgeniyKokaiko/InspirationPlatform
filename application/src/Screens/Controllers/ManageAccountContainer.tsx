import React, {useEffect, useMemo, useState} from 'react';
import {Alert, View} from "react-native";
import ManageAccountComponent from "../ManageAccountComponent";
import {ImagePickerResponse, launchImageLibrary} from "react-native-image-picker";
import {actionImpl, apiURL} from "../../redux/actions";
import {User} from "../../Types/Models";
import {useDispatch, useSelector} from "react-redux";
import {INavigation} from "../Core/OverrideNavigation";

type IProps = {}
export type ManageAccountState = {
    avatar: ImagePickerResponse | number;
    originalData: User | any;
    type: ManageAccountState | null | string;
    modalVisible: boolean;
}

const ManageAccountContainer: React.FC<ManageAccountState> = (props: IProps) => {
    const dispatch = useDispatch()
    const store: any = useSelector(state => state);
    const [getState, setState] = useState<ManageAccountState>({
        avatar: -1,
        originalData: {},
        type: null,
        modalVisible: false,
    })

    const avatarURL: string = `http://${apiURL}/storage/${getState.originalData!?.username as User}/avatar/avatar.png?ab=${Date.now()}`;


    const openModal = (flag: boolean, type: ManageAccountState | null | string = null) => {
        if (flag === getState.modalVisible) {
            return
        }
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