import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 6*1000,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry Failed Cases */
    retries: 1,
    /* how many workers in run paralell */
    workers: undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['html'],
        ['allure-playwright']
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://127.0.0.1:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
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
                video: 'retain-on-failure',
                trace: 'on',
            },
        }
    ]
});
