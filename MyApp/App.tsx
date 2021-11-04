import React from 'react';
import {View} from 'react-native';
import {Provider} from "react-redux";
import {AnyAction, applyMiddleware, compose, createStore, Store} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import reducers from "./src/redux/reducers/reducers";
import {composeWithDevTools} from 'remote-redux-devtools';
import MainNavigationScreen from "./src/Screens/Core/MainNavigationScreen";



type IProps = {}
type IState = {}

class App extends React.Component<IProps, IState> {
    private store: Store;
constructor(props: IState) {
    super(props);
    this.store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
    this.storeLogger();
}

    private storeLogger = () => {
        console.table('Redux STORE',this.store.getState())
    }

    render () {
        return (
            <Provider store={this.store}>
                <MainNavigationScreen />
            </Provider>
        )
    }
}

export default App;
