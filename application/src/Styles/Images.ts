import { StyleSheet } from "react-native";
import { mockupHeightToDP, mockupWidthToDP } from "../Parts/utils";

export const ImageStyles = StyleSheet.create({
    imageDoubleAvatar: {
        width: mockupWidthToDP(24),
        height: mockupHeightToDP(24),
        resizeMode: 'contain',
    },
    tintColorWhite: {
        tintColor: 'white',
    },
})