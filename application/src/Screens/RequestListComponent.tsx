import React from "react";
import {View, Text, ScrollView, RefreshControl, TouchableOpacity, Image} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {MP} from "../Styles/MP";
import {St} from "../Styles/StylesTwo";
import {images} from "../assets/images";
import {Requests} from "../Types/Models";
import {apiURL} from "../redux/actions";
import {DEVICE_WIDTH, fontSizeDP, mockupWidthToDP} from "../Parts/utils";

type IProps = {
    onRefresh(): void;
    refresh: boolean;
    onBackBtn():void;
    data: Requests[];
    onAcceptOrDeclinePress(subscriber: string, status: boolean): void;
}

const RequestListComponent: React.FC<IProps> = (state) => {



    const renderList = () => {
        return state.data.map((el,index) => {
            let avatar = `http://${apiURL}/storage/${el!.subscriber}/avatar/avatar.png?ab=${Date.now()}`
            return (
                <View key={index} style={[StylesOne.flex_row, MP.mv10, MP.ph15, {width: '100%'}]}>
                    <View style={[MP.mr10]}>
                    <Image style={[St.round100image40]} source={images.standardAvatar}/>
                    </View>
                    <View style={[StylesOne.flex_column, StylesOne.flex_jc_c, {width: mockupWidthToDP(120)}]}>
                    <Text numberOfLines={1} style={[StylesOne.requests_username]}>{el.subscriber}</Text>
                    <Text numberOfLines={1} style={[StylesOne.requests_fullName]}>{el.full_name}</Text>
                    </View>
                    <View style={[StylesOne.flex_row,{justifyContent: "flex-end", alignItems: 'center'}]}>
                        <TouchableOpacity style={[MP.mr5, StylesOne.requests_accept]} onPress={() => {state.onAcceptOrDeclinePress(el.subscriber, true)}}>
                            <Text style={[StylesOne.requests_username, {fontSize: fontSizeDP(12),color: 'white'}]}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[StylesOne.requests_decline]} onPress={() => {state.onAcceptOrDeclinePress(el.subscriber, true)}}>
                            <Text style={[StylesOne.requests_username, {fontSize: fontSizeDP(12), color: 'white'}]}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }

if (state.data.length > 0) {
    return (
        <ScrollView style={[StylesOne.screenContainer]} refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.onRefresh}/>}>
            <View style={[StylesOne.w100, MP.ph25]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
                    <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
                        <Image style={[StylesOne.wh100,StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
                    </TouchableOpacity>
                    <Text style={StylesOne.CheckBox_text}>Request List</Text>
                    <View/>
                </View>
            </View>
            <View>
                {renderList()}
            </View>
        </ScrollView>
    )
}
    return (
        <ScrollView style={[StylesOne.screenContainer, MP.ph25]} refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.onRefresh}/>}>
            <View style={[StylesOne.w100, MP.ph25]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
                    <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
                        <Image style={[StylesOne.wh100,StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
                    </TouchableOpacity>
                    <Text style={StylesOne.CheckBox_text}>Request List</Text>
                    <View/>
                </View>
            </View>
            <View>
               <Text style={{color:'black'}}>No requests</Text>
            </View>
        </ScrollView>
    )

}


export default RequestListComponent