import type { User, Table, UserForAdmin } from './types';

const imgIndex = Math.random();

let users: UserForAdmin[] = [
	{
		id: '42',
		created_at: '2023-03-10',
		provider_login: 'toto',
		name: 'Toto',
		email: 'toto@titi.com',
		teacher: false,
		admin: false
	},
	{
		id: '43',
		created_at: '2023-03-10',
		provider_login: 'titi',
		name: 'Titi',
		email: 'titi@titi.com',
		teacher: false,
		admin: false
	}
];

export const getSelf = () => {
	let backed_user = users[0];
	let self: User = {
		name: backed_user.name,
		role: backed_user.teacher ? 'Teacher' : backed_user.admin ? 'Admin' : 'Student',
		avatar_url: `https://thispersondoesnotexist.com/?rand_number=${imgIndex}`,
		admin: backed_user.admin
	};
	return self;
};

export const setAdmin = (code: string) => {
	if (code === '0') {
		users[0].admin = true;
	}
};

export const getTables = () => {
	let tables: Table[] = [];
	tables.push({
		name: 'table_1',
		row_count: 4
	});
	tables.push({
		name: 'table_2',
		row_count: 13
	});
	return tables;
};

export const getUsers = () => {
	return users;
};

export const deleteUsers = (ids: string[]) => {
	users = users.filter((u) => !ids.includes(u.id));
};

export const setUsersTeacher = (ids: string[]) => {
	users.filter((u) => ids.includes(u.id)).forEach((u) => (u.teacher = true));
};
