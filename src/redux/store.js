import {createStore} from 'redux';
import globalReducer from './reducers/globalReducer';
import blogReducer from './reducers/blogReducer';
import authReducer from './reducers/authReducer';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	globalReducer,
	authReducer,
	blogReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));