import {StyleSheet} from "react-native";
import {colors} from "../Parts/colors";
import {DEVICE_WIDTH, fontSizeDP, mockupHeightToDP, mockupWidthToDP} from "../Parts/utils";


export const St = StyleSheet.create({
    blackArrow: {
        tintColor: colors.Dark,
    },
    h190: {
        height: mockupHeightToDP(200),
    },
    borderRadius30: {
        borderRadius: 30,
    },
    avatar: {
      borderRadius: 30,
    },
    verticalLine: {
        backgroundColor: colors.WhiteChalk,
        width: 1,
        height: "60%"
    },
    myAccButtonsHeader: {
        fontFamily: "SFProDisplay-Black",
        fontWeight: "800",
        fontSize: fontSizeDP(18),
        color: colors.PurpleRed,
    },
    myAccButtonsDescr: {
        fontFamily: "SFProDisplay-Light",
        fontSize: fontSizeDP(16),
        fontWeight: "400",
        color: colors.Dark,
        letterSpacing: 1.5,
    },
    myAccName: {
        fontFamily: "SFProDisplay-Bold",
        fontSize: fontSizeDP(18),
        color: colors.absoluteBlack,
    },
    myAccDescr: {
        fontFamily: "SFProDisplay-Regular",
        fontSize: fontSizeDP(16),
        color: colors.WhiteChalk,
    },
    w240: {
        width: mockupWidthToDP(225),
    },
    imgIcon: {
        width: mockupWidthToDP(30),
        height: mockupHeightToDP(30),
        resizeMode: 'contain',
    },
    postListStyles: {
        width: "100%",
        height: "70%",
        backgroundColor: colors.WhiteAlice,
        marginTop: mockupHeightToDP(20),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderRadius: 30,
        flexDirection: "column",
        flexWrap: "wrap",
        padding: 0,
        paddingTop: mockupHeightToDP(15),
    },
    postListItem: {
        width: mockupWidthToDP(145),
        height: mockupWidthToDP(150),
        resizeMode: 'contain',
        borderRadius: 30,
        marginHorizontal: mockupWidthToDP(8),
        marginBottom: mockupHeightToDP(15),
        zIndex: 9999,
        elevation: 9999,
    },
    borderImage: {
        borderRadius: 30,
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: mockupHeightToDP(80),
    },
    BottomNavigationStyles: {
        position: 'absolute',
        bottom: 0,
        height: mockupHeightToDP(70),
        width: DEVICE_WIDTH,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: colors.White
    },
    BottomNavigationItem: {
      width: mockupWidthToDP(30),
      height: mockupWidthToDP(30),
    },
})