export type User = {
	firstname: string;
	lastname: string;
	school_group: string;
	school_email: string;
	role: string;
	avatar_url: string;
	admin: boolean;
	teacher: boolean;
};

export type ProfileInfo = {
	firstname?: string;
	lastname?: string;
	school_email?: string;
	school_group?: string;
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
	firstname: string;
	lastname: string;
	school_group: string;
	school_email: string;
	provider_email: string;
	teacher: boolean;
	admin: boolean;
	selected?: boolean;
	modules: string[];
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

export type ModuleRedeemResponse = {
	redirect_url?: string;
};

export type ModuleDesc = {
	id: string;
	name: string;
	start: Date;
	stop: Date;
	linked_repo_count: number;
	assignment_count: number;
	grade: number;
	locked: boolean;
	latest_update?: Date;
};

export type Module = {
	id: string;
	name: string;
	description: string;
	start: Date;
	stop: Date;
	linked_repo_count: number;
	grade: number;
	latest_update?: Date;
	source: string;
	locked: boolean;
	lock_reason?: string;
	assignments: Array<AssignmentDesc>;
};

export type AssignmentDesc = {
	id: string;
	name: string;
	description: string;
	start: Date;
	stop: Date;
	type: string;
	factor_percentage: number;
	locked: boolean;
	grade: number;
	repo_linked: boolean;
	repository_name: string;
	subject_url: string;
};

export type Page<T> = {
	page: number;
	per_page: number;
	total_page: number;
	total_count: number;
	data: Array<T>;
};

export type UnparseableWebhook = {
	index?: number;
	created_at: Date;
	origin: string;
	event: string;
	payload: string;
	error: string;
};
