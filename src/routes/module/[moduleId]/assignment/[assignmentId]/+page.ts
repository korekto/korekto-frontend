import type { Load } from '@sveltejs/kit';

export const prerender = false;

export const load: Load = ({ params }) => ({
	moduleId: params.moduleId ?? 'moduleId URL segment not found',
	assignmentId: params.assignmentId ?? 'assignmentId URL segment not found'
});
