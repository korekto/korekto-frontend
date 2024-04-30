import type { UserForAdmin, TeacherAssignment, UnparseableWebhook } from './types';

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

export const module_not_found: ModuleBacked = {
	id: 'not found',
	name: 'not found',
	start: new Date(0),
	stop: new Date(0),
	unlock_key: '-5454285417_46795412354554_47',
	assignments: [],
	locked: true
};

export let modules: ModuleBacked[] = [
	{
		id: '6d8c3b5b-9e68-4b25-85a1-96a000b1701d',
		name: 'Java 101',
		description: 'Lean the basics of the Java language',
		start: new Date('2023-09-14T14:05:44Z'),
		stop: new Date('2023-09-28T20:00:44Z'),
		unlock_key: '0',
		locked: false,
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
				grade: 12.3,
				locked: false
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
				grade: 0,
				locked: true
			}
		]
	},
	{
		id: 'e82f14b5-ea18-4950-b990-b7151cb4cddc',
		name: 'Java 201',
		description: 'Lean how Java is used in enterprises',
		start: new Date('2023-09-14T14:05:44Z'),
		stop: new Date('2023-09-28T14:05:44Z'),
		unlock_key: '1',
		locked: true,
		assignments: []
	}
];

const inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
const generateText = (length: number): string => {
	let text: string = '';
	for (let i = 0; i < length; i++) {
		text += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
	}
	return text;
};

export const unparseable_webhooks: UnparseableWebhook[] = new Array(32);

for (let index = 0; index < unparseable_webhooks.length; index++) {
	const text_length = Math.random() * 170 + 30;
	const json_value = generateText(text_length);
	unparseable_webhooks[index] = {
		index: index,
		created_at: new Date('2023-09-14T14:05:44Z'),
		origin: 'github',
		event: 'machin',
		payload: `{"big json payload": "${json_value}"}`,
		error: 'some error'
	};
}

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

export type ModuleState = {
	locked: boolean;
};

export type TeacherModule = {
	id?: string;
	name?: string;
	description?: string;
	start?: Date;
	stop?: Date;
	unlock_key?: string;
	assignments: AssignmentBacked[];
};

export type ModuleBacked = TeacherModule & ModuleState;

export type AssignmentState = {
	linked: boolean;
	grade: number;
	locked: boolean;
};

export type AssignmentBacked = TeacherAssignment & AssignmentState;

export type HavingAssignments = {
	assignments: AssignmentWithGrade[];
};

export type AssignmentWithGrade = {
	factor_percentage?: number;
	grade: number;
};

export const grade = (m: HavingAssignments): number => {
	return m.assignments
		.map((a) => (a.grade * (a.factor_percentage ?? 0)) / 100)
		.reduce((acc, grade) => acc + grade, 0);
};
