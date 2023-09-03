import { dev } from '$app/environment';
import { axiosAPI } from './axios';
import type { User } from './types';
import * as mock from './mock';

export const getSelf = async () => {
	if (dev) {
		return mock.getSelf();
	} else {
		return await axiosAPI.get<User>('/fapi/user/self').then((res) => res.data);
	}
};
