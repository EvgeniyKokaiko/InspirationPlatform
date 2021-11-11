import React, {useEffect, useState} from 'react'
import {NavigationContainer, StackRouterOptions, useFocusEffect} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInComponent from "../SignInComponent";
import {Component} from "../../Types/Types";
import SignUpComponent from "../SignUpComponent";
import {BackHandler} from "react-native";
import SetupAccountComponent from "../SetupAccountComponent";
interface IProps {

}

export enum StackScreens {
    SignIn = "SignInComponent",
    SignUp = "SignUpComponent",
    SetupAccount = "SetupAccountComponent"
}

export const noGoBack = () => {
    useFocusEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
    })
}


const MainNavigationScreen: React.FC = (props:IProps) => {
    const Stack = createNativeStackNavigator();
    let defaultScreen = "";
    const Screens: {name: string, component: Component, options?: any }[] =
    [
        {name: StackScreens.SignUp, component: SignUpComponent, options: {headerShown: false,}},
        {name: StackScreens.SignIn, component: SignInComponent, options: {headerShown: false,}},
        {name: StackScreens.SetupAccount, component: SetupAccountComponent, options: {headerShown: false,}}
    ]

    const onStartApp = () => {
        if (true) {
            defaultScreen = StackScreens.SignIn
        } else {
            defaultScreen = StackScreens.SignIn
        }
        // при старті аппки
    }
    onStartApp()


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