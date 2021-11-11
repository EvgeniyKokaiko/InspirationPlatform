import React from 'react';
import {BaseProps} from "../Types/Types";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {goBack, noGoBack} from "./Core/MainNavigationScreen";
import {StylesOne} from "../Styles/StylesOne";
import {MP} from "../Styles/MP";
import {images} from "../assets/images";
import {St} from "../Styles/StylesTwo";
import {backgrounds} from "../Styles/Backgrounds";

type IProps = BaseProps & {}

const UserProfileComponent: React.FC<IProps> = (props: IProps) => {
    noGoBack()


    return (
        <View style={[StylesOne.screenContainer, MP.ph25]}>
            <View style={[StylesOne.w100]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
                    <TouchableOpacity onPress={() => {/*goBack(props.navigation)*/}} style={StylesOne.image24}>
                        <Image style={[StylesOne.wh100,StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[StylesOne.image24]}>
                        <Image style={[StylesOne.wh100,StylesOne.rm_c, St.blackArrow]} source={images.burgerBtn} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[MP.mt20, StylesOne.w100, St.h190, St.borderRadius30, backgrounds.myProfileBlocks]}>

            </View>
        </View>
    )
}



export default UserProfileComponent