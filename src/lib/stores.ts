import { writable } from 'svelte/store';
import type { User } from './types';
import { getSelf } from './api';

export const UserStore = writable<User>();

export const loadUser = async () => {
	const user = await getSelf();
	UserStore.update((_currentValue) => {
		return user;
	});
};
