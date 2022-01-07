import React, {useEffect} from 'react';
import UserProfileComponent from "../AdditionScreens/UserProfileComponent";
import {BaseProps} from "../../Types/Types";
import {useDispatch, useSelector} from "react-redux";

type IProps = {} & BaseProps

const UserProfileContainer = (props: IProps) => {
    const ownerId = props.route.params.ownerId
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    console.log(ownerId)



    const STATE = {
        ownerId
    }


    useEffect(() => {

    }, [ownerId])

    return <UserProfileComponent {...STATE} />
};

export default UserProfileContainer;