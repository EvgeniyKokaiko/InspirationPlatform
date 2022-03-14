import React from "react"
import {Image, ImageSourcePropType, View} from "react-native";
import {St} from "../../Styles/StylesTwo";
import {StylesOne} from "../../Styles/StylesOne";
import {mockupHeightToDP, mockupWidthToDP} from "../../Parts/utils";
import {backgrounds} from "../../Styles/Backgrounds";

type IProps = {
    size: number
    icon: any
}

const Avatar: React.FC<IProps> = (props: IProps) => {
    return (
        <View style={[props.size ? {width: mockupWidthToDP(props.size), height: mockupWidthToDP(props.size)} : {}, St.avatar]}>
             <Image style={[StylesOne.wh100,St.borderRadius14]} source={props.icon} />
        </View>
    )
}


export default Avatar