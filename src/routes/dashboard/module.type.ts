export type ModuleType = {
	id: string;
	name: string;
	start: string | Date;
	end: string | Date;
	repos_to_create: number;
	user_repos: number;
	grade: number;
	latest_update: string | Date;
	locked: boolean;
};
