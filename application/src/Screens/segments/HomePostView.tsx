import React, { useEffect, useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "../../assets/images";
import { HomePostEntity } from "../../BLL/entity/HomePostEntity";
import { dateParser, mockupWidthToDP, mockupHeightToDP } from "../../Parts/utils";
import { apiURL } from "../../redux/actions";
import { MP } from "../../Styles/MP";
import { StylesFour } from "../../Styles/StylesFour";
import { StylesOne } from "../../Styles/StylesOne";
import { St } from "../../Styles/StylesTwo";
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
}

const HomePostView: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [getState, setState] = useState<IState>({
        url: ''
    })
    const src = `http://${apiURL}/storage/${props.entity.owner}/avatar/avatar.png`;
    useMemo(() => {
        console.log('memem')
      setState({...getState, url: `http://${apiURL}/storage/${props.entity.owner}/posts/${props.entity.image}/0.png?ab=${Date.now()}`})
    }, [props.refresh])

    const date = dateParser(props.entity.date_of_creation, 1);
    return (
      <View style={[MP.mb20]}>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, MP.mb10]}>
          <View style={[StylesOne.flex_row]}>
            <Image style={[StylesFour.myNewsLine_avatar]} source={{ uri: src }} />
            <View style={[StylesOne.flex_column, MP.ml5]}>
              <Text numberOfLines={1} style={[StylesFour.myNewsLine_owner]}>
                {props.entity.owner}
              </Text>
              <Text numberOfLines={1} style={[StylesFour.myNewsLine_date]}>
                {date}
              </Text>
            </View>
          </View>
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
        <HomeButtonView entity={props.entity} onLikePress={props.onLikePress} />
          <TouchableOpacity onPress={props.onCommendPress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.commend} />
            <Text style={{ color: 'black' }}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onRepostPress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain' }]} source={images.repost} />
          </TouchableOpacity>
        </View>
          <View style={St.horizontalLine} />
      </View>
    );
}


export {HomePostView}