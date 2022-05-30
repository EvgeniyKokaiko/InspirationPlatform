import React from 'react';
import {Platform, SafeAreaView, StatusBar, UIManager, View} from 'react-native';
import {connect, Provider} from "react-redux";
import {AnyAction, applyMiddleware, compose, createStore, Store} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import reducers from "./src/redux/reducers/reducers";
import {composeWithDevTools} from 'remote-redux-devtools';
import MainNavigationScreen, {StackScreens} from "./src/Screens/Core/MainNavigationScreen";
import {StylesOne} from "./src/Styles/StylesOne";
import NavContext from './src/Context/NavContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {actionImpl} from "./src/redux/actions";
import {INavigation} from "./src/Screens/Core/OverrideNavigation";
import {modulesImpl} from "./src/redux/actions/modules";
import {currentUser} from "./src/BLL/CurrentUserProps";
import messaging from '@react-native-firebase/messaging';
import { firebase } from '@react-native-firebase/messaging';


type IProps = {
  checkUser(): void;
} & any
type IState = {}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    // @ts-ignore
    this.state = {}
  }

  private onApplicationStarts = async () => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
   await currentUser.setToken();
    AsyncStorage.getItem("Access_TOKEN").then(token => {
      if (typeof token !== "undefined" && token?.length! > 10) {
        //TODO тут робити проверку чи є інтернет, і якщо нема тоді кажді 20 секунд слати запрос, якщо появився, тоді сразу кидати реквест
        this.props.checkUser()
        if (this.props.checkForConnectionReducer.status === 200) {
          INavigation.navigate(StackScreens.MyProfile)
        } else {
          INavigation.navigate(StackScreens.MyProfile)
        }
      }
      if (token === null) {
        INavigation.navigate(StackScreens.SignIn)
      }
    })
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async componentDidMount() {
   await firebase.initializeApp({})
    console.log(messaging)
    try {
      // Notifications.registerRemoteNotifications();
      const token = await messaging().getToken()
      console.log(token);
    } catch(ex) {
      console.log(ex);
    } finally {
      await this.onApplicationStarts();
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
}

export default connect(mapDispatchToProps, {checkUser: actionImpl.checkForConnection, getToken: modulesImpl.getToken})(App);
