
# Pelican Static Portfolio & Blog Site

Minimal Pelican-based static site for a portfolio and blog. The project uses `poetry` to manage Python dependencies and a small custom theme under `themes/mytheme/`.

This README mixes a short project description, developer documentation, and quick how-to steps — enough to get a local development environment running and to edit content.

---

## Quickstart (local development)

Prerequisites: `poetry`, Python 3.10+.

1. Install dependencies:

   ```bash
   poetry install
   ```
2. Build the static site (outputs to `output/`):

   ```bash
   make build
   ```
3. Start the development server (autoreload):

   ```bash
   make serve
   ```
4. Clean, build, and serve in one step:

   ```bash
   make launch
   ```
5. Stop the development server:

   ```bash
   make stop
   ```

Notes:
- The Makefile uses `poetry run pelican ...` for commands. You can also run Pelican directly with `poetry run pelican`.
- Pelican doesn't provide a built-in server-stop command; the Makefile's `stop` target kills any running Pelican dev server processes.
- Tailwind/CSS: Tailwind is optional and is not preconfigured by default here. If you need Tailwind, install Node and add the tooling (there is no maintained `package.json` by default).

---

## Makefile commands

| Command     | Description                          |
|-------------|--------------------------------------|
| `make build`  | Build static site to `output/`       |
| `make serve`  | Start dev server with autoreload     |
| `make stop`   | Stop the dev server (if running)     |
| `make clean`  | Remove generated output/             |
| `make launch` | Clean, build, and serve in one step  |

---

## Project structure (important paths)

```
content/                # Markdown content: blog, projects, pages
  blog/
  projects/
  pages/
  images/
themes/mytheme/         # Theme overrides: templates + static CSS
  templates/
  static/main.css
pelicanconf.py          # Local Pelican settings
publishconf.py          # Publishing settings
Makefile                # Build / serve / stop / launch targets
pyproject.toml          # Poetry project and dependencies
```

Where to edit:
- Add blog posts: `content/blog/` (Markdown with Pelican metadata)
- Add project pages: `content/projects/`
- Update templates: `themes/mytheme/templates/`
- Edit site CSS: `themes/mytheme/static/main.css`

---


## Pelican configuration — details and how it maps to this repo

This project is a standard Pelican site; two configuration files control behavior:

- `pelicanconf.py` — development settings used when running the local server or building locally.
- `publishconf.py` — production / publishing settings (overrides values from `pelicanconf.py`).

Key concepts:
- Pelican reads a settings module (by default `pelicanconf.py`) to determine content paths, theme, and output behavior. `publishconf.py` typically sets `SITEURL`, enables feed generation, and sets `DELETE_OUTPUT_DIRECTORY = True` for clean deploys.
- The Makefile uses `poetry run pelican -s <settings>`; by default the Makefile points at `pelicanconf.py` for local work and `publishconf.py` for publishing tasks.

Important settings in `pelicanconf.py` (what they mean here):

- `PATH`: the top-level content folder. Here: `content/` — add posts, pages, projects under this folder.
- `ARTICLE_PATHS`: where article content lives (this repo uses `['blog', 'projects']`).
- `PAGE_PATHS`: where static pages live (`['pages']`).
- `STATIC_PATHS`: list of directories copied to `output/` unchanged (`['images']`).
- `PROJECT_PATHS`: optional custom path for project entries (this repo includes it for clarity).
- `THEME`: path to the local theme override (`themes/mytheme`).
- `DIRECT_TEMPLATES`: controls which site-level pages Pelican builds automatically (this repo restricts to `['index','blog','projects']`).
- `TAGS_SAVE_AS`, `CATEGORIES_SAVE_AS`, `AUTHORS_SAVE_AS`, `ARCHIVES_SAVE_AS`: set to empty strings to avoid generating those index pages when undesired.

`publishconf.py` (typical differences in this repo):

- `SITEURL`: set to the live site root (e.g. `https://example.com`) so generated links are absolute when publishing.
- `DELETE_OUTPUT_DIRECTORY = True`: safe to remove local `output/` before publishing.
- Feed generation and analytics options are usually enabled here for production builds.


---

## License

See [LICENSE](LICENSE).

---
