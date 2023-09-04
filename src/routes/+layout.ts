import type { LayoutLoad } from './$types';
import { loadUser } from '$lib/stores';

export const prerender = true;
export const ssr = false;

export const load: LayoutLoad = async () => {
	await loadUser();
	return {};
};
