import type {
	TeacherModuleDesc,
	TeacherModule,
	TeacherModuleForm,
	TeacherAssignment,
	TeacherAssignmentDesc,
	ModuleGradesSummary,
	GradeAssignmentDesc,
	StudentGrades
} from './../types';
import * as mock from './../mock';
import { gradeAssignment, gradeModule } from './../mock';

export const getTeacherModules = async (): Promise<TeacherModuleDesc[]> => {
	return mock.modules.map((m: mock.ModuleBacked) => ({
		id: m.id || '',
		name: m.name || '',
		start: (m.start || new Date()).toISOString(),
		stop: (m.stop || new Date()).toISOString(),
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
		locked: true,
		assignments: []
	};
	mock.modules.push(module);
	return module;
};

export const getTeacherModule = async (id: string): Promise<TeacherModule> => {
	return mock.modules.filter((m) => m.id === id).map(teacherModuleBacked_to_teacherModule)[0];
};

const teacherModuleBacked_to_teacherModule = (m: mock.ModuleBacked): TeacherModule => {
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
		start: assignment.start?.toISOString() ?? 'should be defined',
		stop: assignment.stop?.toISOString() ?? 'should be defined',
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

export const getGrades = async (module_id: string): Promise<ModuleGradesSummary> => {
	const module = mock.modules.find(({ id }) => id === module_id)!;
	const assignments: GradeAssignmentDesc[] = module.assignments.map((a, index) => ({
		short_name: a.type == 'EXERCISE' ? 'EX' + (index + 1) : 'Project',
		name: a.name!,
		description: a.description!,
		type: a.type!,
		factor_percentage: a.factor_percentage!
	}));
	const user0_grades = module.assignments.map(gradeAssignment).map((g) => g.normalized_grade);
	const other_user_grades = Array<number>(module.assignments.length).fill(0);
	const grades: StudentGrades[] = mock.users.map((u, index) => ({
		first_name: u.firstname,
		last_name: u.lastname,
		school_email: u.school_email,
		provider_login: u.provider_login,
		grades: index === 0 ? user0_grades : other_user_grades,
		total: index === 0 ? gradeModule(module) : 0
	}));
	return {
		assignments,
		students: grades
	};
};
