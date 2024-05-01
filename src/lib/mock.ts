import type {
	UserForAdmin,
	TeacherAssignment,
	UnparseableWebhook,
	RunInfo,
	Details,
	CompleteRunInfo
} from './types';

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

export const assignment_not_found: AssignmentBacked = {
	id: 'not found',
	type: 'not found',
	name: 'not found',
	start: new Date(0),
	stop: new Date(0),
	description: 'not found',
	subject_url: 'not found',
	grader_url: 'not found',
	repository_name: 'not found',
	factor_percentage: 0,
	grader_run_url: 'not found',
	linked: false,
	locked: true,
	locked_reason: 'not found'
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
				repository_name: 'java_exercise_1',
				factor_percentage: 10,
				grader_run_url: 'toto',
				linked: true,
				locked: false,
				latest_run: {
					short_commit_id: '72858c3',
					commit_url:
						'https://github.com/toto/java_exercise_1/commit/72858c3ea42f61aa6913b639f5f51f2dfb17eb89',
					grading_log_url: 'https://github.com/some-runner-runner/job/machin/bidule',
					time: new Date('2023-03-22T17:00:00Z'),
					details: [
						{
							name: 'Part 1 - Compilation & Tests',
							grade: 4,
							max_grade: 4
						},
						{
							name: 'Part 3 - Code Coverage',
							grade: 2.43,
							max_grade: 3,
							messages: ['Code coverage: 60.38%, expected: > 80.0% with `mvn verify`']
						},
						{
							name: 'Git (proper descriptive messages)',
							grade: 0,
							messages: ['OK']
						}
					]
				},
				ongoing_run: {
					short_commit_id: '8529f2a',
					commit_url:
						'https://github.com/toto/java_exercise_1/commit/8529f2aaa2d9f8f35a17ae0ac40b240ae6918ad0',
					grading_log_url: 'https://github.com/some-runner-runner/job/machin/bidule'
				}
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
	locked: boolean;
	locked_reason?: string;
	latest_run?: CompleteRunInfo;
	ongoing_run?: RunInfo;
	latest_details?: Details[];
};

export type AssignmentBacked = TeacherAssignment & AssignmentState;

export type HavingAssignments = {
	assignments: AssignmentWithGrade[];
};

export type AssignmentWithGrade = {
	factor_percentage?: number;
	grade?: number;
	latest_run?: CompleteRunInfo;
};

export const gradeModule = (m: HavingAssignments): number => {
	return Number(
		m.assignments
			.map((a) => {
				return (gradeAssignment(a).normalized_grade * (a.factor_percentage ?? 0)) / 100;
			})
			.reduce((acc, grade) => acc + grade, 0)
			.toFixed(2)
	);
};

export const gradeAssignment = (
	a: AssignmentWithGrade
): { grade: number; max_grade: number; normalized_grade: number } => {
	if (a.grade !== undefined) {
		return { grade: a.grade, max_grade: 20, normalized_grade: a.grade };
	} else if (a.latest_run !== undefined) {
		let grade = 0;
		let max_grade = 0;
		for (const detail of a.latest_run.details) {
			grade += detail.grade;
			if (detail.max_grade !== undefined) {
				max_grade += detail.max_grade;
			}
		}
		const normalized_grade = Number(((grade * 20) / max_grade).toFixed(2));
		return {
			grade,
			max_grade,
			normalized_grade
		};
	} else {
		return {
			grade: 0,
			max_grade: 0,
			normalized_grade: 0
		};
	}
};
