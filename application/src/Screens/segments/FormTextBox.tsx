import React, { useState } from 'react';
import {Image, ImageSourcePropType, Text, TextInput, TouchableOpacity, TouchableOpacityBase, View} from "react-native";
import {images} from "../../assets/images";
import {St} from "../../Styles/StylesTwo";
import {StylesOne} from "../../Styles/StylesOne";
import {backgrounds} from "../../Styles/Backgrounds";
import {MP} from "../../Styles/MP";
import {mockupHeightToDP} from "../../Parts/utils";
import { Node } from '@babel/types';

export type FormTextBoxProps = {
    currentValue?: string;
    onChange?(e: any): void;
    placeholder?: string;
    debounced?: boolean;
    style?: {
        container?: {};
        input?: {};
        button?: {};
        buttonText?: {};
    }
    buttonLabel?: string;
    leftIcon?: ImageSourcePropType;
    maxLength?: number;
    multiline?: boolean;
    onButtonPress?(inputValue: string): void;
    returnKeyLabel?: string;
    autoCapitalize?: "none" | "sentences" | "words";
    editable?: boolean;
    onFocus?(): void;
    onBlur?(): void;
    placeholderColor?: string;
    activeOpacity?: number;
    clearOnPress?: boolean;
    underline?: string;
}

type IState = {
    searchValue: string;
};

const FormTextBox: React.FC<FormTextBoxProps> = (props: FormTextBoxProps): JSX.Element => {
    const [getState, setState] = useState<IState>({
        searchValue: '',
    })
    let timer: null | NodeJS.Timeout = null;


    const onChange = (value: string) => {
        setState({...getState, searchValue: value})
        if (props.debounced) {
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
              }
              timer = setTimeout(async () => {
                props.onChange && props.onChange(value);
              }, 300);
        } else {
            props.onChange && props.onChange(value);
        }
       
    }

    const onButtonPress = () => {
        props.onButtonPress && props.onButtonPress(getState.searchValue)
        if (props.clearOnPress) {
            setState({...getState, searchValue: ''})
        }
    }

    const containerStyles = props.style?.container !== void 0 ? props.style.container : {}
    const inputStyles = props.style?.input !== void 0 ? props.style.input : {}
    const buttonStyles = props.style?.button !== void 0 ? props.style.button : {}
    const buttonTextStyles = props.style?.buttonText !== void 0 ? props.style.buttonText : {}
    return (
        <View style={[StylesOne.flex_row, StylesOne.flex_ai_c, containerStyles]}>
            {props.leftIcon && <Image style={[St.image20, MP.mr10]} source={images.search} />}
            <TextInput
                style={inputStyles}
                onChangeText={onChange}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                multiline={props.multiline}
                returnKeyLabel={props.returnKeyLabel}
                autoCapitalize={props.autoCapitalize}
                editable={props.editable}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                placeholderTextColor={props.placeholderColor}
                value={getState.searchValue}
                underlineColorAndroid={props.underline}
            />
            {props.buttonLabel && (
                <TouchableOpacity activeOpacity={props.activeOpacity} style={buttonStyles} onPress={onButtonPress}>
                    <Text style={buttonTextStyles}>{props.buttonLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export {FormTextBox};