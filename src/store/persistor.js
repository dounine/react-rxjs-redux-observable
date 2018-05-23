import {applyMiddleware, createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import reduxLogger from 'redux-logger'
import {createEpicMiddleware,combineEpics} from 'redux-observable';
import epics from '../epics/index';
import serviceReduxMiddleware from '../utils/serviceReduxMiddleware';
import storage from 'redux-persist/lib/storage'
import ApiCode from "../cons/ApiCode";
import actionTypes from "../actions/types";
import reducers from "../reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';
const epicMiddleware = createEpicMiddleware(combineEpics(...epics));
const persistConfig = {
    transforms: [immutableTransform()],
    key:'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options if needed
});
export default () => {
    let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(reduxLogger,serviceReduxMiddleware,epicMiddleware)));
    let persistor = persistStore(store);
    return {store, persistor}
}
