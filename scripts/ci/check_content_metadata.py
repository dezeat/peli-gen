from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[2]
CONTENT_ROOT = ROOT / "content"

REQUIRED_FIELDS = ("title", "date", "type", "category")


def parse_front_matter(path: Path) -> dict[str, str]:
    metadata: dict[str, str] = {}
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            stripped = line.strip()
            if not stripped:
                break
            if ":" not in line:
                continue
            key, value = line.split(":", 1)
            metadata[key.strip().lower()] = value.strip()
    return metadata


def check_directory(relative_dir: str, expected_type: str) -> list[str]:
    directory = CONTENT_ROOT / relative_dir
    failures: list[str] = []

    for file_path in sorted(directory.glob("*.md")):
        metadata = parse_front_matter(file_path)
        missing = [field for field in REQUIRED_FIELDS if not metadata.get(field)]

        if missing:
            failures.append(
                f"{file_path.relative_to(ROOT)}: missing metadata fields: {', '.join(missing)}"
            )

        content_type = metadata.get("type", "").lower()
        if content_type and content_type != expected_type:
            failures.append(
                f"{file_path.relative_to(ROOT)}: invalid Type '{metadata.get('type')}', expected '{expected_type}'"
            )

    return failures


def main() -> int:
    errors: list[str] = []
    errors.extend(check_directory("blog", "article"))
    errors.extend(check_directory("projects", "project"))

    if errors:
        print("Metadata quality gate failed:\n")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Metadata quality gate passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())