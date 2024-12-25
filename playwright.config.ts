import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Retry Failed Cases */
    retries: 1,
    /* how many workers while running paralell */
    workers: undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['html'],
        ['allure-playwright']
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry', // Record video for each test, but remove all videos from successful test runs
    },

    /* Configure projects for major browsers */
    projects: [
        { // this is to run your test on dev environment
            // to use it, use the cmd 'npx playwright test yourSpecFileName --project=dev
            name: 'dev',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'https://automationexercise.com',
                headless: true,
                screenshot: 'on',
                video: 'retain-on-failure'
            },
        }
    ]
});
