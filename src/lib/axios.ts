import axios from 'axios';

export const axiosAPI = axios.create();

axiosAPI.interceptors.response.use(
	function (response) {
		handleDates(response.data);
		return response;
	},
	function (error) {
		if (401 === error.response.status) {
			// Reload the page to give the api-backend a chance to redirect to the login page
			location.reload();
		} else {
			return Promise.reject(error);
		}
	}
);

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isIsoDateString(value: any): boolean {
	return value && typeof value === 'string' && isoDateFormat.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleDates(body: any) {
	if (body === null || body === undefined || typeof body !== 'object') return body;

	for (const key of Object.keys(body)) {
		const value = body[key];
		if (isIsoDateString(value)) body[key] = new Date(value);
		else if (typeof value === 'object') handleDates(value);
	}
}
