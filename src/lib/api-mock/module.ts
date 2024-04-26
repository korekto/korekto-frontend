import type { ModuleDesc, ModuleRedeemResponse } from '$lib/types';
import * as mock from '$lib/mock';

export const redeemModule = async (key: string): Promise<ModuleRedeemResponse> => {
	const matching_module = mock.modules.find((m) => m.unlock_key === key);
	if (matching_module !== undefined) {
		mock.users[0].modules.push(matching_module.id ?? '<none>');
		return {
			redirect_url: '/dashboard'
		};
	} else {
		return {};
	}
};

export const getModules = async (): Promise<ModuleDesc[]> => {
	return mock.users[0].modules
		.map((module_id) => mock.modules.find((m) => m.id === module_id) ?? mock.module_not_found)
		.map(moduleBacked_to_ModuleDesc);
};

const moduleBacked_to_ModuleDesc = (m: mock.TeacherModuleBacked): ModuleDesc => {
	return {
		id: m.id ?? 'should be defined',
		name: m.name ?? 'should be defined',
		start: m.start ?? new Date(0),
		stop: m.stop ?? new Date(0),
		linked_repo_count: m.assignments.filter((a) => a.linked).length,
		assignment_count: m.assignments.length,
		grade: m.assignments
			.map((a) => (a.grade * (a.factor_percentage ?? 0)) / 100)
			.reduce((acc, grade) => acc + grade, 0),
		latest_update: m.start
	};
};
