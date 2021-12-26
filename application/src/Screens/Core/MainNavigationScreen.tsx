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
import {AppState, BackHandler} from "react-native";
import SetupAccountComponent from "../SetupAccountComponent";
import UserProfileComponent from "../UserProfileComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeComponent from "../HomeComponent";
import MenuComponent from "../MenuComponent";
import AddComponent from "../AddComponent";
import NotificationsComponent from "../NotificationsComponent";
import BottomNavigation from "../segments/BottomNavigation";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SplashComponent from "./SplashComponent";
import EditProfileComponent from "../EditProfileComponent";
import SettingsComponent from "../SettingsComponent";
import MenuContainer from "../Controllers/MenuContainer";
import ExpandedPostContainer from "../Controllers/ExpandedPostContainer";


interface IProps {}

export enum StackScreens {
    Splash = "SplashComponent",
    SignIn = "SignInComponent",
    SignUp = "SignUpComponent",
    SetupAccount = "SetupAccountComponent",
    UserProfile = "UserProfileComponent",
    Home = "HomeComponent",
    Menu = "MenuComponent",
    Add = "AddComponent",
    Notifications = "NotificationsComponent",
    Settings = "SettingsComponent",
    EditProfile = "EditProfileComponent",
    PostDetails = "ExpandedPostComponent",
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

export const goBackOnBottomButton = (navProps: NavigationProp<any>) => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        navProps.goBack()
        return false;
    })
}

export const goToUserProfileScreenOnBottomButton = (navProps: any) => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        navProps.navigate(StackScreens.UserProfile)
        return false;
    })
}


const MainNavigationScreen: React.FC = (props:IProps) => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator()
    let defaultScreen = "SplashComponent";
    const withoutNavigation = [StackScreens.SignIn, StackScreens.SignUp, StackScreens.SetupAccount];
    const withoutNavigationIndex = [0,1,2,3,4,5,6];
    const Screens: { name: string, component: Component, options?: any }[] =
        [
            // Service screens
            {name: StackScreens.Splash, component: SplashComponent, options: {headerShown: false}},
            {name: StackScreens.SignIn, component: SignInComponent, options: {headerShown: false}},
            {name: StackScreens.SignUp, component: SignUpComponent, options: {headerShown: false}},
            {name: StackScreens.SetupAccount, component: SetupAccountComponent, options: {headerShown: false}},
            {name: StackScreens.EditProfile, component: EditProfileComponent, options: {headerShown: false}},
            {name: StackScreens.Settings, component: SettingsComponent, options: {headerShown: false}},


            //Main screens
            {name: StackScreens.PostDetails, component: ExpandedPostContainer, options: {headerShown: false}},
            {name: StackScreens.UserProfile, component: UserProfileComponent, options: {headerShown: false}},
            {name: StackScreens.Home, component: HomeComponent, options: {headerShown: false}},
            {name: StackScreens.Menu, component: MenuContainer, options: {headerShown: false}},
            {name: StackScreens.Add, component: AddComponent, options: {headerShown: false}},
            {name: StackScreens.Notifications, component: NotificationsComponent, options: {headerShown: false}},

        ]

    // const onStartApp = () => {
    //     if (true) {
    //         defaultScreen = StackScreens.SignIn
    //     } else {
    //         defaultScreen = StackScreens.SignIn
    //     }
    // }

    useEffect(() => {
        ApplicationState();
    }, [AppState])


    const ApplicationState = () => {
       const subscription = AppState.addEventListener("change", (state) => {
            switch (state) {
                case "active":
                    console.log('app active')
                    break;
                case "background":
                    console.log('app background')
                    break;
                case "inactive":
                    console.log('app inactive')
                    break;
                case "unknown":
                    console.log('app unknown')
                    break;
                case "extension":
                    console.log('app extension')
                    break;
            }
        })
        return () => {
            subscription.remove();
        };
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