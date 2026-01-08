# Visual Regression Testing Infrastructure

This directory contains the automated Visual Regression Testing (VRT) setup for the Pelican blog.

## Overview

This system ensures zero CSS regressions by automatically capturing and comparing screenshots across:
- **2 Color Schemes**: Light and Dark modes
- **2 Viewports**: Desktop (1280×720) and Mobile (375×667)
- **Total**: 4 test configurations per page

## Quick Start

### 1. Initial Setup
```bash
make visual-setup
```
This installs Node.js dependencies and Playwright browsers (Chromium, WebKit).

### 2. Run Tests
```bash
make visual-test
```
Runs the complete visual regression suite. The site must be built first (automatically handled).

### 3. Update Snapshots (After Intentional CSS Changes)
```bash
make visual-update
```
Accepts all visual changes as the new baseline. **Review with `git diff` before committing!**

### 4. View Test Report
```bash
make visual-report
```
Opens an interactive HTML report showing differences (if any).

## Git Hooks

### Installation
```bash
pip install pre-commit
pre-commit install --hook-type pre-push
```

### Behavior
- **Pre-push**: Runs `make visual-test` automatically before pushing to remote
- **Pre-commit**: Warns if snapshot files are being committed

## File Structure

```
peli-gen/
├── package.json              # Node dependencies (Playwright pinned to 1.48.0)
├── package-lock.json         # Lockfile (DO NOT DELETE - ensures reproducibility)
├── playwright.config.ts      # Test configuration (viewports, thresholds, server)
├── tests/
│   └── visual.spec.ts       # Test logic
├── tests/visual.spec.ts-snapshots/  # Baseline screenshots (auto-generated)
│   ├── Desktop-Chrome-Light/
│   ├── Desktop-Chrome-Dark/
│   ├── Mobile-Safari-Light/
│   └── Mobile-Safari-Dark/
└── playwright-report/       # HTML reports (gitignored)
```

## Configuration Details

### Thresholds (`playwright.config.ts`)
- **maxDiffPixels**: 100 pixels (tolerates minor sub-pixel rendering noise)
- Adjustable per-test if needed

### Covered Routes
- Home: `/`
- About: `/pages/about.html`
- Blog Listing: `/blog.html`
- Sample Post: `/my-way-into-data-engineering.html`
- Projects: `/projects.html`

### Adding New Routes
Edit [tests/visual.spec.ts](tests/visual.spec.ts):
```typescript
const CRITICAL_ROUTES = [
  { path: '/new-page.html', name: 'new-page' },
  // ...
];
```

## Troubleshooting

### Tests Fail After Browser Update
Playwright is pinned to version `1.48.0` to prevent this. If you need to update:
1. Update version in [package.json](package.json)
2. Run `npm install`
3. Run `make visual-update` to regenerate snapshots
4. Commit both `package.json` and updated snapshots

### False Positives
If tests fail due to dynamic content (dates, random elements):
1. Mask dynamic regions:
   ```typescript
   await expect(page).toHaveScreenshot({
     mask: [page.locator('.timestamp')],
   });
   ```
2. Or increase `maxDiffPixels` for that specific test

### CI/CD Integration
The configuration auto-detects CI environments (via `process.env.CI`):
- Enforces `forbidOnly` (prevents accidental `test.only`)
- Enables retries (2×)
- Runs tests sequentially (avoids port conflicts)

Add to your CI pipeline:
```bash
npm ci                    # Use lockfile for reproducibility
npx playwright install --with-deps
make build
make visual-test
```

## Environment Variables

### Optional Variables
- **CI**: Set to `true` in CI environments (auto-detected by most platforms)
- **PORT**: Server port (default: 3000)

### No Manual CLI Flags Required
All configuration is codified in `playwright.config.ts`. The Makefile targets are intentionally simple:
```makefile
visual-test:
    npm test  # No flags needed
```

## Best Practices

1. **Always Review Diffs**: Run `make visual-report` after failures
2. **Atomic Commits**: Update snapshots in separate commits from CSS changes
3. **Descriptive Messages**: Explain why snapshots changed in commit messages
4. **Pair Review**: Have another person review visual changes

## Dependencies

- **Node.js**: ≥18.0.0 (check with `node --version`)
- **Playwright**: 1.48.0 (pinned)
- **Python HTTP Server**: Built-in (for serving `output/` directory)

Note about WebKit on Fedora:

Playwright's WebKit (the engine closest to Mobile Safari) can be large and may require additional system libraries on Fedora. This setup forces Chromium for all projects by default to avoid WebKit installation failures on some Linux distributions. To enable WebKit (true Mobile Safari engine) later:

1. Install required system packages on Fedora (example):

```bash
sudo dnf install -y gtk3 libXScrnSaver libXcomposite libXrandr libXdamage libXcursor libXtst libXfixes
```

2. Run the fuller installer (may attempt to install system deps on Debian/Ubuntu):

```bash
npm run install:browsers:with-deps
```

Or to just download WebKit binaries without attempting to install OS packages:

```bash
npm run install:browsers
```

If you cannot install WebKit, the test suite will still run using Chromium-based emulation of iPhone viewports; this provides a practical safety net for CSS refactors while you arrange WebKit support.

## Resources

- [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Configuration API](https://playwright.dev/docs/test-configuration)
- [Best Practices](https://playwright.dev/docs/best-practices)
