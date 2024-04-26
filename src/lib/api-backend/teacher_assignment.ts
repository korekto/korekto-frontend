import { axiosAPI } from './../axios';
import type { TeacherAssignmentForm, TeacherAssignment } from './../types';

export const createTeacherAssignment = async (
	module_id: string,
	assignment: TeacherAssignmentForm
): Promise<TeacherAssignment> => {
	return await axiosAPI
		.post<TeacherAssignment>(`/fapi/teacher/module/${module_id}/assignment`, assignment)
		.then((res) => res.data);
};

export const getTeacherAssignment = async (
	module_id: string,
	assignment_id: string
): Promise<TeacherAssignment> => {
	return await axiosAPI
		.get<TeacherAssignment>(`/fapi/teacher/module/${module_id}/assignment/${assignment_id}`)
		.then((res) => res.data);
};

export const updateTeacherAssignment = async (
	module_id: string,
	assignment_id: string,
	assignment: TeacherAssignmentForm
): Promise<TeacherAssignment> => {
	return await axiosAPI
		.put<TeacherAssignment>(
			`/fapi/teacher/module/${module_id}/assignment/${assignment_id}`,
			assignment
		)
		.then((res) => res.data);
};

export const deleteTeacherAssignments = async (module_id: string, assignment_ids: string[]) => {
	await axiosAPI({
		method: 'delete',
		url: `/fapi/teacher/module/${module_id}`,
		data: JSON.stringify(assignment_ids),
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
