import { dev } from '$app/environment';
import { axiosAPI } from './../axios';
import type { TeacherAssignmentForm, TeacherAssignment } from './../types';
import * as mock from './../mock';

export const createTeacherAssignment = async (
	module_id: string,
	assignment: TeacherAssignmentForm
): Promise<TeacherAssignment> => {
	if (dev) {
		return mock.createTeacherAssignment(module_id, assignment);
	} else {
		return await axiosAPI
			.post<TeacherAssignment>(`/fapi/teacher/module/${module_id}/assignment`, assignment)
			.then((res) => res.data);
	}
};

export const getTeacherAssignment = async (
	module_id: string,
	assignment_id: string
): Promise<TeacherAssignment> => {
	if (dev) {
		return mock.getTeacherAssignment(module_id, assignment_id);
	} else {
		return await axiosAPI
			.get<TeacherAssignment>(`/fapi/teacher/module/${module_id}/assignment/${assignment_id}`)
			.then((res) => res.data);
	}
};

export const updateTeacherAssignment = async (
	module_id: string,
	assignment_id: string,
	assignment: TeacherAssignmentForm
): Promise<TeacherAssignment> => {
	if (dev) {
		return mock.updateTeacherAssignment(module_id, assignment_id, assignment);
	} else {
		return await axiosAPI
			.put<TeacherAssignment>(
				`/fapi/teacher/module/${module_id}/assignment/${assignment_id}`,
				assignment
			)
			.then((res) => res.data);
	}
};

export const deleteTeacherAssignments = async (module_id: string, assignment_ids: string[]) => {
	if (dev) {
		mock.deleteTeacherAssignments(module_id, assignment_ids);
	} else {
		await axiosAPI({
			method: 'delete',
			url: `/fapi/teacher/module/${module_id}`,
			data: JSON.stringify(assignment_ids),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
