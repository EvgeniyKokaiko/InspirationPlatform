import { createNavigationContainerRef } from '@react-navigation/native';
import {StackScreens} from "./MainNavigationScreen";

export class OverrideNavigation {
  private _navigationStack: string[] = [];
  private readonly _navigation: any = createNavigationContainerRef();
  private _currentScreen: string = '';
  private _serviceScreens: string[] = ['SplashComponent', 'SignInComponent', 'SignUpComponent', 'SetupAccountComponent'];
  constructor() {}
  get navigationStack() {
    return this._navigationStack;
  }

  get navigation() {
    return this._navigation;
  }

  public navigate = (path: string, props: any = {}) => {
    if (this._navigation === void 0 || this._navigation === null || this._currentScreen === path) {
      console.log(path, this._currentScreen)
      console.log('stopped')
        return;

    }
    if (this._navigation.isReady()) {
      this._navigationStack.push(path);
      this._currentScreen = path;
      this._navigation.navigate(path, props);
    }
  };

  public erase = (can: boolean = false) => {
    if (can) {
      this._navigationStack = [];
      this._currentScreen = "";
    }
  }

  public goBack = () => {
    try {
      if (this._navigationStack.length === 0) {
        return;
      }
      let lastPath = this._navigationStack[this._navigationStack.length - 1];
      if (lastPath === this._currentScreen) {
        lastPath = this._navigationStack[this._navigationStack.length - 2];
      }
      if (this._serviceScreens.includes(lastPath) || this._serviceScreens.includes(this._currentScreen) || lastPath === "SplashComponent") {
        return;
      }
      this._navigation.navigate(lastPath);
      this._navigationStack.pop();
      this._currentScreen = lastPath;
    } catch (e) {
      console.log(e);
    }
  };
}

export const INavigation = new OverrideNavigation();
