import axios from 'axios';
import {
	SHOW_LOADING, 
	VALIDATION_ERROR, 
	CAN_REDIRECT, 
	SET_TOKEN, 
	REMOVE_TOKEN,
	ADD_BLOG_SUCCESS,
} from '../redux/actionTypes';
import {getSession} from '../library/session_handler';

const BASE_URL = "http://127.0.0.1:8009/";

export const callRegisterAPIPost = (data) => {
	const endPoint = BASE_URL + "register";
	const headers = {
	 	'Content-Type': 'application/json',
	}

	return dispatch => {
		dispatch({
			type: SHOW_LOADING
		});

		axios.post(endPoint, data, {
			headers: headers
		})
		.then(res => {
			const emailError = res.data.email;
			const passwordError = res.data.password;
			const fullNameError = res.data.fullName;
			const status = res.data.status;

			if (status === "false") {
				dispatch({
					type: VALIDATION_ERROR,
					errors: {
						registerEmailError: emailError,
						registerPasswordError: passwordError,
						registerFullNameError: fullNameError,
					},
				});
			} else {
				dispatch({
					type: CAN_REDIRECT,
				});
			}	
		})
		.catch(err => {
			console.log(err);
		});
	}
}

export const callLoginAPIPost = (data) => {
	const endPoint = BASE_URL + "login";
	const headers = {
	 	'Content-Type': 'application/json',
	}

	return dispatch => {
		axios.post(endPoint, data, {
			headers: headers
		})
		.then(res => {
			const emailError = res.data.email;
			const passwordError = res.data.password;
			const status = res.data.status;

			if (status === "false") {
				dispatch({
					type: VALIDATION_ERROR,
					errors: {
						loginEmailError: emailError,
						loginPasswordError: passwordError,
					},
				});
			} else {
				dispatch({
					type: SET_TOKEN,
					token: res.data.token,
				});
			}	
		})
		.catch(err => {
			console.log(err);
		});
	}
}

export const callBlogAPIPost = (data) => {
	const endPoint = BASE_URL + "blog";
	const token = getSession();

	const headers = {
		'x-auth-token': token,
	 	'Content-Type': 'application/json',
	}

	return dispatch => {
		axios.post(endPoint, data, {
			headers: headers
		})
		.then(res => {
			const titleError = res.data.title;
			const contentError = res.data.content;
			const status = res.data.status;

			if (status === "false") {
				dispatch({
					type: VALIDATION_ERROR,
					errors: {
						blogTitleError: titleError,
						blogContentError: contentError,
					},
				});
			} else {
				dispatch({
					type: ADD_BLOG_SUCCESS,
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
	}
}

export const removeToken = () => {
	const endPoint = BASE_URL + "token/remove";
	const token = getSession();

	const headers = {
		'x-auth-token': token,
	 	'Content-Type': 'application/json',
	}

	return dispatch => {
		axios.post(endPoint,{"token": token},{headers: headers})
		.then(res => {
			dispatch({
				type: REMOVE_TOKEN,
			});
		})	
		.catch(err => {
			console.log(err);
		});
	}
}

export const getBlogs = async (isAll) => {
	let endPoint;
	
	if (isAll === 1)	{
		endPoint = BASE_URL + "blog/all";
	} else if(isAll === 2){
		endPoint = BASE_URL + "blog";
	} else {
		endPoint = BASE_URL + "blog/followed";
	}

	const token = getSession();

	const headers = {
		'x-auth-token': token,
	 	'Content-Type': 'application/json',
	};

	const blogs = await axios.get(endPoint, {headers: headers});

	return await blogs;
}

export const getRelationsOfUser = async () => {
	const endPoint = BASE_URL + "relations/user";

	const token = getSession();

	const headers = {
		'x-auth-token': token,
		'Content-Type': 'application/json',
	}

	const relations = await axios.get(endPoint, {headers: headers});

	return await relations;
}

export const followUser = async (email) => {
	const endPoint = BASE_URL + "relations/follow";

	const token = getSession();

	const headers = {
		'x-auth-token': token,
		'Content-Type': 'application/json',
	}

	const status = await axios.post(endPoint, {"email": email} ,{headers: headers});

	return await status;
}

export const alreadyFollowing = async (id) => {
	const endPoint = BASE_URL + "relations/already-following";

	const token = getSession();

	const headers = {
		'x-auth-token': token,
		'Content-Type': 'application/json',
	}

	const followingStatus = await axios.post(endPoint, {"_id": id} ,{headers: headers});

	return await followingStatus;
}

export const loggedInUserDetails = async () => {
	const endPoint = BASE_URL + "user/details";

	const token = getSession();

	const headers = {
		'x-auth-token': token,
		'Content-Type': 'application/json',
	}

	const details = await axios.get(endPoint, {headers: headers});

	return await details;
}

export const getAllRelations = async (userEmail) => {
	const endPoint = BASE_URL + "relations/followers";

	const token = getSession();

	const headers = {
		'x-auth-token': token,
		'Content-Type': 'application/json',
	}

	const relations = await axios.post(endPoint, {"email": userEmail}, {headers: headers});

	return await relations;
}

export const blockUserByEmail = async (userEmail, blockEmail) => {
	const endPoint = BASE_URL + "relations/block";

	const token = getSession();

	const headers = {
		'x-auth-token': token,
		'Content-Type': 'application/json',
	}

	const blockResult = await axios.post(endPoint, {"userEmail": userEmail, "blockEmail": blockEmail}, {headers: headers});

	return await blockResult;
}