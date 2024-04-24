import { axiosAPI } from './axios';
import type { ProfileInfo, User } from './types';
import * as mock from './mock';
import { loadUser } from './stores';

export * from './api/admin';
export * from './api/assignment';
export * from './api/module';

export const getSelf = async (): Promise<User> => {
	console.log('MODE: ' + import.meta.env.MODE);
	if (import.meta.env.MODE === 'development') {
		return mock.getSelf();
	} else {
		return await axiosAPI.get<User>('/fapi/user/self').then((res) => res.data);
	}
};

export const saveProfile = async (profile: ProfileInfo) => {
	let savedProfile;
	if (import.meta.env.MODE === 'development') {
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
	if (import.meta.env.MODE === 'development') {
		mock.setAdmin(code);
	} else {
		await axiosAPI.patch('/fapi/settings/redeem_code', code);
	}
	await loadUser();
};
