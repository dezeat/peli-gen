# Peli-Gen

A small, focused Pelican site project and environment helper for building this blog.

## Overview

`peli-gen` packages a Pelican-based static site setup used to build the site found under `content/` and the theme under `themes/mytheme/`.

Key points:
- Python: requires Python >= 3.13
- Build tooling: Poetry is used for dependency and virtualenv management
- Static site generator: Pelican

## Quick start

Clone and install dependencies (using Poetry):

```bash
git clone https://github.com/dezeat/peli-gen.git
cd peli-gen
poetry install
```

Optionally install the deployment extras (for `ghp-import`):

```bash
# Poetry v1.4+
poetry install --with deploy
# or older poetry syntax (if applicable):
poetry install --extras deploy
```

Build the site (production):

```bash
make build
```

Run the dev server with autoreload:

```bash
make serve
# open http://127.0.0.1:8000 (the Makefile attempts to open it automatically)
```

Stop the dev server:

```bash
make stop
```

Clean generated files:

```bash
make clean
```

Run the full flow (clean, build, serve):

```bash
make launch
```

## Project layout

- `content/` — markdown content for posts, pages and images. Notable subfolders:
	- `content/blog/` — blog articles
	- `content/pages/` — site pages (about, privacy, etc.)
- `themes/mytheme/` — Pelican theme used by the site (templates and static assets)
- `pelicanconf.py` — Pelican configuration used for building and serving
- `pyproject.toml` — project metadata and dependencies
- `Makefile` — convenience targets for build / serve / clean / launch
- `todo.md` — project TODOs and roadmap items

## Configuration notes

- `pelicanconf.py` sets `THEME = "themes/mytheme"`, disables pagination, and controls static/content paths.
- To publish the site to a production host set `SITEURL` in `pelicanconf.py` or use a separate `publishconf.py`.

## Publishing

This repository focuses on the site source and local development. Publishing the generated `output/` directory is intentionally left flexible so you can pick the host or workflow you prefer (GitHub Pages, Netlify, S3, etc.).

If you want a quick, manual publish to GitHub Pages, a common pattern is:

```bash
make build
# then push the contents of `output/` to your hosting target (manually or via your CI)
```

For automation, add a CI workflow that runs `poetry install` and `make build`, then deploys `output/` to your chosen target.

## Publishing posts (how to use this repo to add content)

1. Create a new article file in `content/blog/`. Use a clear filename and slug, for example `2025-12-16-my-new-post.md`.

2. Add front-matter at the top of the file. Example Markdown front-matter Pelican supports:

```
Title: My New Post
Date: 2025-12-16 10:00
Tags: pelican, blog
Image: images/blog/my-new-post/header.jpg
Slug: my-new-post
```

3. Place any referenced images under `content/images/...` (or a subfolder) and reference them from the front-matter or Markdown using relative paths matching `STATIC_PATHS`.

4. Preview locally while editing:

```bash
make serve
# or build without serving:
make build
```

5. When content looks correct, commit and push the new file(s) to your git branch. If you have an automated deploy, the CI will pick up the changes and publish; otherwise run your chosen publish steps manually.

Tips:
- Use the `Date` field for ordering; include a time if you need precise ordering.
- Keep image files in `content/images/` and reference them via the `Image` front-matter key when used by your theme.
- Use `Slug:` to control the URL if you need a specific path.

## Development tips

- Edit content in `content/` (front-matter is used to control metadata such as `Title`, `Date`, `Tags`, and `Image`).
- Theme templates live in `themes/mytheme/templates/` — edit templates and static assets in `themes/mytheme/static/`.
- Use `make serve` while editing — Pelican autoreload will rebuild pages on change.

## Roadmap & contributions

See `todo.md` for the project's roadmap and outstanding tasks (CSS modularization, JS modularization, deployment automation, etc.). Contributions are welcome — open a PR with changes and include a short description of what you changed and how to validate locally (e.g. `make build`).

## License

This project is licensed under the MIT License (see `LICENSE`).
