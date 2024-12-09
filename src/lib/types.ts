export type User = {
	firstname: string;
	lastname: string;
	school_group: string;
	school_email: string;
	role: string;
	avatar_url: string;
	admin: boolean;
	teacher: boolean;
	installation_id?: string;
};

export type ProfileInfo = {
	firstname?: string;
	lastname?: string;
	school_email?: string;
	school_group?: string;
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
	description?: string;
	start?: Date;
	stop?: Date;
	unlock_key?: string;
	source_url?: string;
	assignments: TeacherAssignmentDesc[];
};

export type TeacherModuleForm = {
	name?: string;
	description?: string;
	start?: Date;
	stop?: Date;
	unlock_key?: string;
	source_url?: string;
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
	repository_url?: string;
	factor_percentage?: number;
	grader_run_url?: string;
	hidden_by_teacher: boolean;
	grader_cli_v2: boolean;
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
	hidden_by_teacher: boolean;
	grader_cli_v2: boolean;
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
	latest_update?: Date;
	source_url: string;
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
};

export type Assignment = {
	id: string;
	type: string;
	name: string;
	description: string;
	start: Date;
	stop: Date;
	repo_linked: boolean;
	repository_name: string;
	subject_url: string;
	grader_url: string;
	repository_url: string;
	factor_percentage: number;
	locked: boolean;
	lock_reason?: string;
	latest_run?: CompleteRunInfo;
	ongoing_run?: RunInfo;
	status?: GradingStatus;
	queue_due_to: number;
	error?: string;
};

export enum GradingStatus {
	QUEUED = 'QUEUED',
	RESERVED = 'RESERVED',
	ORDERED = 'ORDERED',
	STARTED = 'STARTED',
	ERROR = 'ERROR',
	SUCCESSFUL = 'SUCCESSFUL'
}

export type RunInfo = {
	short_commit_id: string;
	commit_url: string;
	grading_log_url: string;
};

export type CompleteRunInfo = RunInfo & {
	time: Date;
	details: Details[];
};

export type Details = {
	name: string;
	grade: number;
	max_grade?: number;
	messages?: string[];
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

export type GradingTask = {
	module_id: string;
	assignment_id: string;
	provider_login: string;
	// TODO get rid of this field ?
	status: string;
	created_at: Date;
	updated_at: Date;
	repository_name: string;
};

export type ModuleGradesSummary = {
	assignments: GradeAssignmentDesc[];
	students: StudentGrades[];
};

export type GradeAssignmentDesc = {
	short_name: string;
	name: string;
	description: string;
	type: string;
	factor_percentage: number;
};

export type StudentGrades = {
	first_name: string;
	last_name: string;
	school_email: string;
	provider_login: string;
	grades: number[];
	total: number;
};

export type AdminMetadata = {
	runner: RunnerMetadata;
};

export type RunnerMetadata = {
	app_id: number;
	app_name: string;
	accessible_repositories: string[];
};
