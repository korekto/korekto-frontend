import axios from 'axios';

export const axiosAPI = axios.create();

axiosAPI.interceptors.response.use(
	function (response) {
		handleDates(response.data);
		return response;
	},
	function (error) {
		if (401 === error.response.status) {
			// Reload the page to give the server a chance to redirect to the login page
			location.reload();
		} else {
			return Promise.reject(error);
		}
	}
);

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

function isIsoDateString(value: any): boolean {
	// eslint-disable-line @typescript-eslint/no-explicit-any
	return value && typeof value === 'string' && isoDateFormat.test(value);
}

export function handleDates(body: any) {
	// eslint-disable-line @typescript-eslint/no-explicit-any
	if (body === null || body === undefined || typeof body !== 'object') return body;

	for (const key of Object.keys(body)) {
		const value = body[key];
		if (isIsoDateString(value)) body[key] = new Date(value);
		else if (typeof value === 'object') handleDates(value);
	}
}
