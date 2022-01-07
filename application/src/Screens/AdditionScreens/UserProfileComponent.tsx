import React from 'react';
import {View, Text, ScrollView, RefreshControl, Image, TouchableOpacity} from "react-native";
import {StylesOne} from "../../Styles/StylesOne";
import {MP} from "../../Styles/MP";
import {images} from "../../assets/images";
import {St} from "../../Styles/StylesTwo";
import {backgrounds} from "../../Styles/Backgrounds";
import Avatar from "../segments/Avatar";
import {mockupHeightToDP} from "../../Parts/utils";
import {Post, User} from "../../Types/Models";
import FullScreenPreloader from "../segments/FullScreenPreloader";
import MyPost from "../segments/MyPost";

type IProps = {
    ownerId: string;
    makeRequest(): void;
    user: any;
    refresh: boolean;
    onPersonalSitePress(): void;
    ownerAvatar: string
    onBackBtn():void
}

const UserProfileComponent = (state: IProps) => {


    const renderPosts = () => {
        return state.user.userPosts.map((el: Post, index: number) => {
            return <MyPost {...el} index={index} key={index} />;
        });
    };


    return state?.user?.userData ? (
        <ScrollView style={[StylesOne.screenContainer, MP.ph25]} refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.makeRequest} />}>
            <View style={[StylesOne.w100]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
                    <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
                        <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
                    </TouchableOpacity>
                    <Image source={images.logo} style={[StylesOne.image40, { tintColor: 'black' }]} />
                    <View />
                </View>
            </View>
            <View style={[MP.mt20, StylesOne.w100, St.h190, St.borderRadius30, backgrounds.myProfileBlocks, MP.pv20, MP.ph20]}>
                <View style={[StylesOne.flex_row]}>
                    <View style={[MP.mb20]}>
                        <Avatar icon={state.ownerAvatar} size={60} />
                    </View>
                    <View style={[StylesOne.flex_row, StylesOne.flex_ai_c, { height: mockupHeightToDP(75) }]}>
                        <TouchableOpacity style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
                            <Text style={St.myAccButtonsHeader}>0</Text>
                            <Text style={St.myAccButtonsDescr}>Followers</Text>
                        </TouchableOpacity>
                        <View style={[St.verticalLine]} />
                        <TouchableOpacity style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
                            <Text style={St.myAccButtonsHeader}>0</Text>
                            <Text style={St.myAccButtonsDescr}>Following</Text>
                        </TouchableOpacity>
                        <View style={[St.verticalLine]} />
                        <View style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
                            <Text style={St.myAccButtonsHeader}>{state.user.userPosts.length}</Text>
                            <Text style={St.myAccButtonsDescr}>Posts</Text>
                        </View>
                    </View>
                </View>
                <View style={[StylesOne.flex_row]}>
                    <View style={[St.w240]}>
                        <View>
                            <Text numberOfLines={1} style={St.myAccName}>
                                {(state.user.userData as User).full_name}
                            </Text>
                        </View>
                        <View>
                            <Text numberOfLines={1} style={St.myAccDescr}>
                                {(state.user.userData as User).description}
                            </Text>
                        </View>
                    </View>
                    <View style={[StylesOne.flex_row]}>
                        <TouchableOpacity onPress={state.onPersonalSitePress}>
                            <Image style={St.imgIcon} source={images.personalSite} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/*<View>*/}
            {/*    <TouchableOpacity>*/}
            {/*        <Image source={} />*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            <ScrollView showsVerticalScrollIndicator={false} style={[St.postListStyles]} contentContainerStyle={St.listContainer}>
                {renderPosts()}
            </ScrollView>
        </ScrollView>
    ) : (
        <ScrollView
            contentContainerStyle={[StylesOne.screenContainer, MP.ph25]}
            refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.makeRequest} />}
        >
            <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20, St.zIndex999]}>
                <TouchableOpacity
                    onPress={() => {
                        /*goBack(props.navigation)*/
                    }}
                    style={StylesOne.image24}
                >
                    <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
                </TouchableOpacity>
                <Image source={images.logo} style={[StylesOne.image40, { tintColor: 'black' }]} />
                <View style={[StylesOne.image24]}></View>
            </View>
            <FullScreenPreloader />
        </ScrollView>
    );
};

export default UserProfileComponent;