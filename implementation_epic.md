Absolutely — I can extend your original epic to include **Pelican-specific implementation details** in a structured, actionable way. I’ll keep it concise and ticket/epic style so it’s ready for your repo.

---

# Epic: Static Portfolio & Blog Site with Pelican

**Goal:**
Create a minimal, responsive static site using Pelican that showcases personal brand, blog posts, and projects. The site should be modern, mobile-first, visually clean, and easily maintainable.

---

## 1. Pages & Templates

| Page                | Pelican template                      | Purpose                                                                                                                 |
| ------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Home**            | `index.html` (theme override)         | Landing page with hero, recent blog posts, project preview, and links to About/Contact.                                 |
| **Blog**            | `blog.html` (new custom template)     | Single-column feed with sidebar for blog posts. Articles stored as `article` content type.                              |
| **Projects**        | `projects.html` (new custom template) | Magazine-style grid for projects. Projects can be stored as a custom content type or as `article` with `Type: project`. |
| **About / Contact** | `page.html` (default)                 | Static pages for personal info and contact.                                                                             |

**Notes:**

* Home page uses `index.html` template and aggregates previews of blog posts and projects.
* Blog page is a custom template (`blog.html`) that loops over `article` type content.
* Projects page is a custom template (`projects.html`) that loops over `project` type content (custom content type or articles tagged as projects).
* About and Contact pages are standard `page` content with `page.html`.

---

## 2. Implementation Details

### Pelican Content Organization

```
content/
  blog/             # Markdown files for blog posts
    post1.md
    post2.md
  projects/         # Markdown files for projects
    task-orbit.md
    iss-tracker.md
  pages/            # Markdown files for About and Contact
    about.md
    contact.md
  images/           # Shared images for posts/projects
```

* **Blog posts**: type `article`, placed in `content/blog/`
* **Project entries**: either custom type `project` in `content/projects/` or articles with `Type: project`
* **Static pages**: About/Contact in `content/pages/`

---

### Pelican Configuration (`pelicanconf.py`)

```python
ARTICLE_PATHS = ['blog']
PAGE_PATHS = ['pages']
STATIC_PATHS = ['images']

# Optional: configure custom project content type
PROJECT_PATHS = ['projects']  # if using a separate type
```

---

### Theme & Template Strategy

1. **Custom theme copy**:
   Copy your base theme to `themes/mytheme` to override templates.

2. **Templates to implement**:

   * `index.html` → homepage layout (hero, recent posts carousel, project preview)
   * `blog.html` → blog feed page with sidebar (categories, popular posts, search)
   * `projects.html` → magazine-style grid for project entries
   * `page.html` → used for About and Contact pages

3. **Jinja2 Loops & Logic**:

   * Loop over articles for blog page:

     ```jinja
     {% for article in articles %}
       <article>
         <h2>{{ article.title }}</h2>
         <p>{{ article.summary }}</p>
         <a href="{{ article.url }}">Read more</a>
       </article>
     {% endfor %}
     ```
   * Loop over projects for projects page:

     ```jinja
     {% for project in projects %}
       <div class="project-card">
         <img src="{{ project.image }}" alt="{{ project.title }}">
         <h3>{{ project.title }}</h3>
         <p>{{ project.summary }}</p>
       </div>
     {% endfor %}
     ```

---

## 3. Page Layout Strategy

### Home Page

* Hero section
* Recent blog posts (horizontal scroll or small grid)
* Project preview (2–3 featured cards)
* Links to About and Contact
* Footer

### Blog Page

* Single-column feed
* Sidebar: search, categories/tags, popular posts
* Pagination or “Load more”

### Projects Page

* Hero banner / intro text
* Grid layout of projects
* Optional category filters
* Each project links to its own detailed page

### About / Contact

* Static content pages using `page.html`

---

## 4. Implementation Notes

* Mobile-first, responsive design (TailwindCSS recommended)
* Horizontal scroll for featured posts on home page
* Shared typography, color scheme, spacing across all pages
* Smooth hover effects for cards
* Modular content so new posts/projects are easy to add

---

This epic now includes **all the Pelican-specific details**, mapping your high-level ideas to templates, content organization, and implementation strategy.

---

If you want, I can also **draft the folder structure + placeholder templates** for `index.html`, `blog.html`, `projects.html`, and `page.html` so you can start building directly in Pelican.

Do you want me to do that next?
