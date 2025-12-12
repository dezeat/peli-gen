
# Makefile for peli-gen (uses Poetry)

PYDIR := $(CURDIR)
INPUT := $(PYDIR)/content
OUTPUT := $(PYDIR)/output
PELICAN_CONF := $(PYDIR)/pelicanconf.py

.PHONY: help build-site serve stop-server clean tailwind

help:
	@echo "Usage: make <target>"
	@echo "  help         Show this help"
	@echo "  build  Build static site (production)"
	@echo "  serve        Run dev server with autoreload"
	@echo "  stop  Stop dev server (if running in background)"
	@echo "  clean        Remove generated output/"

build:
	poetry run pelican $(INPUT) -o $(OUTPUT) -s $(PELICAN_CONF)

serve:
	poetry run pelican --autoreload --listen $(INPUT) -o $(OUTPUT) -s $(PELICAN_CONF) > /dev/null 2>&1 & echo $$! > .pelican_devserver_pid; sleep 1; xdg-open http://127.0.0.1:8000 || true; echo "Dev server PID:`cat .pelican_devserver_pid`"

stop:
	@PIDS=`ps ux | grep '[p]elican --autoreload --listen' | awk '{print $$2}'`; \
	if [ -n "$$PIDS" ]; then \
		echo "Killing pelican dev server processes: $$PIDS"; \
		kill $$PIDS; \
	else \
		echo "No pelican dev server processes running"; \
	fi; \
	rm -f .pelican_devserver_pid 2>/dev/null || true

clean:
	[ ! -d "$(OUTPUT)" ] || rm -rf "$(OUTPUT)"
