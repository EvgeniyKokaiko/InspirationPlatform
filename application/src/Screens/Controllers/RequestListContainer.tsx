import React, {useCallback, useEffect, useState} from "react";
import {View, Text} from "react-native";
import {BaseProps} from "../../Types/Types";
import RequestListComponent from "../RequestListComponent";
import {actionImpl} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {Requests} from "../../Types/Models";
import {StackScreens} from "../Core/MainNavigationScreen";
import {INavigation} from "../Core/OverrideNavigation";

interface IProps extends BaseProps {

}
type IState = {
    requestList: Requests[];
    refresh: boolean;
    currentIndex: number;
}

const RequestListContainer: React.FC<IProps> = (props) => {
    const dispatch = useDispatch()
    const store: any = useSelector<any>(state => state)
    const [getState, setState] = useState<IState>({
        requestList: [],
        refresh: false,
        currentIndex: -1,
    })

    const onBackBtn = () => {
        INavigation.goBack()
    };

    const onAcceptOrDeclinePress = (subscriber: string, status: boolean, index: number) => {
        dispatch(actionImpl.acceptOrDeclineRequest(status, subscriber))
        setState({...getState, currentIndex: index})
    }

    const onRefresh = useCallback(() => {
        dispatch(actionImpl.getRequestList())
    }, [])

    const STATE = {
        onRefresh,
        refresh:getState.refresh,
        onBackBtn,
        data: getState.requestList,
        onAcceptOrDeclinePress,
    }


    useEffect(() => {
        dispatch(actionImpl.getRequestList())
    }, [])

    useEffect(() => {
        let currentStatus = store.currentRequestStatus
        if (currentStatus !== void 0 && currentStatus.statusCode === 200) {
                let currentList = getState.requestList
                setState({...getState, requestList: currentList.filter((el , index)=> index !== getState.currentIndex), currentIndex: -1})

        }
    }, [store.currentRequestStatus])

    useEffect(() => {
        if (store.requestListReducer?.statusCode === 200) {
            setState({...getState, requestList: store.requestListReducer.data})
        } else {
            setState({...getState, requestList: []})
        }
    }, [store.requestListReducer, onRefresh])

    return <RequestListComponent {...STATE} />
}


export default RequestListContainer