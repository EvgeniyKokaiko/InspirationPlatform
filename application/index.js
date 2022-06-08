/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './src/redux/reducers/reducers';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import React from 'react';
import { application } from './src/BLL/MainActivity';

const RegisterApp = () => {
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerRunnable(appName, async (initial) => {
  try {
    AppRegistry.registerComponent(appName, () => RegisterApp);
    AppRegistry.runApplication(appName, initial);
    await application.onStart();
  } catch (ex) {
    AppRegistry.registerComponent(appName, () => RegisterApp);
    AppRegistry.runApplication(appName, initial);
    await application.onFailedStart();
  }
});
