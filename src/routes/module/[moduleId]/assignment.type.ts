export type AssignmentType = {
	id: string;
	type: string;
	name: string;
	description: string;
	tags: string[];
	grade: number;
	start: string;
	stop: string;
	repo_created: boolean;
	latest_update: string;
	locked: boolean;
	subject: string;
	grader: string;
	integration: boolean;
	repository_name: string;
	factor_percentage: number;
};
