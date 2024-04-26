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

export const module_not_found: TeacherModuleBacked = {
	id: 'not found',
	name: 'not found',
	start: new Date(0),
	stop: new Date(0),
	unlock_key: '-5454285417_46795412354554_47',
	assignments: []
};

export let modules: TeacherModuleBacked[] = [
	{
		id: '6d8c3b5b-9e68-4b25-85a1-96a000b1701d',
		name: 'Java 101',
		start: new Date('2023-09-14T14:05:44Z'),
		stop: new Date('2023-09-28T20:00:44Z'),
		unlock_key: '0',
		assignments: [
			{
				id: '1234',
				type: 'exercise',
				name: 'Java basics',
				start: new Date('2023-09-14T14:05:44Z'),
				stop: new Date('2023-09-28T20:00:44Z'),
				description: 'Learn the basics of Java syntax',
				subject_url: 'toto',
				grader_url: 'toto',
				repository_name: 'toto',
				factor_percentage: 10,
				grader_run_url: 'toto',
				linked: true,
				grade: 12.3
			},
			{
				id: '4567',
				type: 'exercise',
				name: 'Maven training',
				start: new Date('2023-09-14T14:05:44Z'),
				stop: new Date('2023-09-28T20:00:44Z'),
				description: 'Learn to setup a Maven project',
				subject_url: 'toto',
				grader_url: 'toto',
				repository_name: 'toto',
				factor_percentage: 15,
				grader_run_url: 'toto',
				linked: false,
				grade: 0
			}
		]
	},
	{
		id: 'e82f14b5-ea18-4950-b990-b7151cb4cddc',
		name: 'Java 201',
		start: new Date('2023-09-14T14:05:44Z'),
		stop: new Date('2023-09-28T14:05:44Z'),
		unlock_key: '1',
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
	assignments: AssignmentBacked[];
};

export type AssignmentState = {
	linked: boolean;
	grade: number;
};

export type AssignmentBacked = TeacherAssignment & AssignmentState;
