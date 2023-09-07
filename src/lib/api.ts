import { dev } from '$app/environment';
import { axiosAPI } from './axios';
import type { User, Table } from './types';
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
		await axiosAPI.patch('/fapi/settings/redeem_code', code);
	}
	await loadUser();
};

export const getTables = async () => {
	if (dev) {
		return mock.getTables();
	} else {
        return await axiosAPI.get<Table[]>('/fapi/admin/table').then((res) => res.data);
	}
};
