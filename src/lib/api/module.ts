import { dev } from '$app/environment';
import { axiosAPI } from './../axios';
import type { TeacherModuleDesc, TeacherModule, TeacherModuleForm } from './../types';
import * as mock from './../mock';

export const getTeacherModules = async (): Promise<TeacherModuleDesc[]> => {
	if (dev) {
		return mock.getTeacherModules();
	} else {
		return await axiosAPI
			.get<TeacherModuleDesc[]>('/fapi/teacher/module')
			.then((res) => res.data);
	}
};

export const createTeacherModule = async (module: TeacherModuleForm): Promise<TeacherModule> => {
	if (dev) {
		return mock.createTeacherModule(module);
	} else {
		return await axiosAPI
			.post<TeacherModule>(`/fapi/teacher/module`, module)
			.then((res) => res.data);
	}
};

export const getTeacherModule = async (id: string): Promise<TeacherModule> => {
	if (dev) {
		return mock.getTeacherModule(id);
	} else {
		return await axiosAPI
			.get<TeacherModule>(`/fapi/teacher/module/${id}`)
			.then((res) => res.data);
	}
};

export const updateTeacherModule = async (
	module_id: string,
	module: TeacherModuleForm
): Promise<TeacherModule> => {
	if (dev) {
		return mock.updateTeacherModule(module_id, module);
	} else {
		return await axiosAPI
			.put<TeacherModule>(`/fapi/teacher/module/${module_id}`, module)
			.then((res) => res.data);
	}
};

export const deleteTeacherModules = async (ids: string[]) => {
	if (dev) {
		mock.deleteTeacherModules(ids);
	} else {
		await axiosAPI({
			method: 'delete',
			url: '/fapi/teacher/module',
			data: JSON.stringify(ids),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
