# Minimal Makefile for peli-gen (uses Poetry)

PYDIR := $(CURDIR)
INPUT := $(PYDIR)/content
OUTPUT := $(PYDIR)/output
PELICAN_CONF := $(PYDIR)/pelicanconf.py

.PHONY: help html dev clean tailwind preview stop-preview

help:
	@echo "Usage: make <target>"
	@echo "  help         Show this help"
	@echo "  html         Build static site (production)"
	@echo "  dev          Run devserver (autoreload)"
	@echo "  clean        Remove generated output/"
	@echo "  tailwind     Build tailwind.css (requires node & tailwind)"
	@echo "  preview      Start devserver in background and open browser"
	@echo "  stop-preview Stop background preview started by preview"

html:
	poetry run pelican $(INPUT) -o $(OUTPUT) -s $(PELICAN_CONF)

dev:
	poetry run pelican --autoreload --listen $(INPUT) -o $(OUTPUT) -s $(PELICAN_CONF)

clean:
	[ ! -d "$(OUTPUT)" ] || rm -rf "$(OUTPUT)"

tailwind:
	@npx tailwindcss -i ./input.css -o ./themes/mytheme/static/tailwind.css --minify || echo "tailwind build failed (ensure node & tailwind installed)"

preview:
	@poetry run pelican -lr $(INPUT) -o $(OUTPUT) -s $(PELICAN_CONF) > /dev/null 2>&1 & echo $$! > .pelican_preview_pid; sleep 1; xdg-open http://127.0.0.1:8000 || true; echo "Preview PID:`cat .pelican_preview_pid`"

stop-preview:
	@if [ -f .pelican_preview_pid ]; then kill `cat .pelican_preview_pid` && rm -f .pelican_preview_pid && echo "Preview stopped"; else echo "No preview running"; fi
