import React from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {MP} from "../Styles/MP";
import {St} from "../Styles/StylesTwo";
import {images} from "../assets/images";
import {INavigation} from "./Core/OverrideNavigation";
import {StylesFour} from "../Styles/StylesFour";
import {backgrounds} from "../Styles/Backgrounds";

const AboutUserComponent = () => {
    const presentationInfo = 'https://docs.google.com/presentation/d/1oTseM07jmNrGm5SZvO-G40vopKKocAvx/edit?usp=sharing&ouid=112719819097889407242&rtpof=true&sd=true'

    const onBackBtn = () => {
        INavigation.goBack()
    }


    const onDetailsPress = () => {
        try {
            Linking.openURL(presentationInfo);
        } catch (ex) {

        }
    }

    const text = `
        Hello, this is Valhalla!
        Social Media for artists.
        Developed by Kokayko Eugene aka re1nhart
        All rights are reserved.
         © COPYRIGHT VALHALLA.
    `

    return (
        <View style={[StylesOne.screenContainer, backgrounds.signIn_bg, MP.ph15]}>
            <View style={[StylesOne.w100]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>

                    <View></View>
                </View>
            </View>
            <View style={[StylesOne.flex_column, StylesOne.flex_jc_sb, MP.pb15, StylesOne.h80]}>
                <View>
                    <View style={[StylesOne.flex_column, StylesOne.flex_ai_c, MP.mt50]}>
                        <View>
                            <Text style={StylesOne.logoAddition}>About</Text>
                        </View>
                        <View style={MP.mbminus50}>
                            <Text style={StylesOne.fontLogo}>Valhalla</Text>
                        </View>
                        <View style={StylesOne.wh200px}>
                            <Image style={StylesOne.whc_img100} source={images.logo} />
                        </View>
                    </View>
                    <Text style={StylesOne.AboutText}>
                        {text}
                    </Text>
                </View>
                <View style={[StylesOne.flexCenter]}>
                    <TouchableOpacity onPress={onDetailsPress} style={[MP.mv40]}>
                        <Text style={[StylesOne.ForgotBtn]}>DETAILS</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onBackBtn} style={[StylesOne.SignInButton, StylesOne.shadowRed, StylesOne.w100]}>
                    <View style={[StylesOne.flexCenter, StylesOne.h100]}>
                        <Text style={StylesOne.SignIn_textStyle}>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    );
};

export { AboutUserComponent };