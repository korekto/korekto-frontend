export type AssignmentType = {
	id: string;
	type: string;
	name: string;
	description: string;
	tags: string[];
	grade: number;
	start: string | Date;
	end: string | Date;
	repo_created: boolean;
	latest_update: string | Date;
	locked: boolean;
	subject: string;
	grader: string;
	integration: boolean;
	repository_name: string;
	factor_percentage: number;
};
