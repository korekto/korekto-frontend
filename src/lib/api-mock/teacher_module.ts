import type {
	TeacherModuleDesc,
	TeacherModule,
	TeacherModuleForm,
	TeacherAssignment,
	TeacherAssignmentDesc
} from './../types';
import * as mock from './../mock';

export const getTeacherModules = async (): Promise<TeacherModuleDesc[]> => {
	return mock.modules.map((m: mock.TeacherModuleBacked) => ({
		id: m.id || '',
		name: m.name || '',
		start: (m.start || new Date()).toLocaleString(),
		stop: (m.stop || new Date()).toLocaleString(),
		assignment_count: m.assignments.length
	}));
};

export const createTeacherModule = async (
	module_form: TeacherModuleForm
): Promise<TeacherModule> => {
	const id = mock.uuidv4();
	const module = {
		...module_form,
		id: id,
		assignments: []
	};
	mock.modules.push(module);
	return module;
};

export const getTeacherModule = async (id: string): Promise<TeacherModule> => {
	return mock.modules.filter((m) => m.id === id).map(teacherModuleBacked_to_teacherModule)[0];
};

const teacherModuleBacked_to_teacherModule = (m: mock.TeacherModuleBacked): TeacherModule => {
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
		start: assignment.start?.toLocaleDateString() ?? 'should be defined',
		stop: assignment.stop?.toLocaleDateString() ?? 'should be defined',
		factor_percentage: assignment.factor_percentage ?? -1
	};
};

export const updateTeacherModule = async (
	module_id: string,
	module_form: TeacherModuleForm
): Promise<TeacherModule> => {
	const index = mock.modules.findIndex(({ id }) => id === module_id);
	const updated_module = {
		...mock.modules[index],
		...module_form
	};
	mock.modules[index] = updated_module;
	return teacherModuleBacked_to_teacherModule(updated_module);
};

export const deleteTeacherModules = async (ids: string[]) => {
	mock.deleteTeacherModules(ids);
};
