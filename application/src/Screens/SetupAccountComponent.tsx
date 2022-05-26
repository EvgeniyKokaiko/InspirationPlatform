import React, { useEffect, useLayoutEffect, useState } from "react"
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StylesOne } from "../Styles/StylesOne";
import { BaseProps } from "../Types/Types";
import { MP } from "../Styles/MP";
import { images } from "../assets/images";
import { colors } from "../Parts/colors";
import { Picker } from "@react-native-picker/picker";
import { actionImpl } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../redux/reducers/reducers";
import { StackScreens } from "./Core/MainNavigationScreen";
import { INavigation } from "./Core/OverrideNavigation";
import { registerState } from "./RegisterComponent";
import DatePicker from "react-native-date-picker";

type IProps = {
    scrollToIndex(index: number): void;
    pipeState: {
        getter: registerState;
        setter: React.Dispatch<React.SetStateAction<registerState>>
    }
    onRegisterPress(): void;
} & BaseProps

const SetupAccountComponent: React.FC<IProps> = ({ scrollToIndex, pipeState, onRegisterPress }): JSX.Element => {
    const { getter, setter } = pipeState



    // useEffect(() => {
    //     if (state.setupReducer.statusCode === 200) {
    //         INavigation.erase(true)
    //         INavigation.navigate(StackScreens.SignIn)
    //         dispatch(actionImpl.clear())
    //     } else if (state.statusCode === 208) {
    //         Alert.alert("Oops", "Something went wrong");
    //     }
    // }, [state.setupReducer])


    async function registerUser() {
        try {
            const { about, birth, cPassword, checkbox, email, fName, gender, location, name, password, refer, site } = getter
            if (email === ' ' || email === '' ) {
                Alert.alert("Warning! Email can not be empty");
                return;
            }
            if (fName === ' ' || fName === '') {
                Alert.alert("Warning! Full Name can not be empty");
                return;
            }
            if (gender === ' ' || gender === '') {
                Alert.alert("Warning! Gender can not be empty");
                return;
            }
            if (location === ' ' || location === '') {
                Alert.alert("Warning! Location can not be empty");
                return;
            }
            if (name === ' ' || name === '') {
                Alert.alert("Warning! Username can not be empty");
                return;
            }
            if (password === ' ' || password === '') {
                Alert.alert("Warning! Password can not be empty");
                return;
            }
           await onRegisterPress && onRegisterPress()
        } catch (ex) {

        }
    }



    return (
        <View style={StylesOne.wh_device}>
            <View style={[StylesOne.flex_row, StylesOne.flex_jc_fs, StylesOne.flex_ai_c, MP.mv20]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.w100]}>
                    <Text style={StylesOne.CheckBox_text}>Setup Account</Text>
                </View>
            </View>
            <View style={[StylesOne.inputContainer]}>
                <View style={[MP.mv20, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c]}>
                </View>
                <TextInput placeholder="Email"
                    placeholderTextColor={colors.Placeholder}
                    underlineColorAndroid={colors.Underline_rgba_black}
                    style={StylesOne.fontInputText_black}
                    onChangeText={(val) => setter({ ...getter, email: val })}
                    value={getter.email}
                />
                <TextInput placeholder="Full name"
                    placeholderTextColor={colors.Placeholder}
                    underlineColorAndroid={colors.Underline_rgba_black}
                    style={StylesOne.fontInputText_black}
                    onChangeText={(val) => setter({ ...getter, fName: val })}
                    value={getter.fName}
                />
                <TextInput placeholder="Location"
                    placeholderTextColor={colors.Placeholder}
                    underlineColorAndroid={colors.Underline_rgba_black}
                    style={StylesOne.fontInputText_black}
                    onChangeText={(val) => setter({ ...getter, location: val })}
                    value={getter.location}
                />
                <TextInput placeholder="About yourself"
                    placeholderTextColor={colors.Placeholder}
                    underlineColorAndroid={colors.Underline_rgba_black}
                    style={StylesOne.fontInputText_black}
                    onChangeText={(val) => setter({ ...getter, about: val })}
                    value={getter.about}
                />
                <TextInput placeholder="Personal site"
                    placeholderTextColor={colors.Placeholder}
                    underlineColorAndroid={colors.Underline_rgba_black}
                    style={StylesOne.fontInputText_black}
                    onChangeText={(val) => setter({ ...getter, site: val })}
                    value={getter.site}
                />
                {/* <DatePicker
                    style={[StylesOne.w100, {backgroundColor: 'transparent'}]}
                    mode={'date'}
                    date={new Date()}
                    onDateChange={(val) => {
                    setter({ ...getter, birth: `${val.getTime()}` });
                    }}
                /> */}
                <View style={[StylesOne.DropdownStyles]}>
                    <Picker selectedValue={getter.gender}
                        onValueChange={(val, itemIndex) =>
                            setter({ ...getter, gender: val })}
                        dropdownIconColor={colors.SignIn_Font}
                        itemStyle={StylesOne.fontInputText_black}
                        dropdownIconRippleColor={colors.SignIn_BG}
                        mode="dropdown">
                        <Picker.Item style={StylesOne.fontInputText_dd} label="Male" value="Male" />
                        <Picker.Item style={StylesOne.fontInputText_dd} label="Female" value="Female" />
                        <Picker.Item style={StylesOne.fontInputText_dd} label="Unrecognized" value="Unrecognized" />
                        <Picker.Item style={StylesOne.fontInputText_dd} label="Digigender" value="Digigender" />
                    </Picker>
                    <View style={StylesOne.borderBottom} />
                </View>
                <View style={[MP.mt50, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c]}>
                    <TouchableOpacity onPress={registerUser} style={[StylesOne.SignInButton, StylesOne.shadowRed]}>
                        <View style={[StylesOne.flexCenter, StylesOne.h100]}>
                            <Text style={StylesOne.SignIn_textStyle}>Sign Up</Text>
                            <Image style={StylesOne.SignIn_image} source={images.arrowRight} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default SetupAccountComponent