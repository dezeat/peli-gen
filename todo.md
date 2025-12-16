# Pelican Blog Project To-Do List

## 1. CSS / Styling

### 1.1 Modularization
- [ ] Modularize CSS (split into `base.css`, `layout.css`, `components.css`, `blog.css`)
- [ ] Integrate modular CSS into the theme and verify styling across pages

### 1.2 UI polish
- [x] Improve article card layout and spacing
- [x] Add support for large header images per post

## 2. JavaScript / Interaction

- [x] Refactor JavaScript into separate files (`carousel.js`, `search.js`, `utils.js`)
- [x] Improve carousel behavior (smooth scroll, touch support)
- [x] Implement client-side live search (debounced)

## 3. Content & Templates

- [x] Provide a post template and front-matter guidelines
- [x] Add 'Context / About this Blog' section to the index template
- [x] Add social links to header/footer in theme templates
- [x] Organize `content/images/` and add thumbnail support

## 4. CI / Deployment

### 4.1 GitHub Actions
- [ ] Add a CI workflow to build the Pelican site
- [ ] Add a publish workflow to deploy output to `gh-pages` on push to `main`
- [ ] Add a smoke test step that runs `pelican content` to validate builds

## 5. Repository Hygiene

- [ ] Create `CONTRIBUTING.md` and a post template
- [ ] Add pre-commit hooks and minimal tests
- [ ] Review and clean up repository structure

## 6. Writing

- [ ] Write a new draft for the 'Task Orbit' post

---

Notes / Next steps:
- Prioritize CSS modularization and a minimal GH Actions workflow (build + publish).
- After automation, add caching and CI smoke tests for faster, safer builds.

## 7. Suggested Improvements (optional / future)

- [ ] Accessibility audit and fixes (WCAG basics, ARIA roles, keyboard nav)
- [ ] Add sitemap.xml and robots.txt; enhance SEO meta and OpenGraph tags
- [ ] Generate RSS/Atom feed and ensure feed links in templates
- [ ] Automate image optimization (WebP, responsive srcset) and add lazy-loading
- [ ] Add Lighthouse CI or GitHub Action to track performance, accessibility, best-practices
- [ ] Add link/HTML checker in CI to catch broken links and invalid markup
- [ ] Add a local preview Dockerfile or `docker-compose` for consistent dev environment
- [ ] Add Markdown linting and spelling/grammar checks (markdownlint, Vale)
- [ ] Add template tests (render small sample content and assert expected output) using pytest
- [ ] Add PR and issue templates, CODE_OF_CONDUCT.md, and SECURITY.md
- [ ] Add Dependabot or similar to keep dependencies up-to-date
- [ ] Add an optional dark mode and theme toggle with CSS variables
- [ ] Add contributor-friendly docs: README improvements, quick start, release notes
- [ ] Consider internationalization (i18n) support for templates and content
- [ ] Add analytics/privacy options (cookie consent + privacy-friendly analytics)

These are high-impact, incremental improvements—tell me which ones you want prioritized and I will implement the first one.

