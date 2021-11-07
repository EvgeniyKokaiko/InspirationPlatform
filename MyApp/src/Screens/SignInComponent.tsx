import React, {useEffect, useState} from 'react'
import reducers from "../redux/reducers/reducers";
import {View, Text, Image, TextInput, TouchableOpacity, BackHandler} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {backgrounds} from "../Styles/Backgrounds";
import {images} from "../assets/images";
import {fontSizeDP, mockupHeightToDP, mockupWidthToDP} from "../Parts/utils";
import {colors} from "../Parts/colors";
import {MP} from "../Styles/MP";
import {KeyboardAvoidingComponent} from "./Core/KeyboardAvoidingComponent";
import {NavigationAction, NavigationProp} from "@react-navigation/native";
import {StackScreens} from "./Core/MainNavigationScreen";

interface IProps {
    navigation: any
}

const SignInComponent = (props: IProps) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return false;
        })
    }, [])

    const goToSignUpScreen = () => {
        props.navigation.navigate(StackScreens.SignUp);
    }



    return (
    <View style={[StylesOne.screenContainer, backgrounds.signIn_bg]}>
        <KeyboardAvoidingComponent>
        <View style={[StylesOne.flex_column, StylesOne.flex_ai_c, MP.mt50]}>
        <View>
            <Text style={StylesOne.logoAddition}>Welcome to</Text>
        </View>
            <View style={MP.mbminus50}>
                <Text style={StylesOne.fontLogo}>Valhalla</Text>
            </View>
            <View style={StylesOne.wh200px}>
                <Image style={StylesOne.whc_img100} source={images.logo} />
            </View>
        </View>
        <View style={StylesOne.inputContainer}>
        <TextInput onChangeText={(value) => setLogin(value)}
                   placeholder="Email"
                   placeholderTextColor={colors.Placeholder}
                   underlineColorAndroid={colors.Underline_rgba}
                   style={StylesOne.fontInputText}
        />
        <TextInput onChangeText={(value) => setPassword(value)}
                   placeholder="Password"
                   placeholderTextColor={colors.Placeholder}
                   underlineColorAndroid={colors.Underline_rgba}
                   style={StylesOne.fontInputText}
                   secureTextEntry={true}
        />
        </View>
        <View style={[StylesOne.w100, StylesOne.flex_column ,StylesOne.flex_ai_c]}>
            <TouchableOpacity style={[StylesOne.SignInButton, StylesOne.shadowRed]}>
                <View style={[StylesOne.flexCenter, StylesOne.h100]}>
                    <Text style={StylesOne.SignIn_textStyle}>Sign in</Text>
                    <Image style={StylesOne.SignIn_image} source={images.arrowRight} />
                </View>
            </TouchableOpacity>
           <TouchableOpacity style={[MP.mv40]}>
               <Text style={[StylesOne.ForgotBtn]}>Forgot password?</Text>
           </TouchableOpacity>
        </View>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_c]}>
            <View style={StylesOne.flex_row}>
            <Text style={[MP.mr15, StylesOne.PlainText]}>Don’t have an account?</Text>
            <TouchableOpacity onPress={goToSignUpScreen}>
                <Text style={StylesOne.SignIn_textStyle}>Sign up</Text>
            </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingComponent>
    </View>
    )
}


export default SignInComponent