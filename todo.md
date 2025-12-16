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

- [ ] Add sitemap.xml and robots.txt; enhance SEO meta and OpenGraph tags
- [ ] Generate RSS/Atom feed and ensure feed links in templates

## 4. CI / Deployment

### 4.1 GitHub Actions
- [ ] Add a CI workflow to build the Pelican site
- [ ] Add a publish workflow to deploy output to `gh-pages` on push to `main`
- [ ] Add a smoke test step that runs `pelican content` to validate builds

- [ ] Add Dependabot or similar to keep dependencies up-to-date

## 5. Repository Hygiene

- [ ] Create `CONTRIBUTING.md` and a post template
- [ ] Add pre-commit hooks and minimal tests
- [ ] Review and clean up repository structure

- [ ] Add PR and issue templates, CODE_OF_CONDUCT.md, and SECURITY.md
- [ ] Add Markdown linting and spelling/grammar checks (markdownlint, Vale)

## 6. Writing

- [ ] Write a new draft for the 'Task Orbit' post

---

Notes / Next steps:
- Prioritize CSS modularization and a minimal GH Actions workflow (build + publish).
- After automation, add caching and CI smoke tests for faster, safer builds.

These five items are added as low-hanging, high-impact improvements; the other suggested items were removed per your request.

