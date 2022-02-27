import AsyncStorage from "@react-native-async-storage/async-storage";

class CurrentUserProps {
    private _token: string | null;
    constructor() {
        this._token = '';
    }


    get token() {
        return this._token;
    }


    public setToken = async () => {
        await AsyncStorage.getItem('Access_TOKEN').then((el) => {
            try {
               this._token = el;
               console.log(el, 'token')
            } catch (ex) {
                console.log('_useToken ex', ex);
            }
        });
    }
}



export const currentUser = new CurrentUserProps();