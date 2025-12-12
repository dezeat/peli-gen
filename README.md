
# Pelican Static Portfolio & Blog Site

This repository contains a minimal, modern static site built with [Pelican](https://getpelican.com/), managed with Poetry, and styled for mobile-first, responsive design. The site showcases a personal brand, blog posts, and projects, using a custom theme and modular content structure.

---

## 🚀 Quickstart

**Prerequisites:** Poetry, Python 3.10+, (optional: Node.js & Tailwind CLI for custom CSS)

1. **Install dependencies:**
   ```bash
   poetry install
   ```
2. **Build the static site:**
   ```bash
   make build
   ```
3. **Start the development server (autoreload):**
   ```bash
   make serve
   ```
4. **Stop the development server:**
   ```bash
   make stop
   ```
   > Pelican does not provide a built-in stop command for the dev server. The Makefile's `stop` target will stop the server if running, or clean up the PID file if the process is already gone.

---

## 🗂️ Content Structure

```
content/
  blog/       # Markdown files for blog posts
  projects/   # Markdown files for projects
  pages/      # About, Contact, etc.
  images/     # Shared images
```

- **Blog posts:** `content/blog/` (type: article)
- **Projects:** `content/projects/` (type: project or article with `Type: project`)
- **Static pages:** `content/pages/` (About, Contact)

---

## 🎨 Theme & Templates

- Custom theme: `themes/mytheme/`
- Key templates:
  - `index.html`: Home/landing page (hero, recent posts, project preview)
  - `blog.html`: Blog feed (single-column, sidebar)
  - `projects.html`: Project grid
  - `page.html`: Static pages (About, Contact)

---

## ⚙️ Configuration

- Main config: `pelicanconf.py`, `publishconf.py`
- Example (see `pelicanconf.py`):
  ```python
  ARTICLE_PATHS = ['blog']
  PAGE_PATHS = ['pages']
  STATIC_PATHS = ['images']
  PROJECT_PATHS = ['projects']  # if using a separate type
  ```

---

## 🛠️ Makefile Commands

| Command     | Description                          |
|-------------|--------------------------------------|
| make build  | Build static site to `output/`       |
| make serve  | Start dev server with autoreload     |
| make stop   | Stop the dev server (if running)     |
| make clean  | Remove generated output/             |
| make tailwind | (Optional) Build Tailwind CSS      |

---

## 📝 Implementation Notes

- Mobile-first, responsive (TailwindCSS recommended)
- Modular content: easy to add new posts/projects
- Shared color/typography/spacing
- Smooth hover effects, clean layout
- All dependencies managed with Poetry

---

## 📁 Project Layout

- Theme: `themes/mytheme/`
- Content: `content/`
- Output: `output/`
- Config: `pelicanconf.py`, `publishconf.py`

---

## License

See [LICENSE](LICENSE).