
# Makefile for peli-gen (uses Poetry)

PYDIR := $(CURDIR)
INPUT := $(PYDIR)/content
OUTPUT := $(PYDIR)/output
PELICAN_CONF := $(PYDIR)/pelicanconf.py

.PHONY: help build serve stop clean tailwind launch visual-setup visual-test visual-update visual-report

help:
	@echo "Usage: make <target>"
	@echo "  help            Show this help"
	@echo "  build           Build static site (production)"
	@echo "  serve           Run dev server with autoreload"
	@echo "  stop            Stop dev server (if running in background)"
	@echo "  clean           Remove generated output/"
	@echo "  launch          Clean, build, and serve in one step"
	@echo ""
	@echo "Visual Regression Testing:"
	@echo "  visual-setup    Install Node.js dependencies and Playwright browsers"
	@echo "  visual-test     Run visual regression tests (requires built site)"
	@echo "  visual-update   Update visual snapshots (accept intentional changes)"
	@echo "  visual-report   Open HTML report of last test run"
launch:
	$(MAKE) clean
	$(MAKE) build
	$(MAKE) serve
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

# ========================================
# Visual Regression Testing
# ========================================

# Install Node.js dependencies and Playwright browsers
visual-setup:
	@echo "Installing Node.js dependencies..."
	npm install
	@echo "Installing Playwright browsers..."
	npm run install:browsers
	@echo "✓ Visual testing setup complete"

# Run visual regression tests
visual-test:
	@echo "Running visual regression tests..."
	@echo "Ensuring site is built or available in $(OUTPUT)..."
	@if [ -d "$(OUTPUT)" ]; then \
		echo "Found existing $(OUTPUT), using it for tests."; \
	else \
		echo "No existing $(OUTPUT). Attempting build..."; \
		$(MAKE) build || (echo "Build failed; aborting (no $(OUTPUT))."; exit 1); \
	fi
	@echo "Starting tests across 4 configurations (Desktop/Mobile × Light/Dark)..."
	npm test

# Update visual snapshots (use after intentional CSS changes)
visual-update:
	@echo "Updating visual regression snapshots..."
	@echo "Ensuring site is built or available in $(OUTPUT)..."
	@if [ -d "$(OUTPUT)" ]; then \
		echo "Found existing $(OUTPUT), using it for snapshot update."; \
	else \
		echo "No existing $(OUTPUT). Attempting build..."; \
		$(MAKE) build || (echo "Build failed; aborting (no $(OUTPUT))."; exit 1); \
	fi
	@echo "⚠️  This will accept all visual changes as new baseline..."
	npm run update
	@echo "✓ Snapshots updated. Review changes with 'git diff' before committing."

# Open HTML report from last test run
visual-report:
	@echo "Opening visual regression test report..."
	npm run report
