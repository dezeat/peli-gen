from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[2]
TEMPLATES_ROOT = ROOT / "themes" / "mytheme" / "templates"


def main() -> int:
    inline_style_pattern = re.compile(r"\sstyle\s*=", re.IGNORECASE)
    failures: list[str] = []

    for template in sorted(TEMPLATES_ROOT.glob("*.html")):
        text = template.read_text(encoding="utf-8")
        if inline_style_pattern.search(text):
            failures.append(f"{template.relative_to(ROOT)} contains inline style attributes")

    if failures:
        print("Template quality gate failed:\n")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Template quality gate passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())