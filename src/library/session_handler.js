export const setSession = (token) => {
	localStorage.setItem("session", token);
}

export const getSession = () => {
	return localStorage.getItem("session");
}

export const removeSession = () => {
	localStorage.removeItem("session");
}