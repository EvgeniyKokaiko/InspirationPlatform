import React, {RefObject, useEffect, useLayoutEffect, useState} from 'react'
import reducers, {Reducers} from "../redux/reducers/reducers";
import {View, Text, Image, TextInput, TouchableOpacity, BackHandler, Alert} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {backgrounds} from "../Styles/Backgrounds";
import {images} from "../assets/images";
import {fontSizeDP, mockupHeightToDP, mockupWidthToDP} from "../Parts/utils";
import {colors} from "../Parts/colors";
import {MP} from "../Styles/MP";
import {KeyboardAvoidingComponent} from "./Core/KeyboardAvoidingComponent";
import {StackScreens} from "./Core/MainNavigationScreen";
import {BaseProps} from "../Types/Types";
import { useDispatch, useSelector } from "react-redux";
import {Authorize, Clear} from "../redux/actions/index"
import AsyncStorage from "@react-native-async-storage/async-storage";


type IProps = {} & BaseProps

const SignInComponent = (props: IProps) => {
    const [auth, setAuth]: [{login: string, password: string}, Function] = useState({
        login: '',
        password: '',
    });
    const dispatch = useDispatch();
    const state: any = useSelector<Reducers>(state => state)



    const Login = () => {
        if (auth.login.length > 2 || auth.password.length > 2) {
            return  dispatch(Authorize(auth.login, auth.password));
        }
        //зробити красним цветом штуку
    }


    const goToSignUpScreen = () => {
        props.navigation.navigate(StackScreens.SignUp);
    }


    useLayoutEffect( () => {
        //TODO переделать всю эту логику в сплеш скрин.
        console.log(state.loginReducer, state.loginReducer.statusCode)
        if (state.loginReducer.statusCode === 200) {
          AsyncStorage.setItem("Access_TOKEN", state.loginReducer.data).then(() => {
              dispatch(Clear())
              setAuth({login: '', password: ''});
              props.navigation.navigate(StackScreens.UserProfile)
          })
        } else if (state.loginReducer.statusCode === 208) {
           //тоже зробити красним подсветку
        }
    }, [Login])



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
        <TextInput onChangeText={(value) => setAuth({...auth, login: value})}
                   placeholder="Username"
                   value={auth.login}
                   placeholderTextColor={colors.Placeholder}
                   underlineColorAndroid={colors.Underline_rgba}
                   style={StylesOne.fontInputText}
        />
        <TextInput onChangeText={(value) => setAuth({...auth, password: value})}
                   placeholder="Password"
                   value={auth.password}
                   placeholderTextColor={colors.Placeholder}
                   underlineColorAndroid={colors.Underline_rgba}
                   style={StylesOne.fontInputText}
                   secureTextEntry={true}
        />
        </View>
        <View style={[StylesOne.w100, StylesOne.flex_column ,StylesOne.flex_ai_c]}>
            <TouchableOpacity onPress={Login} style={[StylesOne.SignInButton, StylesOne.shadowRed]}>
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