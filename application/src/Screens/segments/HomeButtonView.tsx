import React, { useEffect, useState } from "react"
import { TouchableOpacity, Image, Text } from "react-native"
import { images } from "../../assets/images"
import { HomePostEntity } from "../../BLL/entity/HomePostEntity"
import { mockupWidthToDP, mockupHeightToDP } from "../../Parts/utils"
import { MP } from "../../Styles/MP"
import { StylesOne } from "../../Styles/StylesOne"


type IProps = {
    onLikePress(postHash: string, owner: string): void;
    entity: HomePostEntity;
    textColor?: string;
    refreshOrUpdate: number;
}

type IState = {
    likesCount: number;
    refreshOrUpdate: number;
}
export const HomeButtonView = (props: IProps) => {
    const [getState, setState] = useState<IState>({
        likesCount: props.entity.likesCount,
        refreshOrUpdate: props.refreshOrUpdate,
    });

    const onPress = async () => {
      await props.onLikePress && props.onLikePress(props.entity.image, props.entity.owner)
      console.log(props.entity, 'zxcc');
      setState({...getState, refreshOrUpdate: getState.refreshOrUpdate + 1});
    }

    useEffect(() => {
        if (props.entity.likesCount !== getState.likesCount) {
            setState({...getState, likesCount: props.entity.likesCount})
        }
    }, [props.entity.likesCount, getState.refreshOrUpdate])

    return (
        <TouchableOpacity onPress={onPress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain', tintColor: props.entity.post_hash === null ? "black" : 'red'  }]} source={images.like} />
            <Text style={{ color: props.textColor === void 0 ? 'black' : props.textColor }}>{typeof getState.likesCount !== 'number' ? 0 : getState.likesCount}</Text>
          </TouchableOpacity>
    )
}