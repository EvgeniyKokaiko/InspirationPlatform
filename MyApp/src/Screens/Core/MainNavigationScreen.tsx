import React, {useEffect} from 'react'
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from "../SignIn";
import {Component} from "../../Types/Types";
interface IProps {

}


const MainNavigationScreen: React.FC = (props:IProps) => {
    useEffect(() => {
       onStartApp()
    }, [])
    const Stack = createNativeStackNavigator();
    const InitialScreen = {name: "SignIn"}
    const Screens: {name: string, component: Component, options?: any }[] =
    [
        {name: "SignIn", component: SignIn, options: {headerShown: false,}}
    ]

    const onStartApp = () => {
        if (true) {
            InitialScreen.name = Screens[0].name
        }
        // при старті аппки
    }

    const toSignIn = () => {

    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={InitialScreen.name}>
                {Screens.map((el ) => {
                    return <Stack.Screen name={el.name} component={el.component} options={el.options}  />
                })}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigationScreen