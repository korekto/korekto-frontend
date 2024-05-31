import * as backend_admin from '$lib/api-backend/admin';
import * as backend_module from '$lib/api-backend/module';
import * as backend_teacher_assignment from '$lib/api-backend/teacher_assignment';
import * as backend_teacher_module from '$lib/api-backend/teacher_module';
import * as backend_user from '$lib/api-backend/user';

import * as mock_admin from '$lib/api-mock/admin';
import * as mock_module from '$lib/api-mock/module';
import * as mock_teacher_assignment from '$lib/api-mock/teacher_assignment';
import * as mock_teacher_module from '$lib/api-mock/teacher_module';
import * as mock_user from '$lib/api-mock/user';

const api =
	import.meta.env.VITE_MOCK_MODE === 'true'
		? {
				...mock_admin,
				...mock_module,
				...mock_teacher_assignment,
				...mock_teacher_module,
				...mock_user
			}
		: {
				...backend_admin,
				...backend_module,
				...backend_teacher_assignment,
				...backend_teacher_module,
				...backend_user
			};

export default api;
