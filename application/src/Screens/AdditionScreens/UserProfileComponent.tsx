import React from 'react';
import {View, Text} from "react-native";

type IProps = {
    ownerId: string;
}

const UserProfileComponent = (state: IProps) => {
    return (
       <View>
           <Text>Bebra</Text>
           <Text style={{backgroundColor: 'black'}}>{state.ownerId}</Text>
       </View>
    );
};

export default UserProfileComponent;