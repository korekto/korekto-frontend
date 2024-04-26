import type { Table, UserForAdmin } from './../types';
import * as mock from './../mock';
import { loadUser } from './../stores';

export const getTables = async (): Promise<Table[]> => {
	return [
		{
			name: 'table_1',
			row_count: 4
		},
		{
			name: 'table_2',
			row_count: 13
		}
	];
};

export const getUsers = async (): Promise<UserForAdmin[]> => {
	return mock.users;
};

export const deleteUsers = async (ids: string[]) => {
	mock.deleteUsers(ids);
};

export const setUsersTeacher = async (ids: string[]) => {
	mock.users.filter((u) => ids.includes(u.id)).forEach((u) => (u.teacher = true));
	await loadUser();
};
