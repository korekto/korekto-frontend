import type { GradingTask, Page, Table, UnparseableWebhook, UserForAdmin } from './../types';
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

export const getUnparseableWebhooks = async (
	page: number,
	per_page: number
): Promise<Page<UnparseableWebhook>> => {
	const start = page == 1 ? 0 : (page - 1) * per_page;
	const end = start + per_page;
	const items = mock.unparseable_webhooks.slice(start, end);
	return {
		page: page,
		per_page: per_page,
		total_count: mock.unparseable_webhooks.length,
		total_page: Math.ceil(mock.unparseable_webhooks.length / per_page),
		data: items
	};
};

export const deleteUnparseableWebhooks = async () => {
	mock.unparseable_webhooks.splice(0);
};

export const getGradingTasks = async (
	page: number,
	per_page: number
): Promise<Page<GradingTask>> => {
	const start = page == 1 ? 0 : (page - 1) * per_page;
	const end = start + per_page;
	const items = mock.grading_tasks.slice(start, end);
	return {
		page: page,
		per_page: per_page,
		total_count: mock.grading_tasks.length,
		total_page: Math.ceil(mock.grading_tasks.length / per_page),
		data: items
	};
};

export const recreateDb = async () => {
	console.log('DB recreated, hourray !');
};

export const rerunMigrations = async () => {
	console.log('Migrations re-runned, yay !');
};

export const dropTable = async (tableName: string) => {
	console.log(`Deleted table ${tableName}, meh :/`);
};
