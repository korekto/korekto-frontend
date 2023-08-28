import type { User } from './types';

export const getSelf = () => {
	var imgIndex = Math.random();
	const user: User = {
		name: 'Toto',
		role: 'Student',
		avatar_url: `https://thispersondoesnotexist.com/?rand_number=${imgIndex}`
	};
	return user;
};
