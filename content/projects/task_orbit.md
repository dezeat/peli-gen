Title: TaskOrbit: Warum noch eine Todo Web-App?
Type: project
Thumbnail: images/blog/task_orbit_tbn.png
Main: images/blog/task_orbit_main.png
Category: Projects
Date: 2025-12-12 19:00
Tags: Python, Flask, HTMX, Pydantic, SQLAlchemy, Docker, Refactoring, AI-Coding
Summary: Eine Todo-App als Lernprojekt: Deep-Dive in Flask, HTMX, Pydantic und moderne Dev-Standards und Tooling.

### TL;DR
Ein Data Engineer baut eine klassische Todo-App, um moderne Python-Patterns (Poetry, Pydantic, DevContainers) und Web-Dev (Flask, HTMX) zu lernen. Was als etwas over-engineertes Greenfield-WebDev-Abenteuer begann, wurde durch Refactoring ("Design it Twice") und Agentic-Workflow-Support zu einer schlanken Anwendung vereinfacht. Key-Learnings: Locality of Behaviour schlägt oft Clean Architecture, Pydantic ist mächtiger als gedacht, und Auth gehört immer ins Backend.

### Vom Data Engineering zum Fullstack-Experiment

Eigentlich komme ich aus der Datenecke: Ich bin self-taught Data Engineer mit rund 3,5 Jahren Erfahrung. Seit August 2024 arbeite ich in einem Job an einer Azure Databricks Plattform, wo ich das erste Mal an einer komplexen, großen Codebase arbeiten und lernen kann, die moderne SWE-Standards konsequent umsetzt: Tests, Clean Code, Modularisierung und viel OOP (wo notwendig). Dazu kamen Tools, die ich vorher kaum oder gar nicht nutzte: Poetry zum Package Management, Pytest, Pydantic für validierte Data-Classes und VS Code DevContainer zur Kapselung der Entwicklungsumgebung.

Meine Idee war: Ich wollte dieses "Enterprise"-Wissen festigen, indem ich es zuhause, spielerisch und ohne Druck nachbaue. Aber weil ich bei privaten Spaß-Projekten zu glänzenden, träumerischen Augen neige und dadurch den Scope zu sprengen, reichte mir das Backend nicht. Ich wollte zusätzlich "Basic Web-Dev" lernen.

So entstand der Plan für "TaskOrbit": Eine Python Web-App mit Flask und HTMX. Flask, weil es weniger "heavy-weight" und "opinionated" als Django ist. HTMX, weil es versprach, dass man sich kaum mit Frontend-JavaScript herumschlagen muss. Das Rendering sollte über Jinja2 laufen – eine Templating-Engine, die ich schon kannte. Um das Ganze abzurunden, wollte ich einen DB-agnostischen Adapter bauen, der dank SQLAlchemy theoretisch alles von SQLite (lokal) bis Postgres/MariaDB (Deployment) bespielen kann.

### Der erste Entwurf

Im Oktober '24 gings los: Als Vorlage diente unser Repo aus dem Job. Das initiale Setup mit VS Code DevContainer und Poetry stand schnell. Ein frühes technisches Highlight (oder Ärgernis) war mein lokales Setup: Da ich privat Fedora Linux nutze (SELinux-basiert), musste ich im Dockerfile beim Mount-Skript das `Z`-Flag setzen. Zudem wollte ich unser Podman-Setup nachbauen, was aufgrund der Rootless- vs. Root-Unterschiede zu Docker einiges an Debugging erforderte.

Beim Code selbst habe ich versucht, alles "richtig" zu machen.
Ich schrieb ein Modul für SQLAlchemy-Klassen (die DB-Tabellen) und ein separates Modul für Pydantic-Klassen (Datentransport im Code). Dazu kam eine komplexe Abstraktion der Datenbanken: Eine Abstract Base Class (ABC) definierte das Interface, von der ich SQLite- und Postgres-Klassen ableitete, komplett mit Factory- und Setup-Methoden sowie einer ausgefeilten Config-Klasse, inspiriert von meiner Arbeit, um diese DB-Verbindungen zu initialisieren.

Auch die Logik kapselte ich stark. Ich erstellte ein CRUD(+)-Modul, um SQLAlchemy-Code zu verallgemeinern, damit der Route-Code "DRY" bleibt. Die Routes selbst waren klassisch Flask: Decorators für die Endpoints und HTMX-Logik, die Partials neu rendert (z. B. Task-Liste Update nach Delete).

Dazu kam eine `main.py` als Entrypoint, die die App-Factory `create_app()` aufruft, und ein Makefile für häufige Befehle im Dev-Workflow wie `make launch`.

Nach einigem an Arbeit hatte ich einen 80% fertigen MVP. Man konnte Tasks erstellen und suchen. Die Frontend-Elemente für Edit und Delete hatte ich schon implementiert, allerdings noch nicht die Backend-Logik. Wie so oft bei Hobby-Projekten verließ mich, nachdem der Proof-of-Concept lief, allerdings die Motivation, jetzt nach der Pareto-Regel nochmal 80% der Zeit zu investieren, um die restlichen 20% zu finalisieren. So landete das Projekt erstmal auf dem GitHub Project & Tech Debt-Friedhof.

### Refactoring

Fast forward zum Dezember 2025. Mit frischer Motivation und dem Ziel, moderne LLM-Agent-Workflows zu testen, schaute ich mir das Projekt nochmal an. Ich nutzte die GitHub Copilot Integration in VS Code, um die fehlenden Features (Edit, Delete, UI-Features, Login, CI/CD, Tests, Pre-Commit-Hooks, GitHub-Actions, Containerisierung) zu bauen.

Dabei merkte ich schnell: Copilot ist "super-charged" durch den Repo-Kontext und Markdown-Anweisungen, braucht aber klare Specs und gute Prompts. Hier gab es allerdings auch einen kleinen Reality-Check:

Die auf Reddit oft beschriebenen Workflow-Ergebnisse habe ich nicht ganz erreicht. Das liegt wohl aber auch an meinem Setup: Ich war "Out-of-the-Box" unterwegs und habe noch keinen Deep-Dive in spezialisierte Setups (wie Claude Code, SpecKit oder Harness-Setup mit Skills und MCPs) gemacht, die für solche Ergebnisse wohl notwendig sind.

Trotzdem war der Mehrwert enorm. Viel wichtiger als der Code selbst war nämlich, dass die LLM-Interaktion deutlich schneller als zuvor die Schwächen meiner Architektur aufdeckte.

Inspiriert von "A Philosophy of Software Design" entschied ich mich für ein massives Refactoring unter dem Motto "Design it Twice". Meine ursprüngliche Interaktion zwischen SQLAlchemy und Pydantic war wonky. Ich hatte eine umständliche Serializer-Funktion geschrieben, die aus einer Code-Ästhetik-Perspektive unschön war und Mypy-Fehler produzierte.
Die Lösung war dann irgendwie einfacher als gedacht:

1.  **Serializer gelöscht:** Ich nutze nun `pydantic model_dump` oder übergebe SQLAlchemy-Objekte direkt an `render_template`.

2.  **CRUD-Layer entfernt:** Ich habe die Datenbank-Logik, welche die Serializer-Funktion enthielt, komplett entfernt und die notwendige SQLAlchemy-Interaktion direkt in die Routes verschoben. Das widerspricht zwar strikter Modularisierung, folgt aber der "Locality of Behaviour"-Idee. Der Code wurde dadurch kürzer, lesbarer und wartungsärmer.

3.  **Config vereinfacht:** Ein Tipp des LLM zeigte mir, dass Pydantic bereits Module für DB-DSNs hat (`PostgresDsn` etc.) und vorhandene SQLAlchemy-Setup-Logiken unnötig waren und per default von SQLAlchemy gehandhabt werden. Dadurch konnte ich meine ganzen DB-Klassen sowie die Config-Klasse durch eine einzige `AppSettings`-Klasse ersetzen, die per Dispatcher-Pattern die richtige URI an `sqlalchemy.create_engine()` liefert.

Das Ergebnis: Weniger Code, weniger Komplexität, einfachere Erweiterbarkeit.

### Login, Auth, Testing und der Weg in den Container

Beim Implementieren der Login-, Register- und Auth-Features habe ich neben der Einführung einer Login-Page mit zugehörigem Partial und eines Decorators, um die API-Routes hinter dem Login zu protecten, zuerst naiverweise Client-Side Hashing implementiert. Hier hat mich zum Glück das Sprachmodell auf die Sicherheits-Implikationen hingewiesen, also wechselte ich zu Server-Side Hashing mit Bcrypt und Salting. Zusätzlich teilte ich das Pydantic-User-Modell in `UserCreate` (mit Passwort) und `UserPublic` (ohne), damit sensible Daten nicht versehentlich im Code herumgereicht werden.

Um das Ganze stabil zu machen, fügte ich eine Test-Suite hinzu: Unit-Tests für Auth/Hashing, Integrationstests für Task-Erstellung und ein Smoke-Test-Skript, das den App-Start und das Kompilieren (`python -m compileall`) prüft. Das alles läuft jetzt auch via Pre-Commit-Hooks (Ruff, Mypy) und einer GitHub Action.

Final wurde die App containerisiert (Python-Slim Image + Gunicorn) inklusive `.dockerignore`, um die Files und Funktionalität, die für die Container-Runtime unnötig sind, auszuschließen und somit das resultierende Image minimal zu optimieren. Der Abschluss war das Deployment via Docker Compose in meinem Homelab – die eigene App auf dem Handy im lokalen Netzwerk zu sehen, war schon ein sehr nices Erlebnis und eine tolle Belohnung dafür, dass ich das Projekt in dem festgelegten Scope endlich fertiggestellt habe.

### Blick in die Zukunft: Was noch fehlt (und was vielleicht kommt)

Auch wenn der MVP steht, fallen einem als Entwickler natürlich sofort Sachen ein, die man noch bauen könnte:

* **Feature-Erweiterungen:** Mehrere Todo-Listen pro User, Tags zum Filtern, Sortiermöglichkeiten und ein Dark-Mode Toggle. Auch Datei-Uploads (als Anhänge an Tasks) wären spannend.

* **User-Settings:** Ein Bereich, um das Passwort zu ändern oder Account-Details zu verwalten.

* **Technologie-Wechsel:** Ein Rewrite in Go + HTMX. Bei meinem Container-Deployment ist mir aufgefallen, dass der Memory Footprint durch Flask, SQLAlchemy und das Base-Image bei ca. 200MB liegt. Go (was ich schon lange lernen will) könnte das massiv drücken und wäre zudem skalierbarer.

### Meine Key-Learnings

Obwohl TaskOrbit "nur" eine Todo-Liste ist, war die Lernerfahrung relativ groß:

* **Keep it simple & YAGNI:**
    * **Locality of Behaviour** schlägt in kleinen Apps oft die strikte Schichten-Architektur. Das Löschen des CRUD-Layers tat weh nach der initialen Arbeit, war aber richtig.
    * Nicht alles braucht Enterprise-Modularität; MVP-Anforderungen sollte man strikt definieren, sonst verrennt man sich.

* **Pydantic ist mehr als Validierung:**
    * Es ist extrem mächtig für Config-Management (Settings/DSN) und DB-Integration.
    * Es spart manuellen Serialisierungs-Code, wenn man es richtig einsetzt.

* **"Design it Twice" (Refactoring):**
    * Der erste Entwurf ist zum Lernen der Domain, der zweite für die saubere Struktur.
    * Code wegzuschmeißen (Serializer, CRUD-Module) fühlt sich im ersten Moment falsch an, führt aber fast immer zu besserem, wartbarerem Code.

* **Agentic Workflow:**
    * LLMs (wie Copilot) sind **"Super-Charged"** durch den direkten Zugriff auf den Repo-Kontext – besonders stark bei Tests und Boilerplate.
    * Es erfordert aber zwingend eine **"Pair-Programming"-Mentalität**: Man muss strikte Specs vorgeben und Code Reviews durchführen. Kein blindes Copy-Paste!
    * Um wirklich autonome "Reddit-Level"-Ergebnisse zu erzielen, reicht Out-of-the-Box-Nutzung oft nicht; hier müsste man tiefer in spezialisiertes Tooling (SpecKit, Harness etc.) eintauchen.

* **Security First:**
    * Auth gehört immer auf das Backend (Server-Side Hashing).
