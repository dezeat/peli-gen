Title: TaskOrbit: Warum noch eine Todo Web-App?
Slug: TaskOrbit
Type: project
Thumbnail: images/blog/task_orbit_tbn.png
Main: images/blog/task_orbit_main.png
Category: Projects
Date: 2025-12-12 19:00
Tags: Python, Flask, HTMX, Pydantic, SQLAlchemy, Docker, Refactoring, AI-Coding
Summary: Eine Todo-App als Lernprojekt: Deep-Dive in Flask, HTMX, Pydantic und moderne Dev-Standards und Tooling.

### TL;DR
* Ein Data Engineer baut eine klassische Todo-App, um moderne Python-Patterns (Poetry, Pydantic, DevContainers) und Web-Dev (Flask, HTMX) zu lernen.

* Was als etwas over-engineertes Greenfield-WebDev-Abenteuer begann, wurde durch Refactoring ("Design it Twice") und Agentic-Workflow-Support zu einer schlanken Anwendung vereinfacht. 

* Key-Learnings: Locality of Behaviour schlägt oft Clean Architecture, Pydantic ist mächtiger als gedacht, und Auth gehört immer ins Backend.

### Vom Data Engineering zum Fullstack-Experiment

Eigentlich komme ich aus der Datenecke: Ich bin self-taught Data Engineer mit rund 3,5 Jahren Erfahrung. Seit August 2024 arbeite ich in einem Job an einer Azure Databricks Plattform, wo ich das erste Mal an einer komplexen, großen Codebase arbeiten und lernen kann, die moderne SWE-Standards konsequent umsetzt: Tests, Clean Code, Modularisierung und viel OOP (wo notwendig). Dazu kamen Tools, die ich vorher kaum oder gar nicht nutzte: Poetry zum Package Management, Pytest, Pydantic für validierte Data-Classes und VS Code DevContainer zur Kapselung der Entwicklungsumgebung.

Meine Idee war: Ich wollte dieses "Enterprise"-Wissen festigen, indem ich es zuhause, spielerisch und ohne Druck nachbaue. Aber weil ich bei privaten Spaß-Projekten zu glänzenden, träumerischen Augen neige und dadurch den Scope zu sprengen, reichte mir das Backend nicht. Ich wollte zusätzlich "Basic Web-Dev" lernen.

So entstand der Plan für "TaskOrbit": Eine Python Web-App mit Flask und HTMX. Flask, weil es weniger "heavy-weight" und "opinionated" als Django ist. HTMX, weil es versprach, dass man sich kaum mit Frontend-JavaScript herumschlagen muss. Das Rendering sollte über Jinja2 laufen, da ich die Templating-Engine schon kannte. Um das Ganze abzurunden, wollte ich einen DB-agnostischen Adapter bauen, der dank SQLAlchemy theoretisch alles von SQLite (lokal) bis Postgres/MariaDB (Deployment) bespielen kann.

### Der erste Entwurf

Im Oktober '24 gings los: Als Vorlage diente unser Repo aus dem Job. Das initiale Setup mit VS Code DevContainer und Poetry stand schnell. Ein frühes technisches Highlight (oder Ärgernis) war mein lokales Setup: Da ich privat Fedora Linux nutze (SELinux-basiert), musste ich im Docker-Compose Mount das `Z`-Flag setzen. Ein kleines Detail, das mich Stunden an Debugging kostete, aber essenziell ist, wenn man Container unter Fedora oder RHEL sauber laufen lassen will. Zudem wollte ich unser Podman-Setup nachbauen, was aufgrund der Rootless- vs. Root-Unterschiede zu Docker ebenfalls einige Anpassungen erforderte.

Beim Code selbst habe ich versucht, alles "richtig" zu machen.
Ich schrieb ein Modul für SQLAlchemy-Klassen (die DB-Tabellen) und ein separates Modul für Pydantic-Klassen (Datentransport im Code). Dazu kam eine komplexe Abstraktion der Datenbanken: Eine Abstract Base Class (ABC) definierte das Interface, von der ich SQLite- und Postgres-Klassen ableitete, komplett mit Factory- und Setup-Methoden sowie einer ausgefeilten Config-Klasse, inspiriert von meiner Arbeit, um diese DB-Verbindungen zu initialisieren.

Auch die Logik kapselte ich stark. Ich erstellte ein CRUD(+)-Modul, um SQLAlchemy-Code zu verallgemeinern, damit der Route-Code "DRY" bleibt. Die Routes selbst waren klassisch Flask: Decorators für die Endpoints und HTMX-Logik, die Partials neu rendert (z. B. Task-Liste Update nach Delete).

Dazu kam eine `main.py` als Entrypoint, die die App-Factory `create_app()` aufruft, und ein Makefile für häufige Befehle im Dev-Workflow wie `make launch`.

Nach einigem an Arbeit hatte ich einen 80% fertigen MVP. Man konnte Tasks erstellen und suchen. Die Frontend-Elemente für Edit und Delete hatte ich schon implementiert, allerdings noch nicht die Backend-Logik. Wie so oft bei Hobby-Projekten verließ mich, nachdem der Proof-of-Concept lief, allerdings die Motivation, jetzt nach der Pareto-Regel nochmal 80% der Zeit zu investieren, um die restlichen 20% zu finalisieren. So landete das Projekt erstmal auf dem guten alten GitHub Project & Tech Debt-Friedhof.

### Refactoring

Fast forward zum Dezember 2025. Mit frischer Motivation und dem Ziel, moderne LLM-Agent-Workflows zu testen, schaute ich mir das Projekt nochmal an. Ich nutzte nicht nur die Autocomplete-Funktion, sondern den GitHub Copilot Agent Mode in VS Code.

Dabei habe ich gelernt: Copilot ist "super-charged", wenn man es mit präzisen Specs und Prompts versorgt. Statt blind Code zu generieren, habe ich eine `instructions.md` erstellt, die dem Agenten den Kontext und die Coding-Guidelines gab. Der Agent plante daraufhin selbstständig Refactoring-Schritte und arbeitete Todos ab.

Inspiriert von "A Philosophy of Software Design" entschied ich mich für ein massives Refactoring unter dem Motto "Design it Twice". Meine ursprüngliche Interaktion zwischen SQLAlchemy und Pydantic war unnötig kompliziert. Ich hatte manuelle Serializer-Funktionen geschrieben, um die Daten "sauber" zwischen den Schichten zu trennen, was den Code unnötig aufblähte und wartungsintensiv machte.

Die Lösung war radikal einfacher:

1.  **Serializer gelöscht:** Statt manueller Mapping-Funktionen nutze ich nun die `model_dump`-Methoden von Pydantic oder übergebe SQLAlchemy-Objekte direkt an `render_template`. Pydantic-Modelle können oft direkt aus dem ORM-Objekt validiert werden, was massiv Boilerplate spart.

2.  **Vertical Slice Architecture:** Ich habe den CRUD-Layer entfernt und die Logik direkt in die Routes verschoben. Inspiriert vom **Locality of Behaviour**-Prinzip bei HTMX (wo Logik direkt am HTML-Element liegt), habe ich im Backend eine **Vertical Slice Architecture** angewandt: Alles, was für einen Request nötig ist, liegt beieinander, statt über drei Service-Layer verstreut zu sein.

3.  **Config vereinfacht:** Ein Tipp des LLM zeigte mir, dass Pydantic bereits Module für DB-DSNs hat (`PostgresDsn` etc.). Dadurch konnte ich meine ganzen DB-Factory-Klassen und komplexen Setups durch eine einzige `AppSettings`-Klasse ersetzen.

### Login, Auth, Testing und der Weg in den Container

Beim Implementieren der Login-, Register- und Auth-Features habe ich neben der Einführung einer Login-Page mit zugehörigem Partial und eines Decorators, um die API-Routes hinter dem Login zu protecten, zuerst naiverweise Client-Side Hashing implementiert. Hier hat mich zum Glück das Sprachmodell auf die Sicherheits-Implikationen hingewiesen, also wechselte ich zu Server-Side Hashing mit Bcrypt und Salting. Zusätzlich teilte ich das Pydantic-User-Modell in `UserCreate` (mit Passwort) und `UserPublic` (ohne), damit sensible Daten nicht versehentlich im Code herumgereicht werden.

Um das Ganze stabil zu machen, fügte ich eine Test-Suite hinzu: Unit-Tests für Auth/Hashing, Integrationstests für Task-Erstellung und ein Smoke-Test-Skript, das den App-Start und das Kompilieren (`python -m compileall`) prüft. Das alles läuft jetzt auch via Pre-Commit-Hooks (Ruff, Mypy) und einer GitHub Action.

Final wurde die App containerisiert (Python-Slim Image + Gunicorn) inklusive `.dockerignore`, um die Files und Funktionalität, die für die Container-Runtime unnötig sind, auszuschließen und somit das resultierende Image minimal zu optimieren. Der Abschluss war das Deployment via Docker Compose in meinem Homelab. Die eigene App auf dem Handy im lokalen Netzwerk zu sehen, war schon ein sehr nices Erlebnis und eine tolle Belohnung dafür, dass ich das Projekt in dem festgelegten Scope endlich fertiggestellt habe.

### Blick in die Zukunft: Was noch fehlt (und was vielleicht kommt)

Auch wenn der MVP steht, fallen einem als Entwickler natürlich sofort Sachen ein, die man noch bauen könnte:

* **Feature-Erweiterungen:** Mehrere Todo-Listen pro User, Tags zum Filtern, Sortiermöglichkeiten und ein Dark-Mode Toggle. Auch Datei-Uploads (als Anhänge an Tasks) wären spannend.

* **User-Settings:** Ein Bereich, um das Passwort zu ändern oder Account-Details zu verwalten.

* **Technologie-Wechsel:** Ein Rewrite in Go + HTMX. Bei meinem Container-Deployment ist mir aufgefallen, dass der Memory Footprint durch Flask, SQLAlchemy und das Base-Image bei ca. 200MB liegt. Go (was ich schon lange lernen will) könnte das massiv drücken und wäre zudem skalierbarer.

### Meine Key-Learnings

Obwohl TaskOrbit "nur" eine Todo-Liste ist, war die Lernerfahrung relativ groß:

* **Keep it simple & YAGNI:**
    * Vertical Slice Architecture kann in kleinen Apps besser passen als die strikte Schichten-Architektur. Das Löschen des CRUD-Layers tat weh, war aber richtig.

* **Pydantic ist mehr als Validierung:**
    * Es ist extrem mächtig für Config-Management und spart manuellen Serialisierungs-Code, wenn man die integrierten Funktionen richtig nutzt.

* **"Design it Twice" (Refactoring):**
    * Der erste Entwurf ist zum Lernen der Domain, der zweite für die saubere Struktur.
    * Code wegzuschmeißen fühlt sich im ersten Moment falsch an, kann aber zu besserem, wartbarerem Code führen.

* **Agentic Workflow:**
    * Um wirklich autonome Ergebnisse zu erzielen, reicht einfaches Autocomplete nicht. Der **Agent Mode** mit einer klaren `instructions.md` ermöglicht echtes "Pair Programming", bei dem die AI auch plant und nicht nur tippt.

* **Security First:**
    * Auth gehört immer auf das Backend (Server-Side Hashing).