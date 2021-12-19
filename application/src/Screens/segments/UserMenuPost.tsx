import React, {useCallback} from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { mockupHeightToDP, mockupWidthToDP } from '../../Parts/utils';
import { StylesOne } from '../../Styles/StylesOne';
import { Post } from '../../Types/Models';

type IProps = {
    isExpanded?: boolean;
    onPostPress?(postData: Post): void;
    postData: Post;
};

//Constants
const windowWidth = Dimensions.get('window').width - mockupWidthToDP(40);
let IMAGES_PER_ROW = 3;

const UserMenuPost: React.FC<IProps> = (props: IProps): JSX.Element => {
    const onPostPress = useCallback(() => {
        if (props.onPostPress !== void 0) {
            props.onPostPress(props.postData);
            console.log('bruh');
        } else {
            //Handling
        }
    }, []);

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
                source={{ uri: 'https://medialeaks.ru/wp-content/uploads/2020/11/fb_img_1596591789564.jpg' }}
            />
        </TouchableOpacity>
    );
};

export default UserMenuPost;
