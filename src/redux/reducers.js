import {REMOVE_TOKEN, CHECK_TOKEN, SET_TOKEN} from './actionTypes';

const initialState = {
	authToken: ''
}

const rootReducer = (state = initialState, action) => {
	switch(action.type) {
		case REMOVE_TOKEN:
			return {
				...state,
				authToken: ''
			}
		case CHECK_TOKEN:
			return state;
		case SET_TOKEN:
			return {
				...state, 
				authToken: '123123asd'
			}
		default:
			return state;
	}
}

export default rootReducer;