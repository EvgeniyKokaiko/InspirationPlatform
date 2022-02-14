import React from 'react';
import {View, Text, ScrollView, RefreshControl, Image, TouchableOpacity} from "react-native";
import {StylesOne} from "../../Styles/StylesOne";
import {MP} from "../../Styles/MP";
import {images} from "../../assets/images";
import {St} from "../../Styles/StylesTwo";
import {backgrounds} from "../../Styles/Backgrounds";
import Avatar from "../segments/Avatar";
import { mockupHeightToDP } from "../../Parts/utils";
import {Post, User} from "../../Types/Models";
import FullScreenPreloader from "../segments/FullScreenPreloader";
import MyPost from "../segments/MyPost";
import {colors} from "../../Parts/colors";

type IProps = {
    ownerId: string;
    makeRequest(): void;
    user: any;
    refresh: boolean;
    onPersonalSitePress(): void;
    ownerAvatar: string;
    onBackBtn():void;
    onSubscribePress(): void;
    onUnfollowPress(): void;
    isFollowed: boolean;
    isMe: boolean;
    goToChatScreen():void;
    onFollowersPress():void;
    onFollowingPress(): void;
}

const UserProfileComponent = (state: IProps) => {

    const renderPosts = () => {
        if (!Array.isArray(state.user?.userPosts) || state.user?.isPrivate) {
            return
        }
        return state.user.userPosts?.map((el: Post, index: number) => {
            return <MyPost isMe={state.isMe} {...el} index={index} key={index} />;
        });
    };

console.log(state, "STATE")
    return state.user?.userData !== void 0 && state.user?.userData !== null && state?.user?.userData  ? (
        <ScrollView style={[StylesOne.screenContainer, MP.ph25]} refreshControl={<RefreshControl refreshing={state.refresh} onRefresh={state.makeRequest} />}>
            <View style={[StylesOne.w100]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
                    <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
                        <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
                    </TouchableOpacity>
                    <View><Image source={images.logo} style={[StylesOne.image40, { tintColor: 'black' }]} /><Text style={St.ownerTextWithoutOffsets}>{state.user.userData?.username}</Text></View>
                    <View />
                </View>
            </View>
            <View style={[MP.mt20, StylesOne.w100, St.h190, St.borderRadius30, backgrounds.myProfileBlocks, MP.pv20, MP.ph20]}>
                <View style={[StylesOne.flex_row]}>
                    <View style={[MP.mb20]}>
                        <Avatar icon={{uri: state?.ownerAvatar}} size={60} />
                    </View>
                    <View style={[StylesOne.flex_row, StylesOne.flex_ai_c, { height: mockupHeightToDP(75) }]}>
                        <TouchableOpacity disabled={state.user?.isPrivate} onPress={state.onFollowingPress} style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
                            <Text style={St.myAccButtonsHeader}>{state.user?.counts?.subscriber_count || 0}</Text>
                            <Text style={St.myAccButtonsDescr}>Following</Text>
                        </TouchableOpacity>
                        <View style={[St.verticalLine]} />
                        <TouchableOpacity disabled={state.user?.isPrivate} onPress={state.onFollowersPress} style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
                            <Text style={St.myAccButtonsHeader}>{state.user?.counts?.owner_count || 0}</Text>
                            <Text style={St.myAccButtonsDescr}>Followers</Text>
                        </TouchableOpacity>
                        <View style={[St.verticalLine]} />
                        <View style={[MP.mh15, StylesOne.flex_column, StylesOne.flex_ai_c]}>
                            <Text style={St.myAccButtonsHeader}>{state.user?.isPrivate ? "###" : state.user?.userPosts?.length || '0'}</Text>
                            <Text style={St.myAccButtonsDescr}>Posts</Text>
                        </View>
                    </View>
                </View>
                <View style={[StylesOne.flex_row]}>
                    <View style={[St.w240]}>
                        <View>
                            <Text numberOfLines={1} style={St.myAccName}>
                                {(state.user?.userData as User).full_name}
                            </Text>
                        </View>
                        <View>
                            <Text numberOfLines={1} style={St.myAccDescr}>
                                {(state.user?.userData as User).description}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c]}>
                <View style={[StylesOne.flex_row]}>
                    <TouchableOpacity onPress={state.onPersonalSitePress}>
                        <Image style={St.imgIcon} source={images.personalSite} />
                    </TouchableOpacity>
                </View>
                    {state.user?.isSubscribed?.socket_hash !== '' ? <TouchableOpacity onPress={state.goToChatScreen} activeOpacity={0.7} style={[StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c, {backgroundColor: colors.Chalise , borderRadius: 8, width: "40%", height: mockupHeightToDP(40)}]}>
                        <Image style={[StylesOne.image25, MP.mr5, {tintColor: colors.blurWhite}]} source={images.message2} />
                        <Text style={[St.ownerTextWithoutOffsets, {marginBottom: 2, color: colors.blurWhite, fontWeight: "600"}]}>Message</Text>
                    </TouchableOpacity> : null}
                    <TouchableOpacity onPress={state.isFollowed ? state.onUnfollowPress : state.onSubscribePress} activeOpacity={0.7} style={[StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c, {backgroundColor: state.isFollowed ? colors.WhiteChalk : colors.Chalise , borderRadius: 8, width: "40%", height: mockupHeightToDP(40)}]}>
                        {!state?.isFollowed ? <Image style={[StylesOne.image25, MP.mr5, {tintColor: colors.blurWhite}]} source={images.addSub} /> : <Image style={[StylesOne.image25, MP.mr5, {tintColor: colors.blurWhite}]} source={images.unfollow} />}
                        <Text style={[St.ownerTextWithoutOffsets, {marginBottom: 2, color: colors.blurWhite, fontWeight: "600"}]}>{state.isFollowed ? "Unfollow" :  "Subscribe"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
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