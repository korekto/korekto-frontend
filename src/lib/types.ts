export type User = {
	name: string;
	role: string;
	avatar_url: string;
    admin: boolean;
};

export type ProfileInfo = {
	firstName?: string;
	lastName?: string;
	schoolClass?: string;
	schoolEmail?: string;
};

export type Assignment = {
	id: string;
	type: string;
	name: string;
	description: string;
	grade: number;
	start: string | Date;
	end: string | Date;
	repo_created: boolean;
	latest_update: string | Date;
	locked: boolean;
	lock_reason: string;
	subject: string;
	grader: string;
	integration: boolean;
	repository_name: string;
	repository_url: string;
	factor_percentage: number;
	grading_state: string;
	current_run: string;
	current_run_short_commit_id: string;
	current_run_commit_url: string;
	latest_run: string;
	latest_run_short_commit_id: string;
	latest_run_time: string | Date;
	latest_run_commit_url: string;
	details: Details[];
};

export type Details = {
	name: string;
	grade: number;
	max_grade?: number;
	messages?: string[];
};
