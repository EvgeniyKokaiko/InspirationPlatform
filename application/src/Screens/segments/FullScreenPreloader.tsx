import React from 'react';
import {ActivityIndicator, View} from "react-native";
import {St} from "../../Styles/StylesTwo";
import {mockupWidthToDP} from "../../Parts/utils";
import {backgrounds} from "../../Styles/Backgrounds";

const FullScreenPreloader = () => {
    return (
       <View style={[St.FullScreenPreloader,  backgrounds.signIn_bg]}>
           <ActivityIndicator size={mockupWidthToDP(60)} color={'white'} />
       </View>
    );
};

export default FullScreenPreloader;