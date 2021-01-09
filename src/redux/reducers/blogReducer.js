import {
	ADD_BLOG_SUCCESS,
	VALIDATION_ERROR,
	CLEAR_ERROR_STATE,
	FETCH_BLOGS_SUCCESS,
} from '../actionTypes';

const initialState = {
	blogs: [],
	currentPageIndex: 0,
	errors: {},
	success: false,
}

const blogReducer = (state = initialState, event) => {
	switch(event.type) {
		case ADD_BLOG_SUCCESS: 
			return {
				...state,
				errors: {},
				success: true,
			};
		case VALIDATION_ERROR:
			return {
				...state,
				errors: event.errors,
			}
		case CLEAR_ERROR_STATE:
			return {
				...state,
				errors: {},
				success: false,
			}
		case FETCH_BLOGS_SUCCESS:
			return {
				...state,
				blogs: event.blogs,
				currentPageIndex: event.currentPageIndex,
			}
		default:
			return state;
	}
}

export default blogReducer;