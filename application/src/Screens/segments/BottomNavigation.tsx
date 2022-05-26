import React, {RefObject} from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {St} from "../../Styles/StylesTwo";
import {useNavigation, useRoute} from "@react-navigation/native";
import {images} from "../../assets/images";
import {StylesOne} from "../../Styles/StylesOne";
import {StackScreens} from "../Core/MainNavigationScreen";
import {INavigation} from "../Core/OverrideNavigation";

type IProps = {}



const BottomNavigation: React.FC<IProps> = (props) => {
    return (
        <View style={St.BottomNavigationStyles}>
           <TouchableOpacity onPress={() => {INavigation.navigate(StackScreens.Home)}} style={St.BottomNavigationItem}>
               <Image style={[StylesOne.wh100]} source={images.home} />
           </TouchableOpacity>
            <TouchableOpacity onPress={() => {INavigation.navigate(StackScreens.Menu)}} style={St.BottomNavigationItem}>
                <Image style={[StylesOne.wh100]} source={images.menu} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {INavigation.navigate(StackScreens.Add)}} style={St.BottomNavigationItem}>
                <Image style={[StylesOne.wh100]} source={images.add} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => {INavigation.navigate(StackScreens.Notifications)}} style={St.BottomNavigationItem}>
                <Image style={[StylesOne.wh100]} source={images.notifications} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => {INavigation.navigate(StackScreens.MyProfile)}} style={St.BottomNavigationItem}>
                <Image style={[StylesOne.wh100]} source={images.me} />
            </TouchableOpacity>
        </View>
    )
}


export default BottomNavigation