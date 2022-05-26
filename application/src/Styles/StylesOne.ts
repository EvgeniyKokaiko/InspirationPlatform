import { Platform, StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH, fontSizeDP, mockupHeightToDP, mockupWidthToDP } from '../Parts/utils';
import { colors } from '../Parts/colors';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

export const safeAreaInsetsTop = Platform.OS === 'ios' ? StaticSafeAreaInsets.safeAreaInsetsTop : 0;
export const StylesOne = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },

  absolute: {
    position: 'absolute',
  },

  logoAddition: {
    fontSize: fontSizeDP(24),
    color: colors.SignIn_Font2,
  },


  w15: {
    width: '15%',
  },

  w70: {
    width: '70%',
  },

  w55: {
    width: '55%',
  },
  w58: {
    width: '58%',
  },

  w30: {
    width: '30%',
  },
  w25: {
    width: '25%',
  },

  w28: {
    width: '28%',
  },

  w85: {
    width: '85%',
  },

  rounded: {
    borderRadius: 999,
  },

  flex1: {
    flex: 1,
  },

  minWidth15: {
    minWidth: '15%',
  },

  width70: {
    minWidth: '70%',
    maxWidth: '70%',
  },

  wImageCarousel: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },

  width15: {
    minWidth: '15%',
    maxWidth: '15%',
  },

  searchPane: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: mockupWidthToDP(15),
    marginVertical: mockupHeightToDP(10),
    height: mockupHeightToDP(50),
  },

  searchPane_input: {
    height: mockupHeightToDP(50),
    marginTop: mockupHeightToDP(5),
    width: '90%',
  },

  commentInput: {
    borderColor: colors.WhiteChalk,
    width: '100%',
    backgroundColor: colors.WhiteChalk,
  },

  fontLogo: {
    fontFamily: 'Metropolis-Bold',
    letterSpacing: 5,
    fontSize: fontSizeDP(56),
    color: colors.SignIn_Font,
  },
  fontLogo_black: {
    fontFamily: 'Metropolis-Bold',
    letterSpacing: 5,
    fontSize: fontSizeDP(56),
    color: colors.SignIn_Font2,
  },
  fontInputText: {
    color: colors.SignIn_Font,
    fontSize: fontSizeDP(16),
    fontFamily: 'Metropolis-Medium',
    paddingBottom: mockupHeightToDP(20),
  },
  fontInputText_black: {
    color: colors.SignIn_Font2,
    fontSize: fontSizeDP(16),
    fontFamily: 'Metropolis-Medium',
    paddingBottom: mockupHeightToDP(20),
  },
  fontInputText_black14: {
    color: colors.SignIn_Font2,
    fontSize: fontSizeDP(16),
    fontFamily: 'SFProDisplay-Regular',
    paddingBottom: mockupHeightToDP(20),
  },

  inputContainer: {
    marginBottom: mockupHeightToDP(32),
    paddingHorizontal: mockupWidthToDP(15),
  },
  SignInButton: {
    borderRadius: 60,
    backgroundColor: colors.Primary_Red,
    width: mockupWidthToDP(200),
    height: mockupHeightToDP(50),
  },


  wh25: {
    width: mockupWidthToDP(25),
    height: mockupHeightToDP(25)
  },


  wh35: {
    width: mockupWidthToDP(35),
    height: mockupHeightToDP(35)
  },

  PickerButton: {
    borderRadius: 60,
    backgroundColor: colors.SignIn_Font2,
    width: mockupWidthToDP(200),
    height: mockupHeightToDP(50),
  },
  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },

  h80: {
     height : "90%",
  },

  wh100: {
    width: '100%',
    height: '100%',
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

  flex_jc_fs: {
    justifyContent: 'flex-start',
  },
  flex_jc_fe: {
    justifyContent: 'flex-end',
  },

  flex_jc_sb: {
    justifyContent: 'space-between',
  },

  flex_jc_sa: {
    justifyContent: 'space-around',
  },

  flex_jc_se: {
    justifyContent: 'space-evenly',
  },


  image24: {
    width: mockupWidthToDP(16),
    height: mockupWidthToDP(16),
    resizeMode: 'contain',
  },

  image20: {
    width: mockupWidthToDP(20),
    height: mockupWidthToDP(20),
    resizeMode: 'contain',
  },

  image25: {
    width: mockupWidthToDP(25),
    height: mockupWidthToDP(25),
    resizeMode: 'contain',
  },

  image40: {
    width: mockupWidthToDP(40),
    height: mockupWidthToDP(40),
    resizeMode: 'contain',
  },

  image30: {
    width: mockupWidthToDP(30),
    height: mockupWidthToDP(30),
    resizeMode: 'contain',
  },

  rm_c: {
    resizeMode: 'contain',
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
    shadowOpacity: 0.8,
    shadowRadius: 100,
    elevation: 999,
  },
  SignIn_textStyle: {
    fontFamily: 'Metropolis',
    fontWeight: '800',
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
    fontFamily: 'Metropolis',
    fontWeight: '600',
    fontSize: fontSizeDP(18),
    textDecorationLine: 'underline',
    color: colors.SignIn_Font,
    textDecorationColor: colors.SignIn_Font,
    paddingBottom: mockupHeightToDP(20),
  },
  PlainText: {
    color: colors.SignIn_Font2,
    fontSize: fontSizeDP(18),
    fontWeight: '800',
    fontFamily: 'Metropolis',
  },

  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: colors.inactive_btn,
  },

  flex_center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wh200px: {
    width: mockupWidthToDP(200),
    height: mockupWidthToDP(200),
  },

  whc_img100: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  CheckBox_text: {
    fontSize: fontSizeDP(20),
    fontFamily: 'Metropolis',
    fontWeight: '800',
    color: colors.SignIn_Font2,
  },
  CheckBox_terms: {
    fontSize: fontSizeDP(20),
    fontFamily: 'Metropolis',
    fontWeight: '800',
    color: colors.Primary_Red,
    textDecorationLine: 'underline',
    textDecorationColor: colors.Primary_Red,
  },
  SendBtn_active_text: {
    fontFamily: 'Metropolis',
    fontWeight: '800',
    fontSize: fontSizeDP(18),
    color: colors.SignIn_Font,
  },
  SendBtn_active_button: {
    backgroundColor: colors.Primary_Red,
    width: mockupWidthToDP(255),
    height: mockupHeightToDP(50),
    borderRadius: 40,
  },
  SendBtn_inactive_button: {
    backgroundColor: colors.inactive_btn,
    width: mockupWidthToDP(255),
    height: mockupHeightToDP(50),
    borderRadius: 40,
  },
  SendBtn_inactive_text: {
    fontFamily: 'Metropolis',
    fontWeight: '800',
    fontSize: fontSizeDP(18),
    color: colors.inactive,
  },

  DropdownStyles: {
    color: colors.Placeholder,
    fontSize: fontSizeDP(16),
    fontFamily: 'Metropolis-Medium',
    height: mockupHeightToDP(60),
    marginLeft: mockupWidthToDP(-15),
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.Underline_rgba_black,
    height: 2,
    marginLeft: mockupWidthToDP(15),
  },

  cInactive: {
    color: colors.Placeholder,
  },
  following_title: {
    fontSize: fontSizeDP(15),
    color: colors.absoluteBlack,
    fontFamily: 'SFProDisplay-Bold',
  },

  requests_username: {
    fontSize: fontSizeDP(15),
    color: colors.SignIn_BG,
    fontWeight: '600',
  },
  requests_fullName: {
    fontSize: fontSizeDP(13),
    color: colors.Dark,
    fontWeight: '400',
  },
  requests_accept: {
   borderRadius: mockupWidthToDP(5),
    width: mockupWidthToDP(80),
    height: mockupHeightToDP(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.acceptColor
  },
  followerListButton: {
    borderRadius: mockupWidthToDP(5),
    width: mockupWidthToDP(80),
    height: mockupHeightToDP(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.WhiteChalk,
    borderWidth: 2,
  },
  requests_decline: {
    borderRadius: mockupWidthToDP(5),
    width: mockupWidthToDP(80),
    height: mockupHeightToDP(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.declineColor
  },
});
