import React, {useCallback, useEffect} from 'react';
import {View, Text, RefreshControl, TouchableOpacity, Image, Alert} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {MP} from "../Styles/MP";
import {St} from "../Styles/StylesTwo";
import {images} from "../assets/images";
import {
    goBack,
    goToUserProfileScreenOnBottomButton,
    StackScreens
} from "./Core/MainNavigationScreen";
import {BaseProps} from "../Types/Types";
import {useNavigation} from "@react-navigation/native";
import ListItem from './segments/ListItem';
import {useDispatch, useSelector} from "react-redux";
import {actionImpl} from "../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {INavigation} from "./Core/OverrideNavigation";
import LogoutSegment from "./segments/LogoutSegment";

type IProps = {} & BaseProps

const SettingsComponent: React.FC<IProps> = (props: IProps) => {
        const dispatch = useDispatch();
        const isPrivate = props.route?.params?.isPrivate;
        //TODO протипизировать юзСелектор
        const state: any = useSelector<any>(state => state)
    const onBackBtn = () => {
           INavigation.goBack()
    }

    const routes: {[key: string]: string} = {
            ManageAccount: StackScreens.Manage,
            RequestList: StackScreens.RequestList,
            Pustishka: StackScreens.EditProfile,
            About: StackScreens.AboutUser,
    }


    const checkIsPrivate = () => {
            if (isPrivate === 0) {
                return true
            } else {
                return false
            }
    }


    const onLogoutPress = async () => {
            dispatch(actionImpl.logout())
            await AsyncStorage.setItem("Access_TOKEN", "")
    }

    useEffect(() => {
        if (state.logoutReducer.statusCode === 200) {
            dispatch(actionImpl.clear())
            INavigation.navigate(StackScreens.SignIn)
        }
    }, [state.logoutReducer])

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
            <View style={[StylesOne.flex_column, StylesOne.flex_jc_sb, MP.pb15, StylesOne.h80]}>
            <View>
                {/*зміна картинки, імені(но не юзернейма, він незмінний), про себе, і т.д*/}
                <ListItem navigation={props.navigation} title={"Manage account"} icon={images.avatar_mini} route={routes.ManageAccount} />
                {/*Налаштування сповіщень*/}
                {/*<ListItem navigation={props.navigation} title={"Notifications"} icon={images.notifications} route={routes.Pustishka} />*/}
                {/*Зміна пароля, логіна и т.д*/}
                {/*<ListItem navigation={props.navigation} title={"Security"} icon={images.security} route={routes.Pustishka} />*/}
                {/*Інвайти с кьюаром*/}
                {/*<ListItem navigation={props.navigation} title={"Invitation"} icon={images.invite} route={routes.Pustishka} />*/}

                <ListItem isDisabled={checkIsPrivate()} navigation={props.navigation} title={"Requests"} icon={images.circleArrow} route={routes.RequestList} />

                {/*Про додаток*/}
                <ListItem navigation={props.navigation} title={"About"} icon={images.about} route={routes.About} />

            </View>
            <View>
                {/*Видалення аккаунта*/}
                {/*<ListItem navigation={props.navigation} title={"Hazard"} icon={images.hazard} route={routes.Pustishka} />*/}
                {/*Вихід*/}
                <LogoutSegment title={"Log Out"} icon={images.logout} onPress={onLogoutPress} />
            </View>
            </View>
        </View>
    );
};

export default SettingsComponent;