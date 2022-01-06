import React, {useEffect} from 'react';
import UserProfileComponent from "../AdditionScreens/UserProfileComponent";
import {BaseProps} from "../../Types/Types";

type IProps = {} & BaseProps

const UserProfileContainer = (props: IProps) => {
    const ownerId = props.route.params.ownerId
    console.log(ownerId)

    const STATE = {
        ownerId
    }


    useEffect(() => {

    }, [ownerId])

    return <UserProfileComponent {...STATE} />
};

export default UserProfileContainer;