import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Alert, LayoutAnimation, Pressable } from "react-native";
import { images } from "../assets/images";
import { StylesOne } from "../Styles/StylesOne";
import { colors } from "../Parts/colors";
import { noGoBack, StackScreens } from "./Core/MainNavigationScreen";
import { MP } from "../Styles/MP";
import CheckBox from "@react-native-community/checkbox";
import { KeyboardAvoidingComponent } from "./Core/KeyboardAvoidingComponent";
import { useDispatch, useSelector } from "react-redux";
import { actionImpl } from "../redux/actions";
import { BaseProps } from "../Types/Types";
import { Reducers } from "../redux/reducers/reducers";
import { INavigation } from "./Core/OverrideNavigation";
import { registerState } from "./RegisterComponent";

type IProps = {
    scrollToIndex(index: number): void;
    pipeState: {
        getter: registerState;
        setter: React.Dispatch<React.SetStateAction<registerState>>
    }
} & BaseProps
//dispatch(Register(username, email, password))
const SignUpComponent: React.FC<IProps> = ({ scrollToIndex, pipeState }) => {
    const { getter, setter } = pipeState
    const [getState, setState] = useState<boolean>(true);
    const goBack = () => {
        INavigation.navigate(StackScreens.SignIn);
    }

    function onShowPasswordPress() {
        setState((prev) => !prev)
    }

    function onTermOfUserHandler() {
        Alert.alert('Be carefully on using this app :)')
    }


    const onSendBtnHandler = async () => {
        try {
            const username = getter.name;
            const password = getter.password;
            const cPassword = getter.cPassword;
            if (username.length <= 6) {
                Alert.alert("Warning!", "Invalid username! Username should be longer than 6 symbols")
                return;
            }
            if (password.length <= 8) {
                Alert.alert("Warning!", "Invalid password! Password should be longer than 8 symbols")
                return;
            }
            if (password.trim() !== cPassword.trim()) {
                Alert.alert("Warning!", "Invalid password! Passwords are not similar!")
                return;
            }
            scrollToIndex(1);
        } catch (ex) {
            console.log('onSendBtnHandler ex', ex);
        }
    }

    const onCheckBoxPress = (val: boolean) => {
        LayoutAnimation.configureNext(LayoutAnimation.create(250, 'linear', 'opacity'));
        setter({ ...getter, checkbox: val })
    }

    return (
        <View style={StylesOne.wh_device}>
            <View style={[StylesOne.flex_row, StylesOne.flex_jc_fs, StylesOne.flex_ai_c, MP.mv20, MP.ml20]}>
                <TouchableOpacity onPress={goBack} style={StylesOne.image24}>
                    <Image style={[StylesOne.wh100, StylesOne.rm_c]} source={images.arrowLeft} />
                </TouchableOpacity>
                <View style={[StylesOne.flex_jc_c, MP.ml130]}>
                    <Text style={StylesOne.CheckBox_text}>Sign up</Text>
                </View>
            </View>
            <KeyboardAvoidingComponent>
                <View style={[StylesOne.flex_column, StylesOne.flex_ai_c]}>
                    <View style={MP.mbminus50}>
                        <Text style={StylesOne.fontLogo_black}>Valhalla</Text>
                    </View>
                    <View style={[StylesOne.wh200px, MP.mbminus50]}>
                        <Image style={[StylesOne.whc_img100, { tintColor: getter.checkbox ? 'black' : colors.inactive_btn }]} source={images.logo} />
                    </View>
                </View>
                <View style={[StylesOne.inputContainer]}>
                    <TextInput placeholder="Username"
                        placeholderTextColor={colors.Placeholder}
                        underlineColorAndroid={colors.Underline_rgba_black}
                        style={StylesOne.fontInputText_black}
                        onChangeText={(val) => setter({ ...getter, name: val })}
                        value={getter.name}
                    />
                    <TextInput placeholder="Password"
                        placeholderTextColor={colors.Placeholder}
                        underlineColorAndroid={colors.Underline_rgba_black}
                        style={StylesOne.fontInputText_black}
                        onChangeText={(val) => setter({ ...getter, password: val })}
                        value={getter.password}
                        secureTextEntry={getState}
                    />
                    <TextInput placeholder="Confirm password"
                        placeholderTextColor={colors.Placeholder}
                        underlineColorAndroid={colors.Underline_rgba_black}
                        style={StylesOne.fontInputText_black}
                        onChangeText={(val) => setter({ ...getter, cPassword: val })}
                        value={getter.cPassword}
                        secureTextEntry={getState}
                    />
                </View>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
                    <CheckBox disabled={false} value={getter.checkbox} onValueChange={onCheckBoxPress} tintColors={{ true: colors.Primary_Red, false: colors.Primary_Red }} />
                    <Text><Text style={[StylesOne.CheckBox_text]}>I agree to the </Text><Text onPress={onTermOfUserHandler} style={StylesOne.CheckBox_terms}>Terms of Use</Text></Text>
                </View>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_c]}>
                    <TouchableOpacity onPress={onSendBtnHandler} disabled={!getter.checkbox} style={[MP.mt40, getter.checkbox ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
                        <Text style={[getter.checkbox ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Check</Text>
                    </TouchableOpacity>
                </View>
                    <Pressable hitSlop={20} style={MP.mt20} onPress={onShowPasswordPress}><Text  style={[StylesOne.CheckBox_pass]}>Show Password</Text></Pressable>

            </KeyboardAvoidingComponent>
        </View>
    )
}


export default SignUpComponent