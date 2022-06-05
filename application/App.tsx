import React from 'react';
import { Platform, SafeAreaView, StatusBar, UIManager } from 'react-native';
import { connect } from 'react-redux';
import MainNavigationScreen, { StackScreens } from './src/Screens/Core/MainNavigationScreen';
import { StylesOne } from './src/Styles/StylesOne';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionImpl } from './src/redux/actions';
import { INavigation } from './src/Screens/Core/OverrideNavigation';
import { modulesImpl } from './src/redux/actions/modules';
import { currentUser } from './src/BLL/CurrentUserProps';
import messaging from '@react-native-firebase/messaging';

type IProps = {
  checkUser(): void;
} & any;
type IState = {};

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    // @ts-ignore
    this.state = {};
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  render() {
    return (
      <SafeAreaView style={StylesOne.screenContainer}>
        <StatusBar />
        <MainNavigationScreen />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (state: any) => {
  return state;
};

export default connect(mapDispatchToProps, { checkUser: actionImpl.checkForConnection, getToken: modulesImpl.getToken })(App);
