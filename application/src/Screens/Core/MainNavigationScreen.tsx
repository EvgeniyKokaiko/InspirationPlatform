import React, {useEffect, useState} from 'react'
import {NavigationContainer, NavigationProp, StackRouterOptions, useFocusEffect} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInComponent from "../SignInComponent";
import {Component} from "../../Types/Types";
import SignUpComponent from "../SignUpComponent";
import {BackHandler} from "react-native";
import SetupAccountComponent from "../SetupAccountComponent";
import UserProfileComponent from "../UserProfileComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";



interface IProps {}

export enum StackScreens {
    SignIn = "SignInComponent",
    SignUp = "SignUpComponent",
    SetupAccount = "SetupAccountComponent",
    UserProfile = "UserProfileComponent",
}

export const noGoBack = () => {
    useFocusEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
    })
}

export const goBack = (navProps: NavigationProp<any>) => {
    navProps.goBack()
}


const MainNavigationScreen: React.FC = (props:IProps) => {
    const Stack = createNativeStackNavigator();
    let defaultScreen = "";
    const Screens: { name: string, component: Component, options?: any }[] =
        [
            {name: StackScreens.SignIn, component: SignInComponent, options: {headerShown: false,}},
            {name: StackScreens.SignUp, component: SignUpComponent, options: {headerShown: false,}},
            {name: StackScreens.SetupAccount, component: SetupAccountComponent, options: {headerShown: false,}},
            {name: StackScreens.UserProfile, component: UserProfileComponent, options: {headerShown: false,}},
        ]

    const onStartApp = () => {
        if (true) {
            defaultScreen = StackScreens.SignIn
        } else {
            defaultScreen = StackScreens.SignIn
        }
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={defaultScreen}>
                {Screens.map((el ) => {
                    return <Stack.Screen key={el.name} name={el.name} component={el.component} options={el.options}  />
                })}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigationScreen