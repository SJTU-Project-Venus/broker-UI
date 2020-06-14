import { createStore, combineReducers } from 'redux';
import {persistStore, persistReducer} from 'redux-persist'
import baseReducer from '../reducer/BaseReducer';
import storage from 'redux-persist/es/storage';

const reducer = combineReducers({
	base: persistReducer({
		key: 'base',
		storage: storage
	}, baseReducer)
});

const store = createStore(reducer);

export const persistor = persistStore(store)
export default store;
