import React, {useEffect, useState} from 'react'
import {
    NavigationContainer,
    NavigationProp,
    StackRouterOptions,
    useFocusEffect,
    useNavigation, useRoute
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInComponent from "../SignInComponent";
import {Component} from "../../Types/Types";
import SignUpComponent from "../SignUpComponent";
import {BackHandler} from "react-native";
import SetupAccountComponent from "../SetupAccountComponent";
import UserProfileComponent from "../UserProfileComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeComponent from "../HomeComponent";
import MenuComponent from "../MenuComponent";
import AddComponent from "../AddComponent";
import NotificationsComponent from "../NotificationsComponent";
import BottomNavigation from "../segments/BottomNavigation";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


interface IProps {}

export enum StackScreens {
    SignIn = "SignInComponent",
    SignUp = "SignUpComponent",
    SetupAccount = "SetupAccountComponent",
    UserProfile = "UserProfileComponent",
    Home = "HomeComponent",
    Menu = "MenuComponent",
    Add = "AddComponent",
    Notifications = "NotificationsComponent",
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
    const Tab = createBottomTabNavigator()
    let defaultScreen = "";
    const withoutNavigation = [StackScreens.SignIn, StackScreens.SignUp, StackScreens.SetupAccount];
    const withoutNavigationIndex = [0,1,2];
    const Screens: { name: string, component: Component, options?: any }[] =
        [
            // Service screens
            {name: StackScreens.SignIn, component: SignInComponent, options: {headerShown: false,}},
            {name: StackScreens.SignUp, component: SignUpComponent, options: {headerShown: false,}},
            {name: StackScreens.SetupAccount, component: SetupAccountComponent, options: {headerShown: false,}},


            //Main screens
            {name: StackScreens.UserProfile, component: UserProfileComponent, options: {headerShown: false,}},
            {name: StackScreens.Home, component: HomeComponent, options: {headerShown: false,}},
            {name: StackScreens.Menu, component: MenuComponent, options: {headerShown: false,}},
            {name: StackScreens.Add, component: AddComponent, options: {headerShown: false,}},
            {name: StackScreens.Notifications, component: NotificationsComponent, options: {headerShown: false,}},
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
            <Tab.Navigator initialRouteName={defaultScreen}  tabBar={({navigation}) => {
                const index = navigation.getState().index;
                if (!withoutNavigationIndex.includes(index)) {
                return <BottomNavigation />
                } else {
                    return null
                }
            }}>
                {Screens.map((el ) => {
                    return <Tab.Screen key={el.name} name={el.name} component={el.component} options={el.options}  />
                })}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigationScreen