import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, UIManager } from 'react-native';
import { goToUserProfileScreenOnBottomButton, StackScreens } from '../Screens/Core/MainNavigationScreen';
import { INavigation } from '../Screens/Core/OverrideNavigation';
import { currentUser } from './CurrentUserProps';
import messaging from '@react-native-firebase/messaging';
import { Requests } from './Requests';
class MainActivity {
  constructor() {}

  private async getToken() {
    return await messaging().getToken();
  }

  public async sendInitialToken(retryCount: number = 3) {
    try {
      if (retryCount === 0) {
        throw 500;
      }
      const token = await this.getToken();
      if (token !== void 0 && token !== null) {
        const response = await Requests.refreshFirebaseToken(token);
        if (response.statusCode !== 200) {
          setTimeout(() => {
            this.syncToken(retryCount--);
          }, 10000);
        } else {
          return true;
        }
      }
    } catch (ex) {
      console.warn('syncToken ex', ex);
      return false;
    }
  }

  public async syncToken(retryCount: number = 3) {
    try {
      if (retryCount === 0) {
        throw 500;
      }
      await messaging().onTokenRefresh(async (token: string) => {
        const response = await Requests.refreshFirebaseToken(token);
        if (response.statusCode !== 200) {
          setTimeout(() => {
            this.syncToken(retryCount--);
          }, 2000);
        } else {
          return true;
        }
      });
    } catch (ex) {
      console.warn('syncToken ex', ex);
      return false;
    }
  }

  public onFailedStart = async () => {
    await AsyncStorage.clear();
    INavigation.navigate(StackScreens.SignIn);
  };

  public onStart = async () => {
    await messaging().requestPermission();
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    goToUserProfileScreenOnBottomButton();
    await currentUser.setToken();
    await AsyncStorage.getItem('Access_TOKEN').then(async (token) => {
      if (token !== void 0 && token !== null) {
        INavigation.navigate(StackScreens.Home);
        await this.sendInitialToken();
        await this.syncToken();
      } else {
        INavigation.navigate(StackScreens.SignIn);
      }
    });
  };
}

export const application = new MainActivity();
