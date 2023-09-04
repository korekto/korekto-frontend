import type { User } from './types';

const imgIndex = Math.random();

let self: User = {
	name: 'Toto',
	role: 'Student',
	avatar_url: `https://thispersondoesnotexist.com/?rand_number=${imgIndex}`,
	admin: false
};

export const getSelf = () => {
	return self;
};

export const setAdmin = (code: string) => {
	if (code === '0') {
		self.admin = true;
	}
};
