import type { Load } from '@sveltejs/kit';

export const load: Load = ({ params }) => ({
	moduleId: params.moduleId!,
	assignmentId: params.assignmentId!
});
