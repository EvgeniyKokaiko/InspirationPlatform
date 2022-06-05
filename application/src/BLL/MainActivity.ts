import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, UIManager } from 'react-native';
import { StackScreens } from '../Screens/Core/MainNavigationScreen';
import { INavigation } from '../Screens/Core/OverrideNavigation';
import { currentUser } from './CurrentUserProps';
import messaging from '@react-native-firebase/messaging';
class MainActivity {
  constructor() {}


  private async appendToken() {
    await messaging().requestPermission();
    const token = await messaging().onTokenRefresh();
  }


  public onStart = async () => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    await currentUser.setToken();
    AsyncStorage.getItem('Access_TOKEN').then((token) => {
      if (typeof token !== 'undefined' && token?.length! > 10) {
        //TODO тут робити проверку чи є інтернет, і якщо нема тоді кажді 20 секунд слати запрос, якщо появився, тоді сразу кидати реквест
        if (true) {
          INavigation.navigate(StackScreens.MyProfile);
        } else {
          INavigation.navigate(StackScreens.MyProfile);
        }
      }
      if (token === null) {
        INavigation.navigate(StackScreens.SignIn);
      }
    });
  };
}

const application = new MainActivity();
