import { describe, expect, it } from 'vitest';
import { updateProfile, getSelf } from './user';

describe('updateProfile mock api', () => {
	it('reflects change in self mock api', async () => {
		updateProfile({
			firstname: 'test 1234',
			lastname: 'something',
			school_group: '43B',
			school_email: 'toto@test.org'
		});

		expect(await getSelf()).toEqual({
			admin: false,
			avatar_url: expect.any(String),
			firstname: 'test 1234',
			lastname: 'something',
			role: 'Student',
			school_email: 'toto@test.org',
			school_group: '43B',
			teacher: false
		});
	});
});
