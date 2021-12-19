import {StyleSheet} from "react-native";
import {fontSizeDP, mockupHeightToDP, mockupWidthToDP} from "../Parts/utils";
import {colors} from "../Parts/colors";


export const SThree = StyleSheet.create({
     ListItemText: {
        fontSize: fontSizeDP(14),
        fontFamily: "Metropolis-Medium",
        fontWeight: "400",
        color: colors.fontDarkness,
        marginLeft: mockupWidthToDP(12),
    },
    post_caption: {
         fontSize: fontSizeDP(22),
        color: colors.Dark,
        paddingLeft: mockupWidthToDP(5),
        marginTop: mockupHeightToDP(15),
    }
})