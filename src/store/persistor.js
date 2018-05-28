import {applyMiddleware, createStore,compose} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import reduxLogger from 'redux-logger'
import {createEpicMiddleware,combineEpics} from 'redux-observable';
import epics from '../epics/index';
import serviceReduxMiddleware from '../utils/serviceReduxMiddleware';
import createCompressor from 'redux-persist-transform-compress';
import storage from 'redux-persist/lib/storage'
import ApiCode from "../cons/ApiCode";
import actionTypes from "../actions/types";
import reducers from "../reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';
const epicMiddleware = createEpicMiddleware(combineEpics(...epics));
const rootPersistConfig = {
    // transforms: [immutableTransform()],
    key:'root',
    version:1,
    storage,
};
const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options if needed
});
const persistedReducer = persistReducer(rootPersistConfig, reducers);
const initialState = {
    github:{items:[]},
    testObj:{},
    search_username:''
};
export default () => {
    let store = createStore(persistedReducer,initialState, composeEnhancers(applyMiddleware(reduxLogger,serviceReduxMiddleware,epicMiddleware)));
    let persistor = persistStore(store,null,()=>{
        console.log('persist complate');
    });
    // persistor.purge();
    return {store, persistor}
}
