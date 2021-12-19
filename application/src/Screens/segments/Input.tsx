import React from 'react';
import {Image, TextInput, View} from "react-native";
import {images} from "../../assets/images";
import {St} from "../../Styles/StylesTwo";
import {StylesOne} from "../../Styles/StylesOne";
import {backgrounds} from "../../Styles/Backgrounds";
import {MP} from "../../Styles/MP";
import {mockupHeightToDP} from "../../Parts/utils";

type IProps = {
    currentValue: string;
    onChange(e: any): void
    placeholder: string
}

const Input: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <View style={[StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.searchPane]}>
            <Image style={[St.image20, MP.mr10]} source={images.search} />
            <TextInput
                style={StylesOne.searchPane_input}
                value={props.currentValue}
                onChangeText={props.onChange}
                placeholder={props.placeholder}
            />
        </View>
    );
};

export default Input;