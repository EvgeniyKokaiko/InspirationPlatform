import React, {useState} from 'react'
import reducers from "../redux/reducers/reducers";
import {View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {backgrounds} from "../Styles/Backgrounds";
import {images} from "../assets/images";
import {fontSizeDP, mockupHeightToDP, mockupWidthToDP} from "../Parts/utils";
import {colors} from "../Parts/colors";
import {MP} from "../Styles/MP";

interface IProps {

}

const SignInComponent = (props: IProps) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
    <View style={[StylesOne.screenContainer, backgrounds.signIn_bg]}>
        <View style={{flexDirection: 'column', alignItems: "center", marginTop: mockupHeightToDP(50)}}>
        <View>
            <Text style={{fontSize: fontSizeDP(24), color: colors.SignIn_Font2}}>Welcome to</Text>
        </View>
            <View style={{marginBottom: mockupHeightToDP(-50)}}>
                <Text style={StylesOne.fontLogo}>Valhalla</Text>
            </View>
            <View style={{width: mockupWidthToDP(200), height: mockupWidthToDP(200)}}>
                <Image style={{width: "100%", height: "100%", resizeMode: 'contain'}} source={images.logo} />
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
        />
        </View>
        <View style={[StylesOne.w100, StylesOne.flex_column ,StylesOne.flex_ai_c]}>
            <TouchableOpacity style={[StylesOne.SignInButton, StylesOne.shadowRed, ]}>
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
            <TouchableOpacity>
                <Text style={StylesOne.SignIn_textStyle}>Sign up</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    )
}


export default SignInComponent