import React, { useState } from "react"
import {ActivityIndicator, Image, ImageSourcePropType, ImageURISource, View} from "react-native";
import {St} from "../../Styles/StylesTwo";
import {StylesOne} from "../../Styles/StylesOne";
import {mockupHeightToDP, mockupWidthToDP} from "../../Parts/utils";
import {backgrounds} from "../../Styles/Backgrounds";
import { images } from "../../assets/images";
import { colors } from "../../Parts/colors";
import { StylesFour } from "../../Styles/StylesFour";

type IProps = {
    size: number;
    icon: any;
}

type IState = {
    isLoading: boolean;
};
//peredelati na norm component
const Avatar: React.FC<IProps> = (props: IProps) => {
    const [getState, setState] = useState<IState>({
        isLoading: false,
    })

    const onLoadStart = () => {
        setState({...getState, isLoading: true})
    }

    const onLoadEnd = () => {
        setState({...getState, isLoading: false})
    }

    const onError = () => {
        setState({...getState, isLoading: false})
    }

    return (
        <View style={[props.size ? {width: mockupWidthToDP(props.size), height: mockupWidthToDP(props.size)} : {}, St.avatar]}>
            {getState.isLoading && <View style={[StylesOne.wh100, StylesOne.absolute, St.zIndex999, StylesOne.flexCenter, backgrounds.addPost, St.borderRadius14]}><ActivityIndicator size={20} color={colors.PurpleRed} /></View>}
             <Image onLoadStart={onLoadStart} onLoadEnd={onLoadEnd} onError={onError} defaultSource={images.standartAvatar as ImageURISource} style={[StylesOne.wh100,St.borderRadius14]} source={props.icon} />
        </View>
    )
}


export default Avatar