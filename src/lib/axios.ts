import axios from 'axios';

export const axiosAPI = axios.create();

axiosAPI.interceptors.response.use(
	function (response) {
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
