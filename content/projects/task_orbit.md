Title: TaskOrbit: A "Hello World" Web App
Date: 2025-12-12 19:00:00
Type: project
Thumbnail: images/blog/task_orbit_tbn.png
Main: images/blog/task_orbit_main.png
Category: Projects
Tags: Flask, HMTX, Containers
Summary: This post shares lessons from building TaskOrbit, a to-do app, to learn backend development, dynamic UIs, and deployment using Flask, HTMX, containers, and modern Python tooling.


I’ve used Pelican (a static site generator) for my personal blog. It’s easy, fast, and perfect for publishing content without worrying about servers or databases. But I always knew I was missing out on the world of backend and server-side development. I wanted to get my hands dirty with something more dynamic—something that would let me learn the basics of backend web apps, but without jumping straight into the deep end.

So, like many before me, I decided to build a to-do app. Not because the world needs another one, but because it’s the perfect “hello world” for backend development. TaskOrbit became my hands-on intro to Flask, HTMX, and containerization, and a way to finally bridge the gap between static sites and interactive web apps.


## Motivation: From Pelican to Python Servers

Pelican and other SSGs are great for content, but they don’t teach you about sessions, databases, or real-time user interaction. I wanted to understand what it takes to build a real, interactive app: one that lets users add, edit, and delete tasks in real time, with a modern user experience and a robust backend. This project was my way to finally get in touch with backend/server development, but in a way that was approachable and practical.


## The Tech Stack

- **Flask**: Lightweight, flexible, and perfect for rapid prototyping. It handles routing, sessions, and template rendering.
- **HTMX**: Enables dynamic, AJAX-powered UI updates with minimal JavaScript. It bridges the gap between static templates and a reactive frontend.
- **SQLAlchemy & Pydantic**: For ORM and data validation, ensuring type safety and clean data models.
- **Poetry**: Simplifies dependency management and keeps the project organized.
- **DevContainers & Docker**: Ensures a consistent development environment and paves the way for seamless deployment.


## What I Set Out to Learn

- How to structure a Flask app for maintainability and scalability
- Using HTMX to create a responsive, interactive UI without a heavy JS framework
- Managing data with SQLAlchemy and Pydantic
- Packaging the app in a container for platform-agnostic deployment


## Key Implementation Insights

- **Flask + HTMX**: This combination made it easy to build an app that feels modern and interactive, while keeping most of the logic in Python and Jinja templates.
- **Database Layer**: I built a modular config system supporting SQLite, Postgres, and MySQL. This was a big leap from the file-based world of SSGs.
- **Containerization**: Setting up a devcontainer and Dockerfile early meant fewer headaches when moving between development and production.
- **Frontend/Backend Synergy**: HTMX let me update only the parts of the page that needed it, making the app feel snappy without a full SPA stack.


## Challenges Along the Way

- **State Management**: Unlike static sites, I had to handle sessions, user IDs, and database transactions.
- **Live Updates**: Making edits and deletes feel instant required careful route and template design, especially with HTMX triggers.
- **Cross-Platform Containers**: Ensuring the devcontainer worked on Fedora, WSL2, and other environments took some trial and error.


## What’s Next for TaskOrbit

- Complete the in-place task editing feature
- Add user authentication and multi-user support
- Write comprehensive tests and set up CI/CD with GitHub Actions
- Build a production-ready Docker image for deployment

## Final Thoughts

Switching from Pelican and static sites to a dynamic, interactive app was both challenging and rewarding. If you’re looking to get in touch with backend/server development, building a to-do app with Flask and HTMX is a great “hello world” project. Containerizing it from the start makes future deployment a breeze. The lessons go far beyond CRUD, and it’s a fun way to bridge the gap between static and dynamic web development.


