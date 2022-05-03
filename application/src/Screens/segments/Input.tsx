import React, { useState } from 'react';
import {Image, TextInput, View} from "react-native";
import {images} from "../../assets/images";
import {St} from "../../Styles/StylesTwo";
import {StylesOne} from "../../Styles/StylesOne";
import {backgrounds} from "../../Styles/Backgrounds";
import {MP} from "../../Styles/MP";
import {mockupHeightToDP} from "../../Parts/utils";
import { Node } from '@babel/types';

type IProps = {
    currentValue?: string;
    onChange(e: any): void;
    placeholder: string;
    debounced: boolean;
}

type IState = {
    searchValue: string;
};

const Input: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [getState, setState] = useState<IState>({
        searchValue: '',
    })
    let timer: null | NodeJS.Timeout = null;


    const onChange = (value: string) => {
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

    return (
        <View style={[StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.searchPane]}>
            <Image style={[St.image20, MP.mr10]} source={images.search} />
            <TextInput
                style={StylesOne.searchPane_input}
                onChangeText={onChange}
                placeholder={props.placeholder}
                maxLength={500}
                multiline={false}
            />
        </View>
    );
};

export default Input;