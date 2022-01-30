import React from 'react';
import {Image, TouchableOpacity, View, Text, ImageSourcePropType} from "react-native";
import {images} from "../../assets/images";
import {StylesOne} from "../../Styles/StylesOne";
import {colors} from "../../Parts/colors";
import {SThree} from "../../Styles/StylesThree";
import {MP} from "../../Styles/MP";
import {BaseProps} from "../../Types/Types";
import {INavigation} from "../Core/OverrideNavigation";

type IProps = {
    icon: ImageSourcePropType;
    title: string;
    counter?: number;
    route?: string;
    onPress?(): void;
    isDisabled?: boolean;
} & BaseProps;


const LogoutSegment: React.FC<IProps> = (props: IProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mt20]}>
            <View style={[StylesOne.flex_row, StylesOne.flex_ai_c]}>
                <Image style={[StylesOne.image20, {tintColor: colors.Dark}]} source={props.icon} />
                <Text style={SThree.ListItemText}>{props.title}</Text>
            </View>
            <Image style={[StylesOne.image24, {tintColor: colors.Dark}]}  source={images.arrowRight} />
        </TouchableOpacity>
    );
};

export default LogoutSegment;