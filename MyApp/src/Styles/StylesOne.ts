import {StyleSheet} from "react-native";
import {fontSizeDP, mockupHeightToDP, mockupWidthToDP} from "../Parts/utils";
import {colors} from "../Parts/colors";

export const StylesOne = StyleSheet.create({
    screenContainer: {
        flex: 1
    },
    fontLogo: {
        fontFamily: "Metropolis-Bold",
        letterSpacing: 5,
        fontSize: fontSizeDP(56),
        color: colors.SignIn_Font,
    },
    fontInputText: {
        color: colors.SignIn_Font,
        fontSize: fontSizeDP(16),
        fontFamily: "Metropolis-Medium",
        paddingBottom: mockupHeightToDP(20),
    },
    inputContainer: {
        paddingHorizontal: mockupWidthToDP(45),
        marginBottom: mockupHeightToDP(32),
    },
    SignInButton: {
        borderRadius: 60,
        backgroundColor: colors.Primary_Red,
        width: mockupWidthToDP(200),
        height: mockupHeightToDP(50),
    },
    w100: {
        width: "100%",
    },
    h100: {
      height: "100%",
    },

    wh100: {
      width: "100%",
      height: "100%",
    },

    flex_row: {
        flexDirection: 'row',
    },
    flex_column: {
        flexDirection: 'column',
    },

    flex_ai_c: {
      alignItems: 'center',
    },

    flex_jc_c: {
      justifyContent: 'center',
    },

    flexCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadowRed: {
        shadowColor: colors.Primary_Red,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.80,
        shadowRadius: 100,
        elevation: 999,
    },
    SignIn_textStyle: {
        fontFamily: "Metropolis",
        fontWeight: "800",
        fontSize: fontSizeDP(18),
        color: colors.SignIn_Font,
        marginRight: mockupWidthToDP(5),
    },
    SignIn_image: {
        width: mockupWidthToDP(10),
        height: mockupWidthToDP(10),
        resizeMode: 'contain',
    },
    ForgotBtn: {
        fontFamily: "Metropolis",
        fontWeight: "600",
        fontSize: fontSizeDP(18),
        textDecorationLine: "underline",
        color: colors.SignIn_Font,
        textDecorationColor: colors.SignIn_Font,
        paddingBottom: mockupHeightToDP(20),
    },
    PlainText: {
        color: colors.SignIn_Font2,
        fontSize: fontSizeDP(18),
        fontWeight: "800",
        fontFamily: "Metropolis",
    },
})