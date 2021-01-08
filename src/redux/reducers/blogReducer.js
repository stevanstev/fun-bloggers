const initialState = {
	blogs: {},
	errors: {},
	success: false,
}

const blogReducer = (state = initialState, event) => {
	switch(event.type) {
		case "ADD_BLOG_SUCCESS": 
			return {
				...state,
				errors: {},
				success: true,
			};
		case "VALIDATION_ERROR":
			return {
				...state,
				errors: event.errors,
			}
		case "CLEAR_ERROR_STATE":
			return {
				...state,
				errors: {},
				success: false,
			}
		default:
			return state;
	}
}

export default blogReducer;