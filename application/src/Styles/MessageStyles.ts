import {StyleSheet} from "react-native";
import {colors} from "../Parts/colors";
import {fontSizeDP, mockupHeightToDP, mockupWidthToDP} from "../Parts/utils";


export const MessageStyles = StyleSheet.create({
    messageContainer: {
        paddingHorizontal: mockupWidthToDP(10),
        width: '100%',
    },

    myMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    userMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    myMessageBody: {
        backgroundColor: colors.myMessageBody,
        minWidth: '30%',
        minHeight: mockupHeightToDP(30),
        maxWidth: mockupWidthToDP(250),
        borderRadius: 10,
        borderColor: colors.myMessageBody,
        borderTopRightRadius: 0,
        marginVertical: mockupHeightToDP(5),
        paddingVertical: mockupWidthToDP(2),
        paddingHorizontal: mockupWidthToDP(12),
    },

    userMessageBody: {
        backgroundColor: colors.WhiteChalk,
        minWidth: '30%',
        minHeight: mockupHeightToDP(30),
        maxWidth: mockupWidthToDP(250),
        borderRadius: 10,
        borderColor: colors.myMessageBody,
        borderTopLeftRadius: 0,
        marginVertical: mockupHeightToDP(5),
        paddingVertical: mockupWidthToDP(2),
        paddingHorizontal: mockupWidthToDP(12),
    },


    messageStatus: {
      width: mockupWidthToDP(20),
      height: mockupHeightToDP(20),
        marginLeft: mockupWidthToDP(4),
    },

    messageDate: {
      color: colors.White,
      fontSize: fontSizeDP(11),
      fontFamily: 'SFProDisplay-Regular',
      fontStyle: 'italic',
    },

    ownerMessage: {
        color: colors.PurpleRed,
        fontSize: fontSizeDP(16),
        fontFamily: 'SFProDisplay-Regular',
        fontWeight: '600',
        textDecorationLine: 'underline',
        textDecorationColor: colors.PurpleRed,
        textDecorationStyle: 'solid',
    },

    messageText: {
        color: colors.White,
        fontSize: fontSizeDP(16),
        fontFamily: 'SFProDisplay-Regular',
    },
})