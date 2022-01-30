import AsyncStorage from "@react-native-async-storage/async-storage";

export abstract class BaseAction {
    protected serverURL: string;
    protected constructor(serverURL: string) {
        this.serverURL = serverURL;
    }
    protected _useToken = async (callback: Function) => {
        await AsyncStorage.getItem('Access_TOKEN').then((el: string | null) => {
            try {
                if (callback !== void 0 && typeof el === 'string') {
                    callback(el);
                }
            } catch (ex) {
                console.log('_useToken ex', ex);
            }
        });
    };
}