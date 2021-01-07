import {createStore} from 'redux';
import globalReducer from './reducers/globalReducer';
import authReducer from './reducers/authReducer';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	globalReducer,
	authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));