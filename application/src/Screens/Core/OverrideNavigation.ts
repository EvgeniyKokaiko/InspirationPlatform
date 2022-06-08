import { createNavigationContainerRef } from '@react-navigation/native';
import { StackScreens } from './MainNavigationScreen';

export class OverrideNavigation {
  private _navigationStack: { path: string; props: any }[] = [];
  private readonly _navigation: any = createNavigationContainerRef();
  private _currentScreen: { path: string; props: any } = { path: '', props: '' };
  private _serviceScreens: string[] = ['SplashComponent', 'SignInComponent', 'SignUpComponent', 'SetupAccountComponent'];
  constructor() {}
  public get navigationStack() {
    return this._navigationStack;
  }

  public get navigation() {
    return this._navigation;
  }

  public navigate = (path: string, props: any = {}) => {
    if (this._navigation === void 0 || this._navigation === null || this._currentScreen.path === path) {
      return;
    }
    if (this._navigation.isReady()) {
      this._navigationStack.push({ path, props });
      this._currentScreen = { path, props };
      this._navigation.navigate(path, props);
    }
  };

  public erase = (can: boolean = false) => {
    if (can) {
      this._navigationStack = [];
      this._currentScreen = { path: '', props: '' };
    }
  };

  public goBack = () => {
    try {
      if (this._navigationStack.length === 0) {
        return;
      }
      let lastPath = this._navigationStack[this._navigationStack.length - 2];
      if (
        this._serviceScreens.includes(lastPath.path) ||
        this._serviceScreens.includes(this._currentScreen.path) ||
        lastPath.path === 'SplashComponent'
      ) {
        return;
      }
      console.log(lastPath);
      this._navigation.navigate(lastPath.path, lastPath.props);
      this._navigationStack.pop();
      this._currentScreen = lastPath;
    } catch (e) {
      console.log(e);
    }
  };
}

export const INavigation = new OverrideNavigation();
