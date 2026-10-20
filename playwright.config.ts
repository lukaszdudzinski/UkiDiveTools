import { defineConfig, devices } from '@playwright/test';

// PW_PORT: lokalne nadpisanie portu (równoległe sesje); CI używa 8080.
const PORT = Number(process.env.PW_PORT) || 8080;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: '.',
  testMatch: ['e2e/**/*.spec.ts', 'tests/**/*.spec.js'],
  testIgnore: ['**/node_modules/**'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'html',
  use: { baseURL: BASE_URL, trace: 'on-first-retry' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: `npx http-server . -a 127.0.0.1 -p ${PORT} -c-1`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
