import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput, Alert} from "react-native";
import {images} from "../assets/images";
import {StylesOne} from "../Styles/StylesOne";
import {colors} from "../Parts/colors";
import {noGoBack, StackScreens} from "./Core/MainNavigationScreen";
import {MP} from "../Styles/MP";
import CheckBox from "@react-native-community/checkbox";
import { KeyboardAvoidingComponent } from "./Core/KeyboardAvoidingComponent";
import {useDispatch, useSelector} from "react-redux";
import {Register} from "../redux/actions";
import {BaseProps} from "../Types/Types";
import {Reducers} from "../redux/reducers/reducers";

type IProps = {} & BaseProps
 //dispatch(Register(username, email, password))
const SignUpComponent = (props: IProps) => {
    const dispatch = useDispatch()
    let state: any = useSelector<Reducers>(state => state.registerReducer);
    const [username, setUsername]: [string, Function] = useState("");
    const [email, setEmail]: [string,Function] = useState("");
    const [password, setPassword]: [string, Function] = useState("");
    const [cPassword, csetPassword]: [string, Function] = useState("");
    const [checkBox, setCheckBox]: [boolean, Function] = useState(false);
    const goBack = () => {
        props.navigation.goBack()
    }



    function onTermOfUserHandler() {
        console.log("onTermOfUserHandler");
    }


    const onSendBtnHandler = async () => {
        try {
            if (username.length < 2 || email.length < 2 || password.length < 2 || cPassword.length < 2) {
                Alert.alert("Something went wrong", "Incorrect data");
            } else {
                if (password !== cPassword) {
                    Alert.alert("Something went wrong", "Password mismatch")
                } else {
                    dispatch(Register(username, email, password))
                }
            }
        } catch (ex) {
            console.log('onSendBtnHandler ex', ex);
        }
    }

    useLayoutEffect(() => {
        console.log(state, 5427)
        if (state.statusCode === 200) {
            props.navigation.navigate(StackScreens.SetupAccount)
        } else if (state.statusCode === 208) {
            Alert.alert("Oops", "Something went wrong");
        }
    }, [state])


    noGoBack()
    return (
        <View>
    <View style={[StylesOne.flex_row, StylesOne.flex_jc_fs, StylesOne.flex_ai_c, MP.mv20, MP.ml20]}>
        <TouchableOpacity onPress={goBack} style={StylesOne.image24}>
            <Image style={[StylesOne.wh100,StylesOne.rm_c]} source={images.arrowLeft} />
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
                    <Image style={[StylesOne.whc_img100, {tintColor: checkBox ? 'black' : colors.inactive_btn}]} source={images.logo} />
                </View>
            </View>
            <View style={[StylesOne.inputContainer]}>
                <TextInput placeholder="Username"
                           placeholderTextColor={colors.Placeholder}
                           underlineColorAndroid={colors.Underline_rgba_black}
                           style={StylesOne.fontInputText_black}
                           onChangeText={(val) => setUsername(val)}
                />
                <TextInput placeholder="Email"
                           placeholderTextColor={colors.Placeholder}
                           underlineColorAndroid={colors.Underline_rgba_black}
                           style={StylesOne.fontInputText_black}
                           onChangeText={(val) => setEmail(val)}
                />
                <TextInput placeholder="Password"
                           placeholderTextColor={colors.Placeholder}
                           underlineColorAndroid={colors.Underline_rgba_black}
                           style={StylesOne.fontInputText_black}
                           onChangeText={(val) => setPassword(val)}
                           secureTextEntry={true}
                />
                <TextInput placeholder="Confirm password"
                           placeholderTextColor={colors.Placeholder}
                           underlineColorAndroid={colors.Underline_rgba_black}
                           style={StylesOne.fontInputText_black}
                           onChangeText={(val) => csetPassword(val)}
                           secureTextEntry={true}
                />
            </View>
            <View style={[StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
                <CheckBox disabled={false} value={checkBox} onValueChange={(val) => setCheckBox(val)} tintColors={{true: colors.Primary_Red, false: colors.Primary_Red}}/>
                <Text><Text style={[StylesOne.CheckBox_text]}>I agree to the </Text><Text onPress={onTermOfUserHandler} style={StylesOne.CheckBox_terms}>Terms of Use</Text></Text>
            </View>
            <View style={[StylesOne.flex_row, StylesOne.flex_jc_c]}>
                <TouchableOpacity onPress={onSendBtnHandler} disabled={!checkBox} style={[MP.mt40, checkBox ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
                    <Text style={[checkBox ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Send</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingComponent>
        </View>
    )
}


export default SignUpComponent