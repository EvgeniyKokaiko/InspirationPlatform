import {StyleSheet} from "react-native";
import {mockupHeightToDP, mockupWidthToDP} from "../Parts/utils";


export const MP = StyleSheet.create({
    mv40: {
        marginVertical: mockupHeightToDP(40),
    },
    mr15: {
        marginRight: mockupWidthToDP(15),
    },
    mt50: {
        marginTop: mockupHeightToDP(50)
    },
    mbminus50: {
        marginBottom: mockupHeightToDP(-50),
    }
})