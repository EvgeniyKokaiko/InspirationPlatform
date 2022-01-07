import { StyleSheet } from 'react-native';
import { fontSizeDP, mockupHeightToDP, mockupWidthToDP } from '../Parts/utils';
import { colors } from '../Parts/colors';

export const StylesOne = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },

  logoAddition: {
    fontSize: fontSizeDP(24),
    color: colors.SignIn_Font2,
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
});
