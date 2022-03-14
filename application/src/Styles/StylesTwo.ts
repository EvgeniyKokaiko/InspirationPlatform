import { StyleSheet } from 'react-native';
import { colors } from '../Parts/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, fontSizeDP, mockupHeightToDP, mockupWidthToDP } from '../Parts/utils';

export const St = StyleSheet.create({
  blackArrow: {
    tintColor: colors.Dark,
  },

  w100: {
    width: '100%',
  },

  addPhotoBtn: {
    backgroundColor: colors.Dark,
    width: mockupWidthToDP(75),
    height: mockupWidthToDP(75),
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wh80: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },

  h190: {
    height: mockupHeightToDP(200),
  },
  borderRadius30: {
    borderRadius: 30,
  },

  borderRadius14: {
    borderRadius: 14,
  },
  avatar: {
    borderRadius: 14,
  },

  horizontalLine: {
    backgroundColor: colors.inactive_btn,
    width: '100%',
    height: 0.4,
    marginBottom: mockupHeightToDP(15)
  },
  verticalLine: {
    backgroundColor: colors.WhiteChalk,
    width: 1,
    height: '60%',
  },
  myAccButtonsHeader: {
    fontFamily: 'SFProDisplay-Black',
    fontWeight: '800',
    fontSize: fontSizeDP(18),
    color: colors.PurpleRed,
  },
  myAccButtonsDescr: {
    fontFamily: 'SFProDisplay-Light',
    fontSize: fontSizeDP(16),
    fontWeight: '400',
    color: colors.Dark,
    letterSpacing: 1.5,
  },
  myAccName: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: fontSizeDP(18),
    color: colors.absoluteBlack,
  },
  myAccDescr: {
    fontFamily: 'SFProDisplay-Regular',
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
    width: '100%',
    height: '70%',
    backgroundColor: colors.WhiteAlice,
    marginTop: mockupHeightToDP(20),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 30,
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 0,
    paddingTop: mockupHeightToDP(15),
  },

  zIndex2: {
    zIndex: 2,
    elevation: 2,
  },

  zIndex999: {
    zIndex: 999,
    elevation: 999,
  },

  image100: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  image20: {
    width: mockupWidthToDP(20),
    height: mockupWidthToDP(20),
    resizeMode: 'contain',
  },

  round100image40: {
    width: mockupWidthToDP(50),
    height: mockupWidthToDP(50),
    borderRadius: 999,
  },

  round100image35: {
    width: mockupWidthToDP(40),
    height: mockupWidthToDP(40),
    borderRadius: 999,
    resizeMode: 'contain',
  },

  image15: {
    width: mockupWidthToDP(24),
    height: mockupWidthToDP(24),
    resizeMode: 'contain',
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
    paddingBottom: mockupHeightToDP(150),
  },
  BottomNavigationStyles: {
    position: 'absolute',
    bottom: 0,
    height: mockupHeightToDP(70),
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.White,
    zIndex: 10,
    elevation: 10,
  },
  BottomNavigationItem: {
    width: mockupWidthToDP(30),
    height: mockupWidthToDP(30),
  },

  SplashComponent: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    zIndex: 99999,
    elevation: 99999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  FullScreenPreloader: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    position: 'absolute',
    zIndex: 99,
    elevation: 99,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //MODAL
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '90%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  modalWidth: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  exitButton: {
    position: 'absolute',
    right: mockupWidthToDP(3),
    top: mockupHeightToDP(9),
    width: mockupWidthToDP(30),
    height: mockupWidthToDP(30),
    zIndex: 999,
    elevation: 999,
  },
  deletePost: {
    position: 'absolute',
    right: mockupWidthToDP(30),
    top: mockupHeightToDP(9),
    width: mockupWidthToDP(30),
    height: mockupWidthToDP(30),
    zIndex: 999,
    elevation: 999,
  },
  ownerText: {
    fontSize: fontSizeDP(24),
    fontFamily: 'SFProDisplay-Regular',
    fontWeight: '600',
    color: colors.Dark,
    alignItems: 'center',
    marginBottom: mockupHeightToDP(20),
    marginTop: mockupHeightToDP(-12),
  },

  ownerTextWithoutOffsets: {
    fontSize: fontSizeDP(17),
    fontFamily: 'SFProDisplay-Regular',
    fontWeight: '600',
    color: colors.absoluteBlack,
    marginBottom: mockupHeightToDP(6),
  },

  ownerText_second: {
    fontSize: fontSizeDP(17),
    fontFamily: 'SFProDisplay-Regular',
    fontWeight: '600',
    color: colors.absoluteBlack,
  },

  image100modal: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: colors.WhiteChalk,
  },
  PhotoList: {
    height: '80%',
  },
  PhotoListhund: {
    paddingBottom: mockupHeightToDP(100),
  },

  PhotoListItem: {
    width: '100%',
    height: '100%',
    marginBottom: 999,
  },
});
