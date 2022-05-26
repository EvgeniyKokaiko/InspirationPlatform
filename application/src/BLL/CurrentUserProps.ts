import AsyncStorage from "@react-native-async-storage/async-storage";

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
    }
}



export const currentUser = new CurrentUserProps();