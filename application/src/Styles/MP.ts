import {StyleSheet} from "react-native";
import {mockupHeightToDP, mockupWidthToDP} from "../Parts/utils";


export const MP = StyleSheet.create({
    mv40: {
        marginVertical: mockupHeightToDP(40),
    },
    mv20: {
        marginVertical: mockupHeightToDP(20),
    },
    mr15: {
        marginRight: mockupWidthToDP(15),
    },
    ml10: {
        marginLeft: mockupWidthToDP(10),
    },
    pb15: {
        paddingBottom: mockupHeightToDP(15),
    },
    ml20: {
      marginLeft: mockupWidthToDP(20),
    },
    mt50: {
        marginTop: mockupHeightToDP(50)
    },
    mbminus50: {
        marginBottom: mockupHeightToDP(-50),
    },
    ml130: {
        marginLeft: mockupWidthToDP(130),
    },
    mt80: {
        marginTop: mockupHeightToDP(80),
    },
    mt30pc: {
        marginTop: mockupHeightToDP(400),
    },
    mt40: {
        marginTop: mockupHeightToDP(40),
    },
    plm20: {
        paddingLeft: mockupWidthToDP(-20),
    },
    ph25: {
        paddingHorizontal: mockupWidthToDP(25),
    },
    ph15: {
        paddingHorizontal: mockupWidthToDP(15),
    },
    mt20: {
        marginTop: mockupHeightToDP(20),
    },
    ph20: {
       paddingHorizontal: mockupWidthToDP(20),
    },
    pv20: {
        paddingVertical: mockupWidthToDP(20),
    },
    mb20: {
        marginBottom: mockupHeightToDP(20),
    },
    mr20: {
        marginRight: mockupWidthToDP(20),
    },
    mr10: {
        marginRight: mockupWidthToDP(10),
    },
    mr5: {
        marginRight: mockupWidthToDP(5),
    },
    mt5: {
        marginTop: mockupHeightToDP(5),
    },
    mh15: {
        marginHorizontal: mockupWidthToDP(10),
    }
})