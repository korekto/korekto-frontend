import type {
	User,
	Table,
	UserForAdmin,
	TeacherModuleDesc,
	TeacherModule,
	TeacherModuleForm,
	TeacherAssignment,
	TeacherAssignmentForm,
	TeacherAssignmentDesc
} from './types';

const imgIndex = Math.random();

function uuidv4() {
	return crypto.randomUUID();
}

let users: UserForAdmin[] = [
	{
		id: '42',
		created_at: '2023-03-10T14:05:44Z',
		provider_login: 'toto',
		name: 'Toto',
		email: 'toto@titi.com',
		teacher: false,
		admin: false
	},
	{
		id: '43',
		created_at: '2023-03-10T14:05:44Z',
		provider_login: 'titi',
		name: 'Titi',
		email: 'titi@titi.com',
		teacher: false,
		admin: false
	}
];

let modules: TeacherModuleBacked[] = [
	{
		id: '6d8c3b5b-9e68-4b25-85a1-96a000b1701d',
		name: 'Java 101',
		start: '2023-09-14T14:05:44Z',
		stop: '2023-09-28T20:00:44Z',
		unlock_key: 'vdjjgvdjhbd-jhbd-65545khbd',
		assignments: []
	},
	{
		id: 'e82f14b5-ea18-4950-b990-b7151cb4cddc',
		name: 'Java 201',
		start: '2023-09-14T14:05:44Z',
		stop: '2023-09-28T14:05:44Z',
		unlock_key: '6d8c3b5b-9e68-4b25-85a1-96a000b1701d',
		assignments: []
	}
];

export const getSelf = (): User => {
	const backed_user = users[0];
	return {
		name: backed_user.name,
		role: backed_user.teacher ? 'Teacher' : backed_user.admin ? 'Admin' : 'Student',
		avatar_url: `https://thispersondoesnotexist.com/?rand_number=${imgIndex}`,
		admin: backed_user.admin,
		teacher: backed_user.teacher
	};
};

export const setAdmin = (code: string): void => {
	if (code === '0') {
		users[0].admin = true;
	}
};

export const getTables = (): Table[] => {
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

export const getUsers = (): UserForAdmin[] => {
	return users;
};

export const deleteUsers = (ids: string[]): void => {
	users = users.filter((u) => !ids.includes(u.id));
};

export const setUsersTeacher = (ids: string[]): void => {
	users.filter((u) => ids.includes(u.id)).forEach((u) => (u.teacher = true));
};

export const getTeacherModules = (): TeacherModuleDesc[] => {
	return modules.map((m: TeacherModuleBacked) => ({
		id: m.id || '',
		name: m.name || '',
		start: m.start || '',
		stop: m.stop || '',
		assignment_count: m.assignments.length
	}));
};

export const getTeacherModule = (id: string): TeacherModule => {
	return modules.filter((m) => m.id === id).map(teacherModuleBacked_to_teacherModule)[0];
};

const teacherModuleBacked_to_teacherModule = (m: TeacherModuleBacked): TeacherModule => {
	return {
		...m,
		assignments: m.assignments.map(assignment_to_assignmentDesc)
	};
};

const assignment_to_assignmentDesc = (assignment: TeacherAssignment): TeacherAssignmentDesc => {
	return {
		id: assignment.id ?? 'should be defined',
		type: assignment.type ?? 'should be defined',
		name: assignment.name ?? 'should be defined',
		start: assignment.start ?? 'should be defined',
		stop: assignment.stop ?? 'should be defined',
		factor_percentage: assignment.factor_percentage ?? -1
	};
};

export const createTeacherModule = (module_form: TeacherModuleForm): TeacherModule => {
	const id = uuidv4();
	const module = {
		...module_form,
		id: id,
		assignments: []
	};
	modules.push(module);
	return module;
};

export const updateTeacherModule = (
	module_id: string,
	module_form: TeacherModuleForm
): TeacherModule => {
	const index = modules.findIndex(({ id }) => id === module_id);
	const updated_module = {
		...modules[index],
		...module_form
	};
	modules[index] = updated_module;
	return teacherModuleBacked_to_teacherModule(updated_module);
};

export const updateTeacherAssignment = (
	module_id: string,
	assignment_id: string,
	assignment: TeacherAssignmentForm
): TeacherAssignment => {
	const module = modules.filter((m) => m.id === module_id)[0];
	const index = module.assignments.findIndex(({ id }) => id === assignment_id);
	const updated_assignment = {
		...module.assignments[index],
		...assignment
	};
	module.assignments[index] = updated_assignment;
	return updated_assignment;
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

export const createTeacherAssignment = (
	module_id: string,
	assignment_form: TeacherAssignmentForm
): TeacherAssignment => {
	const id = uuidv4();
	const assignment = {
		...assignment_form,
		id: id
	};
	const module = modules.filter((m) => m.id === module_id)[0];
	module.assignments.push(assignment);
	return assignment;
};

export const getTeacherAssignment = (
	module_id: string,
	assignment_id: string
): TeacherAssignment => {
	return modules
		.filter((m) => m.id === module_id)[0]
		.assignments.filter((a) => a.id === assignment_id)[0];
};

type TeacherModuleBacked = {
	id?: string;
	name?: string;
	start?: Date;
	stop?: Date;
	unlock_key?: string;
	assignments: TeacherAssignment[];
};
