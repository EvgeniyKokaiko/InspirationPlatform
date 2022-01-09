import React from 'react';
import {Image, TouchableOpacity, View, Text, ImageSourcePropType} from "react-native";
import {images} from "../../assets/images";
import {StylesOne} from "../../Styles/StylesOne";
import {colors} from "../../Parts/colors";
import {SThree} from "../../Styles/StylesThree";
import {MP} from "../../Styles/MP";
import {BaseProps} from "../../Types/Types";

type IProps = {
    icon: ImageSourcePropType;
    title: string;
    counter?: number;
    route?: string;
    onPress?(): void;
    isDisabled?: boolean;
} & BaseProps;


const ListItem: React.FC<IProps> = (props: IProps) => {
    function onItemPress() {
        props.navigation.navigate(props.route)
    }

    return (
        <TouchableOpacity disabled={props.isDisabled} onPress={props.route ? onItemPress : props.onPress} style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mt20]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_ai_c]}>
                    <Image style={[StylesOne.image20, {tintColor: colors.Dark}]} source={props.icon} />
                    <Text style={SThree.ListItemText}>{props.title}</Text>
                </View>
            <Image style={[StylesOne.image24, {tintColor: colors.Dark}]}  source={images.arrowRight} />
        </TouchableOpacity>
    );
};

export default ListItem;