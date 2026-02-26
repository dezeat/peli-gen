from html.parser import HTMLParser
from pathlib import Path
import sys


class LinkCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[tuple[str, int]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag not in {"a", "img", "script", "link", "source"}:
            return

        attr_name = "href" if tag in {"a", "link"} else "src"
        value = dict(attrs).get(attr_name)
        if value:
            self.links.append((value.strip(), self.getpos()[0]))


def should_skip_link(link: str) -> bool:
    return (
        not link
        or link.startswith("#")
        or link.startswith("mailto:")
        or link.startswith("tel:")
        or link.startswith("javascript:")
        or "://" in link
    )


def resolve_target(html_file: Path, output_dir: Path, raw_link: str) -> Path:
    link = raw_link.split("#", 1)[0].split("?", 1)[0]

    if link.startswith("/"):
        candidate = output_dir / link.lstrip("/")
    else:
        candidate = (html_file.parent / link).resolve()

    if candidate.is_dir() or link.endswith("/"):
        candidate = candidate / "index.html"
    return candidate


def resolve_with_fallback(html_file: Path, output_dir: Path, raw_link: str) -> Path:
    primary = resolve_target(html_file, output_dir, raw_link)
    if primary.exists():
        return primary

    link = raw_link.split("#", 1)[0].split("?", 1)[0]
    if not link.startswith(("/", "./", "../")):
        fallback = output_dir / link
        if fallback.is_dir() or link.endswith("/"):
            fallback = fallback / "index.html"
        return fallback

    return primary


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: check_internal_links.py <output-dir>")
        return 2

    output_dir = Path(sys.argv[1]).resolve()
    if not output_dir.exists():
        print(f"Output directory not found: {output_dir}")
        return 2

    failures: list[str] = []
    html_files = sorted(output_dir.rglob("*.html"))

    for html_file in html_files:
        parser = LinkCollector()
        parser.feed(html_file.read_text(encoding="utf-8"))

        for link, line in parser.links:
            if should_skip_link(link):
                continue

            target = resolve_with_fallback(html_file, output_dir, link)
            if not target.exists():
                failures.append(
                    f"{html_file.relative_to(output_dir)}:{line} -> missing target '{link}'"
                )

    if failures:
        print("Internal link quality gate failed:\n")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Internal link quality gate passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())