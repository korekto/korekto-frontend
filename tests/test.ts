import { expect, test } from '@playwright/test';

test('dashboard page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle('Korekto App');
});
