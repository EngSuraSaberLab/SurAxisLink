from __future__ import annotations

import base64
import re
from pathlib import Path

from rcssmin import cssmin
from rjsmin import jsmin


ROOT_DIR = Path(__file__).resolve().parents[1]
STATIC_DIR = ROOT_DIR / "project" / "static"
DIST_DIR = STATIC_DIR / "dist"

SOURCEMAP_PATTERN = re.compile(r"/[#@]\s*sourceMappingURL=.*?(?:\*/)?$", re.MULTILINE)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def strip_sourcemap_comments(content: str) -> str:
    return re.sub(SOURCEMAP_PATTERN, "", content).strip()


def build_css() -> tuple[Path, Path]:
    main_css = strip_sourcemap_comments(read_text(STATIC_DIR / "css" / "main.css"))
    arabic_css = strip_sourcemap_comments(read_text(STATIC_DIR / "css" / "arabic.css"))

    min_css = cssmin(main_css)
    min_rtl_css = cssmin(main_css + "\n" + arabic_css)

    min_css_path = DIST_DIR / "app.min.css"
    min_rtl_css_path = DIST_DIR / "app.rtl.min.css"

    write_text(min_css_path, min_css)
    write_text(min_rtl_css_path, min_rtl_css)

    return min_css_path, min_rtl_css_path


def build_js() -> Path:
    main_js = strip_sourcemap_comments(read_text(STATIC_DIR / "js" / "main.js"))
    min_js = jsmin(main_js)

    encoded = base64.b64encode(min_js.encode("utf-8")).decode("ascii")
    obfuscated_js = (
        "(function(){const _0x='%s';(0,eval)(atob(_0x));})();" % encoded
    )

    min_js_path = DIST_DIR / "app.min.js"
    write_text(min_js_path, obfuscated_js)

    return min_js_path


def main() -> None:
    DIST_DIR.mkdir(parents=True, exist_ok=True)
    min_css_path, min_rtl_css_path = build_css()
    min_js_path = build_js()

    print(f"Built: {min_css_path}")
    print(f"Built: {min_rtl_css_path}")
    print(f"Built: {min_js_path}")


if __name__ == "__main__":
    main()
