import { axiosAPI } from './../axios';
import type { Table, UserForAdmin } from './../types';
import { loadUser } from './../stores';

export const getTables = async (): Promise<Table[]> => {
	return await axiosAPI.get<Table[]>('/fapi/admin/table').then((res) => res.data);
};

export const getUsers = async (): Promise<UserForAdmin[]> => {
	return await axiosAPI.get<UserForAdmin[]>('/fapi/admin/user').then((res) => res.data);
};

export const deleteUsers = async (ids: string[]) => {
	await axiosAPI({
		method: 'delete',
		url: '/fapi/admin/user',
		data: JSON.stringify(ids),
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

export const setUsersTeacher = async (ids: string[]) => {
	await axiosAPI({
		method: 'patch',
		url: '/fapi/admin/teacher',
		data: JSON.stringify(ids),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	await loadUser();
};
