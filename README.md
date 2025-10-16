# Pelican Static Site Generator - Quick Reference

Dieses Repository nutzt [Pelican](https://getpelican.com/) als Static Site Generator und wird auf GitHub Pages gehostet.

## 🚀 Wichtigste CLI-Befehle

### Lokale Entwicklung

```bash
# Entwicklungsserver starten (mit automatischem Reload)
pelican --autoreload --listen

# Alternative: Server mit spezifischem Port
pelican --listen --port 8080 --autoreload

# Nur Content generieren (ohne Server)
pelican content
```

### Content erstellen

```bash
# Neuen Artikel erstellen
pelican-quickstart

# Manuell: Neue Markdown-Datei in content/ erstellen
# Format: content/mein-artikel.md
```

### Build & Deployment

```bash
# Production Build erstellen
pelican content -s publishconf.py

# Output-Verzeichnis leeren und neu generieren
pelican content -d -s publishconf.py

# GitHub Pages Deploy (wenn ghp-import installiert)
ghp-import output -b gh-pages
git push origin gh-pages
```

### Nützliche Entwicklungsbefehle

```bash
# Pelican-Themes anzeigen
pelican-themes -l

# Theme installieren
pelican-themes -i /pfad/zum/theme

# Plugin-Liste anzeigen (falls pelican-plugins installiert)
pelican-plugins
```

## 📁 Verzeichnisstruktur

```
.
├── content/          # Markdown-Dateien für Artikel/Seiten
│   ├── articles/     # Blog-Artikel
│   └── pages/        # Statische Seiten
├── output/           # Generierte statische Seite (nicht committen!)
├── themes/           # Custom Themes
├── plugins/          # Custom Plugins
├── pelicanconf.py    # Entwicklungs-Konfiguration
├── publishconf.py    # Production-Konfiguration
└── Makefile          # Build-Shortcuts
```

## ✍️ Artikel schreiben

### Artikel-Template (Markdown)

```markdown
Title: Mein Artikel-Titel
Date: 2025-10-15 10:00
Category: Tech
Tags: python, pelican
Slug: mein-artikel
Authors: Dein Name
Summary: Kurze Zusammenfassung des Artikels

Hier kommt der Inhalt des Artikels...

## Unterüberschrift

Mehr Text mit **Formatierung** und [Links](https://example.com).
```

### Wichtige Metadata-Felder

- `Title`: Titel des Artikels (Pflicht)
- `Date`: Veröffentlichungsdatum (Pflicht)
- `Category`: Kategorie für Organisation
- `Tags`: Kommaseparierte Tags
- `Slug`: URL-freundlicher Name
- `Status`: `draft` für Entwürfe (werden nicht veröffentlicht)
- `Summary`: Kurzbeschreibung für Übersichten

## 🎨 Konfiguration

### pelicanconf.py (Entwicklung)

Lokale Entwicklungseinstellungen mit relativem URLs.

### publishconf.py (Production)

Überschreibt `pelicanconf.py` für Production-Builds mit absoluten URLs für GitHub Pages.

Wichtige Settings:

```python
SITEURL = 'https://username.github.io/repo-name'
RELATIVE_URLS = False
DELETE_OUTPUT_DIRECTORY = True
```

## 🔧 VSCode Extensions (Empfehlungen)

### Must-Have

- **Python** (ms-python.python) - Python-Support
- **Markdown All in One** (yzhang.markdown-all-in-one) - Markdown-Funktionen
- **Markdown Preview Enhanced** (shd101wyy.markdown-preview-enhanced) - Erweiterte Vorschau
- **markdownlint** (DavidAnson.vscode-markdownlint) - Markdown-Linting

### Hilfreich

- **Code Spell Checker** (streetsidesoftware.code-spell-checker) - Rechtschreibprüfung
- **German - Code Spell Checker** (streetsidesoftware.code-spell-checker-german) - Deutsche Rechtschreibung
- **YAML** (redhat.vscode-yaml) - YAML-Support für Config
- **Git Graph** (mhutchie.git-graph) - Git-Visualisierung
- **Better Comments** (aaron-bond.better-comments) - Kommentar-Highlighting

### Optional

- **Paste Image** (mushan.vscode-paste-image) - Bilder direkt einfügen
- **Front Matter CMS** (eliostruyf.vscode-front-matter) - CMS für Static Sites
- **Path Intellisense** (christian-kohler.path-intellisense) - Pfad-Autovervollständigung

## 📝 Workflow

### Neuen Artikel schreiben

1. Markdown-Datei in `content/` erstellen
2. Metadata hinzufügen
3. `pelican --autoreload --listen` starten
4. Im Browser `http://localhost:8000` öffnen
5. Artikel schreiben und Live-Preview nutzen

### Auf GitHub Pages deployen

```bash
# 1. Production Build
pelican content -s publishconf.py

# 2. Zu gh-pages Branch pushen
ghp-import output -b gh-pages
git push origin gh-pages

# Oder mit Makefile (falls vorhanden):
make github
```

### GitHub Actions (automatisches Deployment)

Erstelle `.github/workflows/pelican.yml`:

```yaml
name: Deploy Pelican to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install pelican markdown
          # Weitere Abhängigkeiten hier
      
      - name: Build site
        run: pelican content -s publishconf.py
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./output
```

## 🐛 Häufige Probleme

### Port bereits belegt

```bash
# Anderen Port verwenden
pelican --listen --port 8080 --autoreload
```

### Änderungen werden nicht angezeigt

```bash
# Output-Verzeichnis löschen und neu generieren
pelican content -d
```

### Theme/Plugin-Fehler

```bash
# Dependencies neu installieren
pip install --upgrade pelican
pip install -r requirements.txt
```

## 📚 Weitere Ressourcen

- [Pelican Dokumentation](https://docs.getpelican.com/)
- [Pelican Themes](https://github.com/getpelican/pelican-themes)
- [Pelican Plugins](https://github.com/pelican-plugins)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

## 💡 Tipps

- Nutze `Status: draft` für Entwürfe
- Bilder in `content/images/` ablegen
- Custom CSS in Theme-Ordner oder als Plugin
- `make help` zeigt alle Makefile-Befehle (falls vorhanden)
- Regelmäßig Dependencies updaten: `pip list --outdated`