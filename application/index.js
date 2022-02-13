/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./src/redux/reducers/reducers";
import {composeWithDevTools} from "remote-redux-devtools";
import thunk from "redux-thunk";
import React from 'react';

const RegisterApp = () => {
    const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
    return <Provider store={store}><App /></Provider>
}

AppRegistry.registerComponent(appName, () => RegisterApp);
