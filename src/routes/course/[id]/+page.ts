import type { Load } from '@sveltejs/kit';

export const prerender = true;

export const load: Load = ({ params }) => ({
	id: params.id
});
