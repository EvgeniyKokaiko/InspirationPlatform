import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { StackScreens } from '../Screens/Core/MainNavigationScreen';
import { INavigation } from '../Screens/Core/OverrideNavigation';
import { application } from './MainActivity';
import { Requests } from './Requests';

class CurrentUserProps {
  private _token: string | null;
  private _currentUserId: string | null;
  constructor() {
    this._token = '';
    this._currentUserId = '';
  }

  get currentUserId(): string | null {
    return this._currentUserId;
  }

  get token() {
    return this._token;
  }

  public authorize = async (username: string, password: string, preloader?: (value: boolean) => void) => {
    if (username === void 0 || username === null || username === '' || username === ' ') {
      Alert.alert('Warning!', 'Username is invalid');
      return;
    }
    if (password === void 0 || password === null || password === '' || password === ' ') {
      Alert.alert('Warning!', 'Password is invalid');
      return;
    }
    if (preloader) {
      preloader(true);
    }
    const response = await Requests.authorize(username, password);
    if (response.statusCode === 200) {
      this._currentUserId = username;
      this._token = response.data;
      await this.saveUser();
      await application.sendInitialToken();
      if (preloader) {
        preloader(false);
      }
      INavigation.navigate(StackScreens.Home, {});
    } else {
      if (preloader) {
        preloader(false);
      }
      console.warn(response);
      Alert.alert('Warning!', response.statusMessage);
      return;
    }
  };

  private saveUser = async () => {
    await AsyncStorage.setItem('currentUserId', this._currentUserId as string);
    await AsyncStorage.setItem('Access_TOKEN', this._token as string);
  };

  public setToken = async () => {
    await AsyncStorage.getItem('currentUserId').then((el) => {
      try {
        this._currentUserId = el;
      } catch (ex) {
        console.log('_useToken ex', ex);
      }
    });
    await AsyncStorage.getItem('Access_TOKEN').then((el) => {
      try {
        this._token = el;
      } catch (ex) {
        console.log('_useToken ex', ex);
      }
    });
  };
}

export const currentUser = new CurrentUserProps();
