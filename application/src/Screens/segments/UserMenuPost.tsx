import React from 'react';
import {Image, TouchableOpacity, View} from "react-native";


type IProps = {};


const UserMenuPost: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
            <TouchableOpacity style={{width: 125, height: 125}}>
                <Image style={{width: '100%', height: '100%'}} source={{uri: 'https://instagram.fudj1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/268099945_592851002007375_5791785140340755069_n.jpg?_nc_ht=instagram.fudj1-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=3ySLxVlr5zsAX8JsfWM&edm=AP_V10EBAAAA&ccb=7-4&oh=00_AT9F5lkxgjUEq7-yt7Oazdhbjn6BMlGianGhgLa7ppPbHw&oe=61C6C425&_nc_sid=4f375e'}} />
            </TouchableOpacity>
    );
};

export default UserMenuPost;