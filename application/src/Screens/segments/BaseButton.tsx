import React, {useCallback, useEffect, useState} from 'react';
import {StylesOne} from "../../Styles/StylesOne";
import {backgrounds} from "../../Styles/Backgrounds";
import {Image, ImageSourcePropType, Text, TouchableOpacity, View} from "react-native";


type IProps = {
    onPress?(): void
    title?: string;
    icon: ImageSourcePropType
    disabled: boolean;
}

const BaseButton = (props: IProps) => {
    const onPress = useCallback(() => {
        props.onPress!()
        console.log('adasdasd')
    }, [props.onPress])

    return (
        <TouchableOpacity disabled={props.disabled} onPress={onPress} style={[StylesOne.SignInButton, props.disabled ? backgrounds.preloader : backgrounds.addPost]}>
            <View style={[StylesOne.flexCenter, StylesOne.h100]}>
                <Text style={StylesOne.SignIn_textStyle}>{props.title}</Text>
                <Image style={StylesOne.SignIn_image} source={props.icon} />
            </View>
        </TouchableOpacity>
    );
};

export default BaseButton;