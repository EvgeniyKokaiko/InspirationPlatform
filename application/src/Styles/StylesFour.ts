import { StyleSheet } from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH, fontSizeDP, mockupHeightToDP, mockupWidthToDP} from '../Parts/utils';
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
  manageAcc_photoBlur: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 999,
    elevation: 9999,
  },
  manageAcc_photoContainer: {
    width: mockupWidthToDP(150),
    height: mockupHeightToDP(150),
    borderRadius: 999,
  },
  manageAcc_avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    position: 'absolute',
  },
  flex_flexFullCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    minHeight: '20%',
  },
  modalBg: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  select_title: {
    fontSize: fontSizeDP(15),
    fontFamily: 'Metropolis-Bold',
    color: "#3A3A3A",
    fontWeight: '500',
    lineHeight: 22,
  },

  select_secTitle: {
    fontSize: fontSizeDP(13),
    fontFamily: 'Metropolis',
    color: "#D51F2C",
    fontWeight: '400',
    lineHeight: 22,
  },

});
