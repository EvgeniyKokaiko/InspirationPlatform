import React, {useEffect} from 'react';
import {ActivityIndicator, ScrollView, View} from "react-native";
import {St} from "../../Styles/StylesTwo";
import {mockupWidthToDP} from "../../Parts/utils";
import {backgrounds} from "../../Styles/Backgrounds";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {BaseProps} from "../../Types/Types";
import {actionImpl} from "../../redux/actions";
import {StackScreens} from "./MainNavigationScreen";

type IProps = {} & BaseProps


const SplashComponent: React.FC<IProps> = (props: IProps) => {
    const dispatch = useDispatch();
    const state: any = useSelector(state => state)
    useEffect(() => {
        AsyncStorage.getItem("Access_TOKEN").then(token => {
             if (typeof token !== "undefined" && token?.length! > 10) {
                 //TODO тут робити проверку чи є інтернет, і якщо нема тоді кажді 20 секунд слати запрос, якщо появився, тоді сразу кидати реквест
                dispatch(actionImpl.checkForConnection)
                 if (state.checkForConnectionReducer.status === 200) {
                     props.navigation.navigate(StackScreens.UserProfile)
                 } else {
                     props.navigation.navigate(StackScreens.UserProfile)
                 }
             }
             if (token === null) {
                 props.navigation.navigate(StackScreens.SignIn)
             }
        })
    }, [])

    return (
        <View style={[St.SplashComponent,  backgrounds.signIn_bg]}>
            <ActivityIndicator size={mockupWidthToDP(60)} color={'white'} />
        </View>
    );
};

export default SplashComponent;