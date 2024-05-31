import { axiosAPI } from './../axios';
import type {
	TeacherModuleDesc,
	TeacherModule,
	TeacherModuleForm,
	ModuleGradesSummary
} from './../types';

export const getTeacherModules = async (): Promise<TeacherModuleDesc[]> => {
	return await axiosAPI.get<TeacherModuleDesc[]>('/fapi/teacher/module').then((res) => res.data);
};

export const createTeacherModule = async (module: TeacherModuleForm): Promise<TeacherModule> => {
	return await axiosAPI
		.post<TeacherModule>(`/fapi/teacher/module`, module)
		.then((res) => res.data);
};

export const getTeacherModule = async (id: string): Promise<TeacherModule> => {
	return await axiosAPI.get<TeacherModule>(`/fapi/teacher/module/${id}`).then((res) => res.data);
};

export const updateTeacherModule = async (
	module_id: string,
	module: TeacherModuleForm
): Promise<TeacherModule> => {
	return await axiosAPI
		.put<TeacherModule>(`/fapi/teacher/module/${module_id}`, module)
		.then((res) => res.data);
};

export const deleteTeacherModules = async (ids: string[]) => {
	await axiosAPI({
		method: 'delete',
		url: '/fapi/teacher/module',
		data: JSON.stringify(ids),
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

export const getGrades = async (module_id: string): Promise<ModuleGradesSummary> => {
	return await axiosAPI
		.get<ModuleGradesSummary>(`/fapi/teacher/module/${module_id}/grade`)
		.then((res) => res.data);
};
