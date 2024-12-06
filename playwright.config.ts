import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://petstore.swagger.io/v2/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
      },
    },

    {
     name: 'firefox',
     use: { 
       ...devices['Desktop Firefox'],
     },
    },

    {
     name: 'webkit',
     use: { 
       ...devices['Desktop Safari'],
     },
    },

  ],

});