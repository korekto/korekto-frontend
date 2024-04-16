import { dev } from '$app/environment';
import { axiosAPI } from './axios';
import type { ProfileInfo, User } from './types';
import * as mock from './mock';
import { loadUser } from './stores';

export * from './api/admin';
export * from './api/assignment';
export * from './api/module';

export const getSelf = async (): Promise<User> => {
	if (dev) {
		return mock.getSelf();
	} else {
		return await axiosAPI.get<User>('/fapi/user/self').then((res) => res.data);
	}
};

export const saveProfile = async (profile: ProfileInfo) => {
	let savedProfile;
	if (dev) {
		savedProfile = mock.updateProfile(profile);
	} else {
		savedProfile = await axiosAPI
			.put<ProfileInfo>('/fapi/user/self', profile)
			.then((res) => res.data);
	}
	await loadUser();
	return savedProfile;
};

export const redeemCode = async (code: string) => {
	if (dev) {
		mock.setAdmin(code);
	} else {
		await axiosAPI.patch('/fapi/settings/redeem_code', code);
	}
	await loadUser();
};
