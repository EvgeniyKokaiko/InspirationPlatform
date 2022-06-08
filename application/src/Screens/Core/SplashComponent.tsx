import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { St } from '../../Styles/StylesTwo';
import { mockupWidthToDP } from '../../Parts/utils';
import { backgrounds } from '../../Styles/Backgrounds';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { BaseProps } from '../../Types/Types';
import { actionImpl } from '../../redux/actions';
import { StackScreens } from './MainNavigationScreen';
import { INavigation } from './OverrideNavigation';

type IProps = {} & BaseProps;

const SplashComponent: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const state: any = useSelector((state) => state);
  useEffect(() => {}, []);

  return (
    <View style={[St.SplashComponent, backgrounds.signIn_bg]}>
      <ActivityIndicator size={mockupWidthToDP(60)} color={'white'} />
    </View>
  );
};

export default SplashComponent;
