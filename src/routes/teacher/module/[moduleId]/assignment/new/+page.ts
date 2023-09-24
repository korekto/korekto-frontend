import type { Load } from '@sveltejs/kit';

export const prerender = false;

export const load: Load = ({ params }) => ({
	moduleId: params.moduleId!
});
