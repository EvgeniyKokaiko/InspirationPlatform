import { StyleSheet } from 'react-native';
import { fontSizeDP, mockupHeightToDP, mockupWidthToDP } from '../Parts/utils';
import { colors } from '../Parts/colors';

export const StylesFour = StyleSheet.create({
  myNewsLine_List: {
    width: '100%',
    height: '100%',
    paddingHorizontal: mockupWidthToDP(10),
    paddingTop: mockupHeightToDP(30),
  },
  myNewsLine_owner: {
    fontFamily: `SFProDisplay-Regular`,
    fontWeight: 'bold',
    fontSize: fontSizeDP(16),
    lineHeight: 24,
    color: colors.ownerDark,
  },
  myNewsLine_date: {
    fontFamily: `SFProDisplay-Regular`,
    fontWeight: '500',
    fontSize: fontSizeDP(13),
    lineHeight: 24,
    color: colors.dateGray,
  },
  myNewsLine_caption: {
    fontFamily: `SFProDisplay-Regular`,
    fontWeight: '400',
    fontSize: fontSizeDP(18),
    lineHeight: 24,
    color: colors.ownerDark,
  },
  myNewsLine_avatar: {
    width: mockupWidthToDP(50),
    height: mockupHeightToDP(50),
    borderRadius: 15,
  },
  myNewsLine_img: {
    width: '100%',
    height: mockupHeightToDP(600),
    zIndex: 999,
    resizeMode: 'stretch',
  },
});
