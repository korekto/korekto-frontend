import type { ModuleDesc, ModuleRedeemResponse } from '$lib/types';
import { axiosAPI } from '$lib/axios';

export const redeemModule = async (key: string): Promise<ModuleRedeemResponse> => {
	return await axiosAPI.get(`/fapi/module/redeem?key=${key}`).then((res) => {
		if (res.status < 400 && res.headers['Location']) {
			return {
				redirect_url: res.headers['Location']
			};
		} else {
			return {};
		}
	});
};

export const getModules = async (): Promise<ModuleDesc[]> => {
	return await axiosAPI.get<ModuleDesc[]>('/fapi/module').then((res) => res.data);
};
