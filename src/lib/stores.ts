import { writable } from 'svelte/store';
import type { User } from './types';
import { getSelf } from './api';

export const UserStore = writable<User>();

export const loadUser = async () => {
	let user = await getSelf();
	UserStore.update((currentValue) => {
		return user;
	});
};
