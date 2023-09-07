import type { User, Table } from './types';

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
