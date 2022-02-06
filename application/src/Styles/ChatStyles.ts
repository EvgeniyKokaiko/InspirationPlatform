import { StyleSheet } from 'react-native';
import {DEVICE_WIDTH, mockupHeightToDP} from '../Parts/utils';
import { colors } from '../Parts/colors';

export const chatStyles = StyleSheet.create({
  chatHeader: {
    width: '100%',
    height: mockupHeightToDP(50),
    borderBottomWidth: 1,
    borderBottomColor: colors.SignIn_Font2,
  },
  chatContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  chatInput: {
    width: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH,
    height: mockupHeightToDP(55),
    borderTopWidth: 1,
    borderTopColor: colors.SignIn_Font2,
  },
});
