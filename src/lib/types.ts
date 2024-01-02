export type User = {
	name: string;
	role: string;
	avatar_url: string;
	admin: boolean;
	teacher: boolean;
};

export type ProfileInfo = {
	firstName?: string;
	lastName?: string;
	schoolClass?: string;
	schoolEmail?: string;
};

export type StudentAssignment = {
	id: string;
	type: string;
	name: string;
	description: string;
	grade: number;
	start: string;
	stop: string;
	repo_created: boolean;
	latest_update: string;
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
	latest_run_time: string;
	latest_run_commit_url: string;
	details: Details[];
};

export type Details = {
	name: string;
	grade: number;
	max_grade?: number;
	messages?: string[];
};

export type Table = {
	name: string;
	row_count: number;
};

export type UserForAdmin = {
	id: string;
	created_at: string;
	provider_login: string;
	name: string;
	email: string;
	teacher: boolean;
	admin: boolean;
	selected?: boolean;
};

export type TeacherModuleDesc = {
	id: string;
	name: string;
	start: string;
	stop: string;
	assignment_count: number;
};

export type TeacherModule = {
	id?: string;
	name?: string;
	start?: Date;
	stop?: Date;
	unlock_key?: string;
	assignments: TeacherAssignmentDesc[];
};

export type TeacherModuleForm = {
	name?: string;
	start?: Date;
	stop?: Date;
	unlock_key?: string;
};

export type TeacherAssignmentDesc = {
	id: string;
	type: string;
	name: string;
	start: string;
	stop: string;
	factor_percentage: number;
};

export type TeacherAssignment = {
	id?: string;
	type?: string;
	name?: string;
	start?: Date;
	stop?: Date;
	description?: string;
	subject_url?: string;
	grader_url?: string;
	repository_name?: string;
	factor_percentage?: number;
	grader_run_url?: string;
};

export type TeacherAssignmentForm = {
	type?: string;
	name?: string;
	start?: Date;
	stop?: Date;
	description?: string;
	subject_url?: string;
	grader_url?: string;
	repository_name?: string;
	factor_percentage?: number;
	grader_run_url?: string;
};
