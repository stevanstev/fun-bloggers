import axios from 'axios';
import {SHOW_LOADING, VALIDATION_ERROR, CAN_REDIRECT, SET_TOKEN} from '../redux/actionTypes';
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
					type: 'VALIDATION_ERROR',
					errors: {
						blogTitleError: titleError,
						blogContentError: contentError,
					},
				});
			} else {
				dispatch({
					type: 'ADD_BLOG_SUCCESS',
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
	}
}