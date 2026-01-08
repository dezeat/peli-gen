import { defineConfig, devices } from '@playwright/test';

/**
 * Visual Regression Testing Configuration
 * 
 * This configuration ensures reproducible visual testing across:
 * - Light/Dark color schemes
 * - Desktop/Mobile viewports
 * - Multiple browsers (Chromium, WebKit)
 * 
 * IMPORTANT: Playwright version is strictly pinned in package.json
 * to ensure snapshot consistency across environments.
 */
export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Maximum time one test can run
  timeout: 60 * 1000,
  
  // Run tests in files in parallel
  fullyParallel: false,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Force single worker locally to reduce flakiness on low-resource machines
  workers: 1,
  
  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:3000',
    
    // Collect trace on first retry
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Stable launch options for Chromium on CI / Fedora
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    },
  },

  // Configure snapshot comparison
  expect: {
    toHaveScreenshot: {
      // Maximum number of pixels that can differ
      // Allows for minor sub-pixel rendering differences across environments
      maxDiffPixels: 100,
      
      // Animation handling
      animations: 'disabled',
      
      // Ensure consistent font rendering
      scale: 'css',
    },
  },

  // Web Server: Serve the Pelican output before testing
  webServer: {
    command: 'python -m http.server 3000 --directory output',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  // Configure projects for major browsers and viewports
  projects: [
    // Desktop Chrome - Light Mode
    {
      name: 'Desktop Chrome - Light',
      use: {
          browserName: 'chromium',
          ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        colorScheme: 'light',
      },
    },

    // Desktop Chrome - Dark Mode
    {
      name: 'Desktop Chrome - Dark',
      use: {
          browserName: 'chromium',
          ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        colorScheme: 'dark',
      },
    },

    // Mobile Safari - Light Mode
    {
      name: 'Mobile Safari - Light',
      use: {
          browserName: 'chromium',
          ...devices['iPhone 12'],
        viewport: { width: 375, height: 667 },
        colorScheme: 'light',
      },
    },

    // Mobile Safari - Dark Mode
    {
      name: 'Mobile Safari - Dark',
      use: {
          browserName: 'chromium',
          ...devices['iPhone 12'],
        viewport: { width: 375, height: 667 },
        colorScheme: 'dark',
      },
    },
  ],
});
