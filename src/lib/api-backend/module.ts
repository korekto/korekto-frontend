import type { Assignment, Module, ModuleDesc, ModuleRedeemResponse } from '$lib/types';
import { axiosAPI } from '$lib/axios';

export const redeemModule = async (key: string): Promise<ModuleRedeemResponse> => {
	return await axiosAPI
		.get(`/fapi/module/redeem?key=${key}&redirect=false`, {
			validateStatus: () => true
		})
		.then((res) => {
			if (res.status === 200) {
				return {
					redirect_url: res.data
				};
			} else {
				return {};
			}
		});
};

export const getModules = async (): Promise<ModuleDesc[]> => {
	return await axiosAPI.get<ModuleDesc[]>('/fapi/module').then((res) => res.data);
};

export const getModule = async (module_id: string): Promise<Module> => {
	return await axiosAPI.get<Module>(`/fapi/module/${module_id}`).then((res) => res.data);
};

export const getAssignment = async (
	module_id: string,
	assignment_id: string
): Promise<Assignment> => {
	return await axiosAPI
		.get<Assignment>(`/fapi/module/${module_id}/assignment/${assignment_id}`)
		.then((res) => res.data);
};

export const triggerGrading = async (module_id: string, assignment_id: string): Promise<void> => {
	return await axiosAPI
		.post(`/fapi/module/${module_id}/assignment/${assignment_id}/trigger-grading`)
		.then((res) => res.data);
};

export const syncRepo = async (module_id: string, assignment_id: string): Promise<void> => {
	return await axiosAPI
		.post(`/fapi/module/${module_id}/assignment/${assignment_id}/sync-repo`)
		.then((res) => res.data);
};
