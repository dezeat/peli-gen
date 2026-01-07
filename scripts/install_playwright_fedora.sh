#!/usr/bin/env bash
set -euo pipefail

# install_playwright_fedora.sh
# Installs common system packages required by Playwright on Fedora/RHEL
# Run with sudo: sudo ./scripts/install_playwright_fedora.sh

DRY_RUN=0
if [ "${1-}" = "--dry-run" ] || [ "${1-}" = "-n" ]; then
  DRY_RUN=1
fi

if [ "$(id -u)" -ne 0 ] && [ "$DRY_RUN" -eq 0 ]; then
  echo "This script must be run with sudo. Example: sudo $0"
  exit 1
fi

echo "Playwright system dependencies installer for Fedora/RHEL"
if [ "$DRY_RUN" -eq 1 ]; then
  echo "DRY RUN: no packages will be installed. Use without --dry-run to apply changes."
fi

REQUIRED_PACKAGES=(
  gtk3
  libXScrnSaver
  libXcomposite
  libXrandr
  libXdamage
  libXcursor
  libXtst
  libXfixes
  alsa-lib
  at-spi2-atk
  at-spi2-core
)

OPTIONAL_PACKAGES=(
  ipa-gothic-fonts
  liberation-sans-fonts
)

# Build final package list: include optional packages only if available in repos
PKGS_TO_INSTALL=()
for p in "${REQUIRED_PACKAGES[@]}"; do
  PKGS_TO_INSTALL+=("$p")
done

if command -v dnf >/dev/null 2>&1; then
  echo "Checking availability of optional packages..."
  for op in "${OPTIONAL_PACKAGES[@]}"; do
    if dnf repoquery --quiet --available --qf '%{name}' "$op" >/dev/null 2>&1; then
      PKGS_TO_INSTALL+=("$op")
    else
      echo "Optional package not found in repos, skipping: $op"
    fi
  done
else
  echo "dnf not found. Please run this script on a Fedora/RHEL system or install packages manually."
  exit 2
fi

echo "Final package list: ${PKGS_TO_INSTALL[*]}"

if [ "$DRY_RUN" -eq 1 ]; then
  echo "DRY RUN: command that would be executed:"
  echo "dnf install -y ${PKGS_TO_INSTALL[*]}"
  exit 0
fi

echo "Running: dnf install -y ${PKGS_TO_INSTALL[*]}"
dnf install -y ${PKGS_TO_INSTALL[*]}
echo "dnf install completed."

echo "System dependencies installed. You can now run: npm run install:browsers to download browser binaries."
