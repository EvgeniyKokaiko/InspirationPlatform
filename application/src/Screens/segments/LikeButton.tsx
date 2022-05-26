import React, { useEffect, useState } from "react"
import { TouchableOpacity, Image, Text } from "react-native"
import { images } from "../../assets/images"
import { HomePostEntity } from "../../BLL/entity/HomePostEntity"
import { Requests } from "../../BLL/Requests"
import { mockupWidthToDP, mockupHeightToDP } from "../../Parts/utils"
import { MP } from "../../Styles/MP"
import { StylesOne } from "../../Styles/StylesOne"


type IProps = {
    textColor?: string;
    postHash: string;
    owner: string;
}

type IState = {
    likesCount: number;
    isLiked: boolean;
    disabled: boolean;
}

//TODO не тяни средакса, а тяни напряму, на серваку всьо є

export const LikeButton: React.FC<IProps> = ({ textColor, postHash, owner }) => {
    const [getState, setState] = useState<IState>({
        likesCount: 0,
        isLiked: false,
        disabled: false,
    })

    const onLikePress = async () => {
        const response = await Requests.onLikePress(owner, postHash)
        if (response.statusCode === 200) {
            const isLike = response.data.is_like;
            if (isLike) {
                setState({...getState, likesCount: getState.likesCount + 1, isLiked: true})
            } else {
                setState({...getState, likesCount: getState.likesCount - 1, isLiked: false})
            }
        }
    }

    useEffect(() => {
        Requests.getLikesCount(postHash).then((response) => {
            if (response.statusCode === 200) {
                const data = response.data;
                setState({...getState, likesCount: data.likesCount, isLiked: data.isLiked})
            } else {
                setState({...getState, disabled: true})
            }
        }).catch((err) => {
            console.log(err);
            setState({...getState, disabled: true})
        })
    }, [postHash])


    return (
        <TouchableOpacity onPress={onLikePress} style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}>
            <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain', tintColor: getState.isLiked ? 'red' : 'gray' }]} source={images.like} />
            <Text style={{ color: textColor === void 0 ? 'black' : textColor }}>{getState.likesCount}</Text>
        </TouchableOpacity>
    )
}