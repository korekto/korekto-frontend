import { writable } from 'svelte/store';
import type { User } from './types';
import api from './api';

export const UserStore = writable<User>();

export const loadUser = async () => {
	const user = await api.getSelf();
	UserStore.update(() => {
		return user;
	});
};
