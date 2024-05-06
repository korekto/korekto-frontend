import type {
	Assignment,
	AssignmentDesc,
	Module,
	ModuleDesc,
	ModuleRedeemResponse
} from '$lib/types';
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

const moduleBacked_to_ModuleDesc = (m: mock.ModuleBacked): ModuleDesc => {
	return {
		id: m.id ?? 'should be defined',
		name: m.name ?? 'should be defined',
		start: m.start ?? new Date(0),
		stop: m.stop ?? new Date(0),
		linked_repo_count: m.assignments.filter((a) => a.linked).length,
		assignment_count: m.assignments.length,
		grade: mock.gradeModule(m),
		latest_update: m.start,
		locked: m.locked
	};
};

export const getModule = async (module_id: string): Promise<Module> => {
	const m = mock.modules.find((m) => m.id === module_id) ?? mock.module_not_found;
	return {
		id: m.id ?? 'should be defined',
		name: m.name ?? 'should be defined',
		description: m.description ?? 'should be defined',
		start: m.start ?? new Date(0),
		stop: m.stop ?? new Date(0),
		latest_update: m.start,
		locked: false,
		source_url: 'some source url',
		assignments: m.assignments.map(assignmentBacked_to_AssignmentDesc)
	};
};

const assignmentBacked_to_AssignmentDesc = (a: mock.AssignmentBacked): AssignmentDesc => {
	return {
		id: a.id ?? 'should be defined',
		name: a.name ?? 'should be defined',
		description: '',
		start: a.start ?? new Date(0),
		stop: a.stop ?? new Date(0),
		grade: mock.gradeAssignment(a).normalized_grade,
		locked: a.locked,
		factor_percentage: a.factor_percentage ?? -1,
		repo_linked: a.linked,
		repository_name: a.repository_name ?? 'should be defined',
		type: a.type ?? 'should be defined'
	};
};

export const getAssignment = async (
	module_id: string,
	assignment_id: string
): Promise<Assignment> => {
	const m = mock.modules.find((m) => m.id === module_id) ?? mock.module_not_found;
	const a = m.assignments.find((a) => a.id === assignment_id) ?? mock.assignment_not_found;

	return {
		id: a.id ?? 'should be defined',
		type: a.type ?? 'should be defined',
		name: a.name ?? 'should be defined',
		description: a.description ?? 'should be defined',
		start: a.start ?? new Date(0),
		stop: a.stop ?? new Date(0),
		repo_linked: a.linked,
		repository_name: a.repository_name ?? 'should be defined',
		subject_url: a.subject_url ?? 'should be defined',
		grader_url: a.grader_url ?? 'should be defined',
		repository_url:
			a.repository_url ??
			`https://github.com/${mock.users[0].provider_login}/${a.repository_name}`,
		factor_percentage: a.factor_percentage ?? -1,
		locked: a.locked,
		lock_reason: a.locked_reason,
		latest_run: a.latest_run,
		ongoing_run: a.ongoing_run
	};
};
