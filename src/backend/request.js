import { SESSION_HEADER_KEY, API_URL } from "../utils/constants";
import { getSessionId } from "../local";

async function perform(code, details, isAuth = false) {
	const url = API_URL + code;
	console.log("params:", details);
	const headers = {};
	if(isAuth){
		headers[SESSION_HEADER_KEY] = getSessionId();		
	}
	return (
		fetch(url, {
			method: "POST",
			timeout: 4000,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				...headers
			},
			body: JSON.stringify(details),
		})
			//.then((response) => response.json())
			.then((response) => response.text())
			.then((res) => {
				console.log(res);
				return JSON.parse(res);
				//return res;
			})
			.catch((error) => {
				console.log(error);
				return false;
			})
	);
}

export { perform };