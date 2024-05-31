import type { ProfileInfo, User } from '$lib/types';
import * as mock from '$lib/mock';
import { loadUser } from '$lib/stores';
import { users } from '$lib/mock';

const imgIndex = Math.random();

export const getSelf = async (): Promise<User> => {
	const backed_user = mock.users[0];
	return {
		firstname: backed_user.firstname,
		lastname: backed_user.lastname,
		school_group: backed_user.school_group,
		school_email: backed_user.school_email,
		role: backed_user.teacher ? 'Teacher' : backed_user.admin ? 'Admin' : 'Student',
		avatar_url: `https://thispersondoesnotexist.com/?rand_number=${imgIndex}`,
		admin: backed_user.admin,
		teacher: backed_user.teacher
	};
};

export const saveProfile = async (profile: ProfileInfo) => {
	const savedProfile = updateProfile(profile);
	await loadUser();
	return savedProfile;
};

export const updateProfile = (profile: ProfileInfo): ProfileInfo => {
	const backed_user = users[0];
	backed_user.firstname = profile.firstname || '';
	backed_user.lastname = profile.lastname || '';
	backed_user.school_group = profile.school_group || '';
	backed_user.school_email = profile.school_email || '';
	return profile;
};

export const redeemCode = async (code: string) => {
	setAdmin(code);
	await loadUser();
};

export const setAdmin = (code: string): void => {
	if (code === '0') {
		users[0].admin = true;
	}
};
