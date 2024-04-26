import type { ProfileInfo, User } from '$lib/types';
import { axiosAPI } from '$lib/axios';
import { loadUser } from '$lib/stores';

export const getSelf = async (): Promise<User> => {
	return await axiosAPI.get<User>('/fapi/user/self').then((res) => res.data);
};

export const saveProfile = async (profile: ProfileInfo) => {
	const savedProfile = await axiosAPI
		.put<ProfileInfo>('/fapi/user/self', profile)
		.then((res) => res.data);
	await loadUser();
	return savedProfile;
};

export const redeemCode = async (code: string) => {
	await axiosAPI.patch('/fapi/settings/redeem_code', code);
	await loadUser();
};
