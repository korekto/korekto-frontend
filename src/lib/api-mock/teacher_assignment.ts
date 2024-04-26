import type { TeacherAssignmentForm, TeacherAssignment } from './../types';
import * as mock from './../mock';

export const createTeacherAssignment = async (
	module_id: string,
	assignment_form: TeacherAssignmentForm
): Promise<TeacherAssignment> => {
	const id = mock.uuidv4();
	const assignment = {
		...assignment_form,
		id: id
	};
	const module = mock.modules.filter((m) => m.id === module_id)[0];
	module.assignments.push(assignment);
	return assignment;
};

export const getTeacherAssignment = async (
	module_id: string,
	assignment_id: string
): Promise<TeacherAssignment> => {
	return mock.modules
		.filter((m) => m.id === module_id)[0]
		.assignments.filter((a) => a.id === assignment_id)[0];
};

export const updateTeacherAssignment = async (
	module_id: string,
	assignment_id: string,
	assignment: TeacherAssignmentForm
): Promise<TeacherAssignment> => {
	const module = mock.modules.filter((m) => m.id === module_id)[0];
	const index = module.assignments.findIndex(({ id }) => id === assignment_id);
	const updated_assignment = {
		...module.assignments[index],
		...assignment
	};
	module.assignments[index] = updated_assignment;
	return updated_assignment;
};

export const deleteTeacherAssignments = async (module_id: string, assignment_ids: string[]) => {
	mock.deleteTeacherAssignments(module_id, assignment_ids);
};
