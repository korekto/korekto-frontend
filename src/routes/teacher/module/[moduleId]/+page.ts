import type { Load } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

export const load: Load = ({ params }) => {
	const module_id = params.moduleId ?? 'could not retrieve module ID';
	throw redirect(307, `/teacher/module/${module_id}/details`);
};
