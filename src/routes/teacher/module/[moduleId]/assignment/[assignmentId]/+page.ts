import type { Load } from '@sveltejs/kit';

export const prerender = false;

export const load: Load = ({ params }) => ({
	moduleId: params.moduleId ?? 'could not retrieve module ID',
	assignmentId: params.assignmentId ?? 'could not retrieve assignment ID'
});
