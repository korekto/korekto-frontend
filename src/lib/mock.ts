import type { UserForAdmin, TeacherAssignment } from './types';

export const uuidv4 = () => {
	return crypto.randomUUID();
};

export let users: UserForAdmin[] = [
	{
		id: '42',
		created_at: '2023-03-10T14:05:44Z',
		provider_login: 'toto',
		firstname: 'Mr',
		lastname: 'Toto',
		school_group: 'AB43',
		school_email: 'toto@myschool.com',
		provider_email: 'toto@titi.com',
		teacher: false,
		admin: false,
		modules: []
	},
	{
		id: '43',
		created_at: '2023-03-10T14:05:44Z',
		provider_login: 'titi',
		firstname: 'Mr',
		lastname: 'Titi',
		school_group: 'AB43',
		school_email: 'titi@myschool.com',
		provider_email: 'titi@titi.com',
		teacher: false,
		admin: false,
		modules: []
	}
];

export let modules: TeacherModuleBacked[] = [
	{
		id: '6d8c3b5b-9e68-4b25-85a1-96a000b1701d',
		name: 'Java 101',
		start: new Date('2023-09-14T14:05:44Z'),
		stop: new Date('2023-09-28T20:00:44Z'),
		unlock_key: 'vdjjgvdjhbd-jhbd-65545khbd',
		assignments: []
	},
	{
		id: 'e82f14b5-ea18-4950-b990-b7151cb4cddc',
		name: 'Java 201',
		start: new Date('2023-09-14T14:05:44Z'),
		stop: new Date('2023-09-28T14:05:44Z'),
		unlock_key: '6d8c3b5b-9e68-4b25-85a1-96a000b1701d',
		assignments: []
	}
];

export const deleteUsers = (ids: string[]): void => {
	users = users.filter((u) => !ids.includes(u.id));
};

export const deleteTeacherModules = (ids: string[]): void => {
	modules = modules.filter((m) => !ids.includes(m.id ?? 'should be defined'));
};

export const deleteTeacherAssignments = (module_id: string, assignment_ids: string[]): void => {
	const module = modules.filter((m) => m.id === module_id)[0];
	module.assignments = module.assignments.filter(
		(a) => !assignment_ids.includes(a.id ?? 'should be defined')
	);
};

export type TeacherModuleBacked = {
	id?: string;
	name?: string;
	start?: Date;
	stop?: Date;
	unlock_key?: string;
	assignments: TeacherAssignment[];
};
