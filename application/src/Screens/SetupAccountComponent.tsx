import React, {useLayoutEffect, useState} from "react"
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {BaseProps} from "../Types/Types";
import {MP} from "../Styles/MP";
import {images} from "../assets/images";
import {colors} from "../Parts/colors";
import {Picker} from "@react-native-picker/picker";
import {actionImpl} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {Reducers} from "../redux/reducers/reducers";
import {StackScreens} from "./Core/MainNavigationScreen";
import {INavigation} from "./Core/OverrideNavigation";

type IProps = {} & BaseProps

const SetupAccountComponent: React.FC<IProps> = (props): JSX.Element => {
    const dispatch = useDispatch();
    const state: any = useSelector<Reducers>(state => state)
    const [gender, setGender] = useState("Male");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");


    const onSetupHandler = () => {
        try {
            if (name.length < 2 || location.length < 2 || description.length < 2) {
                Alert.alert("Something went wrong", "Incorrect data");
            } else {
                    dispatch(actionImpl.setup(state.registerReducer.data!, name, location, description, gender))
            }
        } catch (ex) {
            console.log('onSendBtnHandler ex', ex);
        }
    }


    useLayoutEffect(() => {
        console.log(state)
        if (state.setupReducer.statusCode === 200) {
            dispatch(actionImpl.clear())
            INavigation.navigate(StackScreens.SignIn)
        } else if (state.statusCode === 208) {
            Alert.alert("Oops", "Something went wrong");
        }
    }, [state])



    return (
        <View style={StylesOne.screenContainer}>
            <View style={[StylesOne.flex_row, StylesOne.flex_jc_fs, StylesOne.flex_ai_c, MP.mv20]}>
                <View style={[StylesOne.flex_row,StylesOne.flex_jc_c, StylesOne.w100]}>
                    <Text style={StylesOne.CheckBox_text}>Setup Account</Text>
                </View>
            </View>
            <View style={[StylesOne.inputContainer]}>
                <View style={[MP.mv20, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c]}>
                </View>
                <TextInput placeholder="Full name"
                           placeholderTextColor={colors.Placeholder}
                           underlineColorAndroid={colors.Underline_rgba_black}
                           style={StylesOne.fontInputText_black}
                            onChangeText={(val) => setName(val)}
                />
                <TextInput placeholder="Location"
                           placeholderTextColor={colors.Placeholder}
                           underlineColorAndroid={colors.Underline_rgba_black}
                           style={StylesOne.fontInputText_black}
                           onChangeText={(val) => setLocation(val)}
                />
                <TextInput placeholder="About yourself"
                           placeholderTextColor={colors.Placeholder}
                           underlineColorAndroid={colors.Underline_rgba_black}
                           style={StylesOne.fontInputText_black}
                           onChangeText={(val) => setDescription(val)}
                />
                <View style={[StylesOne.DropdownStyles, MP.plm20]}>
                    <Picker selectedValue={gender}
                            onValueChange={(val, itemIndex) =>
                                setGender(val)}
                            dropdownIconColor={colors.SignIn_Font}
                            itemStyle={StylesOne.fontInputText_black}
                            dropdownIconRippleColor={colors.transparent}
                            mode="dropdown">
                        <Picker.Item style={StylesOne.fontInputText_black} label="Male" value="Male" />
                        <Picker.Item style={StylesOne.fontInputText_black} label="Female" value="Female" />
                        <Picker.Item style={StylesOne.fontInputText_black} label="Unrecognized" value="Unrecognized" />
                        <Picker.Item style={StylesOne.fontInputText_black} label="Digigender" value="Digigender" />
                    </Picker>
                    <View style={StylesOne.borderBottom} />
                </View>
                <View style={[MP.mt50, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c]}>
                    <TouchableOpacity onPress={onSetupHandler} style={[StylesOne.SignInButton, StylesOne.shadowRed]}>
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