import React, {useCallback, useEffect} from 'react';
import {View, Text, RefreshControl, TouchableOpacity, Image, Alert} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {MP} from "../Styles/MP";
import {St} from "../Styles/StylesTwo";
import {images} from "../assets/images";
import {
    goBack,
    goBackOnBottomButton,
    goToUserProfileScreenOnBottomButton,
    StackScreens
} from "./Core/MainNavigationScreen";
import {BaseProps} from "../Types/Types";
import {useNavigation} from "@react-navigation/native";
import ListItem from './segments/ListItem';
import {useDispatch, useSelector} from "react-redux";
import {actionImpl} from "../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

type IProps = {} & BaseProps

const SettingsComponent: React.FC<IProps> = (props: IProps) => {
        const nav = useNavigation()
        const dispatch = useDispatch();
        //TODO протипизировать юзСелектор
        const state: any = useSelector<any>(state => state)
    const onBackBtn = () => {
            props.navigation.navigate(StackScreens.UserProfile)
    }

    const routes: {[key: string]: string} = {
            ManageAccount: StackScreens.EditProfile,
    }


    const onLogoutPress = async () => {
            dispatch(actionImpl.logout)
            dispatch(actionImpl.clear)
        console.log(state, "STATE")
            await AsyncStorage.setItem("Access_TOKEN", "")
            props.navigation.navigate(StackScreens.SignIn)

    }

    return (
        <View style={[StylesOne.screenContainer, MP.ph15]}>
            <View style={[StylesOne.w100]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
                    <TouchableOpacity onPress={onBackBtn} style={StylesOne.image24}>
                        <Image style={[StylesOne.wh100,StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
                    </TouchableOpacity>
                    <Text style={StylesOne.CheckBox_text}>Settings and privacy</Text>
                    <View></View>
                </View>
            </View>
            <View style={MP.mt5}>
                {/*Смена картинки, имени(но не юзернейма, он несменный), дескрипшина,*/}
                <ListItem navigation={props.navigation} title={"Manage account"} icon={images.avatar_mini} route={routes.ManageAccount} />
                {/*Управление уведомлениями*/}
                <ListItem navigation={props.navigation} title={"Notifications"} icon={images.notifications} route={routes.ManageAccount} />
                {/*Смена пароля, логина и т.д*/}
                <ListItem navigation={props.navigation} title={"Security"} icon={images.security} route={routes.ManageAccount} />
                {/*Инвайты с кьюаром*/}
                <ListItem navigation={props.navigation} title={"Invitation"} icon={images.invite} route={routes.ManageAccount} />
                {/*Про приложение*/}
                <ListItem navigation={props.navigation} title={"About"} icon={images.about} route={routes.ManageAccount} />
            </View>
            <View style={[MP.mt30pc]}>
                {/*Удаление аккаунта*/}
                <ListItem navigation={props.navigation} title={"Hazard"} icon={images.hazard} route={routes.ManageAccount} />
                {/*Выход*/}
                <ListItem title={"Log Out"} icon={images.logout} onPress={onLogoutPress} />
            </View>
        </View>
    );
};

export default SettingsComponent;