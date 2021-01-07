import {
	AUTH_ROUTE_INDEX, 
	SHOW_LOADING, 
	VALIDATION_ERROR, 
	CAN_REDIRECT, 
	REMOVE_TOKEN, 
	GET_TOKEN, 
	SET_TOKEN
} from '../actionTypes';
import {setSession, getSession, removeSession} from '../../library/session_handler';

const initialState = {
	authRouteIndex: 0,
	isLoading: false, 
	errors: {},
	canRedirect: false, 
	authToken: '',
};

const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case AUTH_ROUTE_INDEX:
			return {
				...state,
				authRouteIndex: action.index
			}
		case SHOW_LOADING:
			return {
				...state, 
				isLoading: true,
			}
		case VALIDATION_ERROR:
			return {
				...state, 
				errors: action.errors,
				isLoading: false,
			}
		case CAN_REDIRECT:
			return {
				...state, 
				canRedirect: !state.canRedirect,
				errors: {},
				isLoading: false,
			}
		case SET_TOKEN:
			setSession(action.token);
			return {
				...state, 
				canRedirect: !state.canRedirect,
				errors: {},
				isLoading: false,
				authToken: action.token,
			}
		case REMOVE_TOKEN:
			removeSession();
			return {
				...state,
				authToken: '',
			}
		case GET_TOKEN:
			let token = getSession();
			return {
				...state,
				authToken: token === null ? "" : token,
			};
		default:
			return state;
	}
}

export default authReducer;