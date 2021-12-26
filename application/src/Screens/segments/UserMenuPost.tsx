import React, {useCallback} from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { mockupHeightToDP, mockupWidthToDP } from '../../Parts/utils';
import { StylesOne } from '../../Styles/StylesOne';
import { Post } from '../../Types/Models';
import {apiURL} from "../../redux/actions";

type IProps = {
    isExpanded?: boolean;
    onPostPress?(postData: Post): void;
    postData: Post;
};

//Constants
const windowWidth = Dimensions.get('window').width - mockupWidthToDP(40);
let IMAGES_PER_ROW = 3;

const UserMenuPost: React.FC<IProps> = (props: IProps): JSX.Element => {
    const dataPath = `http://${apiURL}/storage/${props.postData.owner}/posts/${props.postData.image.length > 0 && props.postData.data_count > 0 ? props.postData.image : props.postData.video}/0.png`
    const onPostPress = () => {
        if (props.onPostPress !== void 0) {
            props.onPostPress(props.postData);
            console.log('bruh');
        } else {
            //Handling
        }
    }

    const calculatedSize = (): number => {
        const size = windowWidth / IMAGES_PER_ROW;
        return size;
    };
    return (
        <TouchableOpacity
            onPress={onPostPress}
            style={{
                width: props.isExpanded ? calculatedSize() * 2 + 2 : calculatedSize(),
                aspectRatio: 4 / 4,
                marginRight: mockupWidthToDP(2),
                marginBottom: mockupHeightToDP(2),
            }}
        >
            <Image
                style={[StylesOne.wh100]}
                source={{ uri: `${dataPath}?${new Date().getHours()}` }}
            />
        </TouchableOpacity>
    );
};

export default UserMenuPost;
