Title: How I build this Blog with Pelican
Date: 2025-12-15 12:00
Type: project
Tags: Python, Pelican, Web Development, CI/CD, Automation
Category: Project
Summary: Why I chose a static site generator over a CMS, and how I built a robust, low-maintenance publishing platform using pelican SSG.
Thumbnail: images/blog/pelican_tb.png
Main: images/blog/pelican_main.png

## Project Overview

This project is my personal portfolio and blog system, deliberately implemented as a **static site**. My goal was to create a robust, low-maintenance, yet flexible platform to publish technical content in a structured way—without relying on complex frontend frameworks or heavy CMS stacks.

The focus wasn't on visual gimmicks, but on clear structure, extensibility, and an efficient authoring workflow. I view this site as my **digital workbench**: a place to document experiments and reflect on engineering patterns, free from the distractions of complex web infrastructure.

---

## Motivation & Tech Choice

As a Data Engineer with a clear focus on **Python**, it was natural for me to build this project entirely within the Python ecosystem. My professional environment is defined by automation and structured code, so I wanted my personal site to reflect that.

I chose **Pelican**, a Python-based static site generator. The decision was driven by productivity and control:

* **Python Integration:** Pelican fits seamlessly into my existing tooling and environment.
* **Proven Templating:** It uses **Jinja2**, which is declarative, readable, and a standard in the Python world (similar to tools I use in data orchestration).
* **Speed to Code:** The goal was to have a working, extendable system as quickly as possible—not to spend weeks learning a new frontend framework.
* **Separation of Concerns:** Content is managed strictly via Markdown files with defined metadata, keeping the content clean from the presentation layer.

This combination allows me to focus on content and structure, while the presentation remains consistent and reproducible.

---

## The Workflow

The authoring process is minimalist and optimized for repeatability rather than individual effort per post:

1.  **Content:** Every post is a simple Markdown file.
2.  **Metadata:** A compact header defines the title, date, category, tags, and assets.
3.  **Build:** The system generates a fully rendered static site with navigation, SEO-friendly structure, and optimized feeds.

There is no database to maintain and no backend to patch. This workflow reduces friction and makes writing the central task.

---

## Design & Customization

I started by analyzing existing Pelican themes and then selectively adapting them. I didn't want a generic look, so I heavily customized the CSS to build a "Cool Blue" professional theme that fits my style.

Key engineering tasks included:
* Simplifying the HTML structure.
* Consolidating CSS to be modular and maintainable.
* Implementing a **client-side search** using modular JavaScript to filter by Tags and Categories instantly.
* Designing a responsive **Hero Section** that establishes the site's identity.

I effectively used **LLMs** as a pair programmer during this phase. This allowed me to iterate quickly on CSS layouts and frontend logic, bridging the gap between my backend/data expertise and modern web design standards.

---

## Automation & Deployment

The entire build and release process is automated, treating the blog infrastructure like any other software project:

* **GitHub Actions** handle the build process on every commit.
* **GitHub Pages** serves the static content.
* **Zero Overhead:** No servers, no hosting costs, no runtime maintenance.

Every commit leads deterministically to an updated website.

---

## Conclusion

This project confirmed that **Static Site Generators** are an extremely efficient approach for engineering-focused portfolios. They offer full control without the bloat.

By focusing on functioning code early and leveraging modern tooling (including AI assistance), I built a system that is lightweight, fully controlled, and tailored exactly to my needs. It allows me to focus on what matters: **Building, Breaking, and Learning.**

---

### Code & Repository

The full source code, including the build pipeline and theme customizations, is publicly available:

➡ **GitHub Repository:** [Insert Link Here]