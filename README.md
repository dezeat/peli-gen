# Pelican Static Site Generator - Quick Reference

Dieses Repository nutzt [Pelican](https://getpelican.com/) als Static Site Generator und wird auf GitHub Pages gehostet. Es verwendet eine moderne, mobile-first Struktur mit TailwindCSS und einer modularen Content-Organisation.

## 🚀 Wichtigste CLI-Befehle

### Lokale Entwicklung

```bash
# Entwicklungsserver starten (mit automatischem Reload)
pelican --autoreload --listen

# Alternative: Server mit spezifischem Port
# peli-gen — minimal Pelican site

Lightweight Pelican site scaffold (dezeat).

## Quickstart

Prerequisites: Poetry and Python (3.10+ recommended).

1. Install dependencies:

   poetry install

2. Build the static site (output written to `output/`):

   make html

3. Run the dev server (autoreload):

   make dev

4. Start a background preview (opens the browser):

   make preview

   Stop it with:

   make stop-preview

### Notes

- Tailwind is optional. To compile Tailwind CSS you need Node.js and the Tailwind CLI; then run `make tailwind`.
- A fallback `themes/mytheme/static/main.css` exists so the site looks good without a Tailwind build.
- This cleanup was performed locally (Plan B). No commits or pushes were made by the assistant.

## Layout

- Theme: `themes/mytheme/` (custom minimal theme)
- Content: `content/` (blog, projects, pages, images)
- Configuration: `pelicanconf.py` and `publishconf.py`

If you'd like me to create a single commit with these cleanup changes and push them to `main`, say so and I'll do it.