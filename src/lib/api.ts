import { dev } from '$app/environment';
import { axiosAPI } from './axios';
import type { User } from './types';
import * as mock from './mock';
import { loadUser } from './stores';

export const getSelf = async () => {
	if (dev) {
		return mock.getSelf();
	} else {
		return await axiosAPI.get<User>('/fapi/user/self').then((res) => res.data);
	}
};

export const redeemCode = async (code: string) => {
    if (dev) {
        mock.setAdmin(code);
    } else {
        await axiosAPI.post('/fapi/settings/redeem_code');
    }
    await loadUser();
}
