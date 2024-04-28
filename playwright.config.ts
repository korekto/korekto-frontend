import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	projects: [
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		}
	],
	webServer: {
		command:
			'cross-env VITE_MOCK_MODE=true npm run build -- --mode development && cross-env VITE_MOCK_MODE=true npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		trace: 'on-first-retry'
	}
};

export default config;
