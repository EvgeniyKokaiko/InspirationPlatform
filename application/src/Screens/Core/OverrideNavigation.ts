import {createNavigationContainerRef} from "@react-navigation/native";

export class OverrideNavigation {
  private readonly _navigationStack: string[] = [];
  private readonly _navigation: any = createNavigationContainerRef()
  private _currentScreen: string = "";
  constructor() {}
  get navigationStack() {
    return this._navigationStack;
  }

  get navigation() {
    return this._navigation;
  }

  public navigate = (path: string, props: any = {}) => {
    if (this._navigation === void 0 || this._navigation === null) {
      return;
    }
    if (this._navigation.isReady()) {
      this._currentScreen = path;
      this._navigationStack.push(path);
      this._navigation.navigate(path, props);
    }
  };

  public goBack = () => {
    try {
      if (this._navigationStack.length === 0) {
        return;
      }
      let lastPath = this._navigationStack[this._navigationStack.length - 1]
      if (lastPath === this._currentScreen) {
        lastPath = this._navigationStack[this._navigationStack.length - 2]
      }
      this._navigation.navigate(lastPath);
      this._navigationStack.pop()
      this._currentScreen = lastPath;
    } catch (e) {
      console.log(e)
    }

  };
}


export const INavigation = new OverrideNavigation()
