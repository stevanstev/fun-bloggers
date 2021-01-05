import axios from 'axios';

const BASE_URL = "localhost:8009/";

export function callRegisterAPIPost(data) {
	const endPoint = BASE_URL + "register";

	console.log(data);

	axios.post(endPoint, data)
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	});
}