import { test, expect } from '@playwright/test';

/**
 * Visual Regression Test Suite
 * 
 * This suite validates that CSS changes don't introduce visual regressions
 * across different viewports and color schemes.
 * 
 * Test Coverage:
 * - Home page (/)
 * - About page (/pages/about.html)
 * - Blog listing (/blog.html)
 * - Single blog post (/my-way-into-data-engineering.html)
 * - Projects page (/projects.html)
 * 
 * Each route is tested across 4 configurations:
 * - Desktop (1280x720) in Light/Dark modes
 * - Mobile (375x667) in Light/Dark modes
 */

// Critical routes to test for visual regressions
const CRITICAL_ROUTES = [
  { path: '/', name: 'homepage' },
  { path: '/pages/about.html', name: 'about-page' },
  { path: '/blog.html', name: 'blog-listing' },
  { path: '/my-way-into-data-engineering.html', name: 'blog-post' },
  { path: '/projects.html', name: 'projects-page' },
];

// Run visual regression tests for each critical route
CRITICAL_ROUTES.forEach(({ path, name }) => {
  test(`Visual regression: ${name}`, async ({ page }) => {
    // Navigate to the page
    await page.goto(path);
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Additional wait for any potential animations or dynamic content
    await page.waitForTimeout(500);
    
    // Take full-page screenshot and compare against baseline
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      // Override global settings if needed for specific pages
      // maxDiffPixels: 200,
    });
  });
});

/**
 * Additional Tests for Interactive Elements
 * 
 * These tests capture state changes that might not be visible
 * in the default page load (e.g., hover states, expanded menus).
 */
test('Visual regression: Homepage with interactions', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // If you have interactive elements (dropdowns, carousels), test them here
  // Example: Hover over navigation items
  const navItems = page.locator('nav a').first();
  if (await navItems.count() > 0) {
    await navItems.hover();
    await page.waitForTimeout(300);
  }
  
  await expect(page).toHaveScreenshot('homepage-interactive.png', {
    fullPage: true,
  });
});

/**
 * Responsive Layout Tests
 * 
 * These tests specifically validate responsive breakpoints
 * by checking viewport-specific elements.
 */
test('Visual regression: Mobile menu behavior', async ({ page, viewport }) => {
  // Only run this test on mobile viewports
  if (viewport && viewport.width < 768) {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test mobile-specific UI (hamburger menu, etc.)
    await expect(page).toHaveScreenshot('mobile-navigation.png', {
      fullPage: false, // Only capture visible viewport for mobile nav
    });
  } else {
    test.skip();
  }
});
