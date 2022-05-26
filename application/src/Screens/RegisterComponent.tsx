import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView } from "react-native";
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
import SignUpComponent from "./SignUpComponent";
import SetupAccountComponent from "./SetupAccountComponent";
import { DEVICE_WIDTH } from "../Parts/utils";
import { Requests } from "../BLL/Requests";
import { currentUser } from "../BLL/CurrentUserProps";

type IProps = {} & BaseProps

export type registerState = {
    name: string;
    email: string;
    password: string;
    cPassword: string;
    fName: string;
    location: string;
    about: string;
    gender: string;
    birth: Date | string;
    site: string;
    checkbox: boolean;
    refer: any;
};

const RegisterComponent = (props: IProps) => {
    const dispatch = useDispatch()
    let state: any = useSelector<Reducers>(state => state);
    const [getState, setState] = useState({
        name: "",
        email: "",
        password: "",
        cPassword: "",
        fName: "",
        location: "",
        about: "",
        gender: "Male",
        birth: `${new Date().getTime()}`,
        site: "",
        checkbox: false,
        refer: React.createRef<ScrollView>(),
    })

    const pipeState = {
        getter: getState,
        setter: setState,
    }

    const refSetter = (ref: any) => {
        setState({...getState, refer: ref})
    }
    const scrollToIndex = (index: number) => {
        if (getState.refer !== void 0 && getState.refer !== null) {
            (getState.refer as any).scrollTo({
                x: DEVICE_WIDTH * index,
                animated: true,
            })
        }
    }

   async function onRegisterPress() {
        const { about, birth, cPassword, checkbox, email, fName, gender, location, name, password, refer, site } = getState
        console.log(name, email, password, fName, location, about, gender, birth, site);
        const response = await Requests.register({name, email, password, fName, location, about, gender, birth, site})
        if (response.statusCode !== 200) {
            Alert.alert("Warning!", response.statusMessage);
            return
        } else {
            await currentUser.authorize(name, password)
        }
    }

    return (
        <View style={StylesOne.flex1}>
            <ScrollView style={StylesOne.wh_device} scrollEnabled={true} horizontal bounces pagingEnabled ref={(ref) => refSetter(ref)}>
                {getState.refer !== null && <>
                    <SignUpComponent pipeState={pipeState} scrollToIndex={scrollToIndex} />
                    <SetupAccountComponent onRegisterPress={onRegisterPress} pipeState={pipeState} scrollToIndex={scrollToIndex} />
                </>}
            </ScrollView>
        </View>
    )
}


export default RegisterComponent