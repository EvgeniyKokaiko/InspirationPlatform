import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "../../assets/images";
import { currentUser } from "../../BLL/CurrentUserProps";
import { HomePostEntity } from "../../BLL/entity/HomePostEntity";
import { dateParser, mockupWidthToDP, mockupHeightToDP } from "../../Parts/utils";
import { apiURL } from "../../redux/actions";
import { MP } from "../../Styles/MP";
import { StylesFour } from "../../Styles/StylesFour";
import { StylesOne } from "../../Styles/StylesOne";
import { St } from "../../Styles/StylesTwo";
import { StackScreens } from "../Core/MainNavigationScreen";
import { INavigation } from "../Core/OverrideNavigation";
import { HomeButtonView } from "./HomeButtonView";

type IProps = {
    entity: HomePostEntity;
    onBurgerPress(): void;
    onLikePress(postHash: string, owner: string): void;
    onCommendPress(): void;
    onRepostPress(): void;
    refresh: boolean;
};

type IState = {
    url: string;
    likesData: any,
    refreshOrUpdate: number,
}

const HomePostView: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [getState, setState] = useState<IState>({
        url: '',
        likesData: null,
        refreshOrUpdate: 0,
    })
    const onPostOwnerPress = (): void => {
      const ownerId = props.entity.owner;
        if (ownerId !== void 0 && (currentUser.currentUserId !== null || currentUser.currentUserId !== void 0)) {
          if (currentUser.currentUserId === ownerId) {
            INavigation.navigate(StackScreens.MyProfile);
          } else {
            INavigation.navigate(StackScreens.UserProfile, { ownerId: ownerId });
          }
        }
    };

    const getLikes = async () => {
     const response = await axios.get(`http://${apiURL}/likes/getLikes/${props.entity.image}`, {
       headers: {
         Authorization: `Bearer ${currentUser.token}`
       }
     })
     if (response.data.statusCode === 200) {
       const data: {isLiked: boolean; likesData: {likesCount: number; post_hash: string}} = response.data.data;
       props.entity.likesCount = data.likesData.likesCount;
       props.entity.post_hash = data.isLiked ?  data.likesData.post_hash : null;
       setState({...getState, likesData: data, refreshOrUpdate: getState.refreshOrUpdate + 1});
     }
    }

   useEffect(() => {
    getLikes();
    console.log(props.entity.likesCount, getState)
   }, [props.entity])

    const src = `http://${apiURL}/storage/${props.entity.owner}/avatar/avatar.png`;
    useMemo(() => {
      setState({...getState, url: `http://${apiURL}/storage/${props.entity.owner}/posts/${props.entity.image}/0.png?ab=${Date.now()}`})
    }, [props.refresh])

    const date = dateParser(props.entity.date_of_creation, 1);
    return (
      <View style={[MP.mb20]}>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, MP.mb10]}>
          <TouchableOpacity activeOpacity={0.6} onPress={onPostOwnerPress} style={[StylesOne.flex_row]}>
            <Image style={[StylesFour.myNewsLine_avatar]} source={{ uri: src }} />
            <View style={[StylesOne.flex_column, MP.ml5]}>
              <Text numberOfLines={1} style={[StylesFour.myNewsLine_owner]}>
                {props.entity.owner}
              </Text>
              <Text numberOfLines={1} style={[StylesFour.myNewsLine_date]}>
                {date}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onBurgerPress} style={[StylesOne.flex_row, StylesOne.flex_ai_c]}>
            <Image style={St.image20} source={images.burgerBtn} />
          </TouchableOpacity>
        </View>
        <View style={[MP.mb10]}>
          <Text style={[StylesFour.myNewsLine_caption]}>{props.entity.caption}</Text>
        </View>
        <View>
          <Image style={StylesFour.myNewsLine_img} source={{ uri: getState.url }} />
        </View>
        <View style={[StylesOne.flex_row, MP.mt10, MP.mb20]}>
        <HomeButtonView refreshOrUpdate={getState.refreshOrUpdate} entity={props.entity} onLikePress={props.onLikePress} />
          <TouchableOpacity onPress={props.onCommendPress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[StylesOne.wh100, StylesOne.rm_c]} source={images.commend} />
            <Text style={{ color: 'black' }}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onRepostPress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[StylesOne.wh100, StylesOne.rm_c]} source={images.repost} />
          </TouchableOpacity>
        </View>
          <View style={St.horizontalLine} />
      </View>
    );
}


export {HomePostView}