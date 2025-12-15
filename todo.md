# Pelican Blog Project To-Do List

## 1. CSS / Styling

### 1.1 Modularization
- [ ] Extract all inline/embedded CSS into separate `.css` files
- [ ] Split into modules:
  - [ ] `base.css` → resets, typography
  - [ ] `layout.css` → header, footer, grid system
  - [ ] `components.css` → article cards, buttons, carousel
  - [ ] `blog.css` → blog-specific styles
- [ ] Integrate CSS files into the Pelican theme properly

### 1.2 Article Card Layout
- [ ] Adjust spacing between title and text in article cards
- [ ] Ensure consistent spacing across all cards
- [ ] Remove awkward gaps
- [ ] Allow dynamic height based on content

### 1.3 Large Images for Each Blog Entry
- [ ] Support at least one large header image per blog post
- [ ] Optional: support multiple images or gallery per post
- [ ] Ensure responsive scaling in templates

---

## 2. Pelican Content / HTML Structure

### 2.1 Context Section on Main Page
- [ ] Add a "Context / About this Blog" section at the bottom of `index.html`
- [ ] Use a dedicated template block or partial include
- [ ] Style appropriately (expand/collapse optional)

### 2.2 Social Links
- [ ] Add social links in header/footer via theme templates
- [ ] Ensure links open in new tabs
- [ ] Optional: use SVG icons or Font Awesome

### 2.3 Metadata for Blog Entries
- [ ] Ensure each Markdown/reStructuredText file has proper front-matter:
```
Title: My Blog Entry
Date: 2025-12-12
Author: David Zimmermann
Tags: Data, Engineering
Image: images/blogs/my-entry/header.jpg
```
- [ ] Verify image paths match Pelican `STATIC_PATHS`

---

## 3. JavaScript

### 3.1 Modularization
- [ ] Move all JS from HTML templates to separate `.js` files:
  - [ ] `carousel.js`
  - [ ] `search.js`
  - [ ] `utils.js`
- [ ] Include JS via the Pelican theme templates

### 3.2 Carousel
- [ ] Extract carousel logic into `carousel.js`
- [ ] Improve behavior:
  - [ ] Smooth scrolling
  - [ ] Disable arrow keys
  - [ ] Optional: touch/drag support

### 3.3 Search Functionality
- [ ] Implement live search for blog entries:
  - [ ] Filter cards by title/text/metadata
  - [ ] Case-insensitive matching
  - [ ] Optional: highlight matches
  - [ ] Use debounce for performance
- [ ] Add `search.js` to theme `static/js` folder

---

## 4. Content / Media

### 4.1 Images
- [ ] Ensure `/images/blogs/{slug}/` folder structure
- [ ] Reference images via front-matter in Markdown or reStructuredText
- [ ] Optional: add thumbnails for index page cards

---

## 5. Deployment

### 5.1 GitHub Actions
- [ ] Set up a workflow that:
  - [ ] Builds the Pelican site
  - [ ] Publishes the output to `gh-pages`
  - [ ] Runs on push to `main`
- [ ] Optional:
  - [ ] Cache dependencies for faster builds
  - [ ] Test build locally with `pelican content` before push




- akut:

    - contact page
    - iamges in blog posts (header)


todo:
- cut off tags at ~10 and implement a show more
- make the thumbnails clcikable
- make the large proejct thumbnail look better

-> write another draft for task orbit
-> do the gh pages automation
  -> on 


pelican project:
what needs to be done: modularize css. professionalize repo with pre-commit-hooks, add tests