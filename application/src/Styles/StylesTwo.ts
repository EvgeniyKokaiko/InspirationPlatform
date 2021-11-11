import {StyleSheet} from "react-native";
import {colors} from "../Parts/colors";
import {mockupHeightToDP} from "../Parts/utils";


export const St = StyleSheet.create({
    blackArrow: {
        tintColor: colors.Dark,
    },
    h190: {
        height: mockupHeightToDP(190),
    },
    borderRadius30: {
        borderRadius: 30,
    }
})