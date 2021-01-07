export const setSession = (token) => {
	localStorage.setItem("session", token);
}

export const getSession = () => {
	return localStorage.getItem("session");
}

export const removeSession = () => {
	console.log('deleting');
	localStorage.removeItem("session");
}