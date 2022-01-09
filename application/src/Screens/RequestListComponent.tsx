import React from "react";
import {View, Text, ScrollView, RefreshControl, TouchableOpacity, Image} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {MP} from "../Styles/MP";
import {St} from "../Styles/StylesTwo";
import {images} from "../assets/images";

type IProps = {
    onRefresh(): void;
    refresh: boolean;
    onBackBtn():void;
}

const RequestListComponent: React.FC<IProps> = (state) => {
    return (
       <ScrollView style={[StylesOne.screenContainer, MP.ph25]} refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.onRefresh}/>}>
           <View style={[StylesOne.w100]}>
               <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
                   <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
                       <Image style={[StylesOne.wh100,StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
                   </TouchableOpacity>
                   <Text style={StylesOne.CheckBox_text}>Request List</Text>
                   <View/>
               </View>
           </View>
       </ScrollView>
    )
}


export default RequestListComponent