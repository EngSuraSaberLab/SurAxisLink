from __future__ import annotations

import os
import shutil
import sys
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[1]
PROJECT_DIR = ROOT_DIR / "project"
DOCS_DIR = ROOT_DIR / "docs"
STATIC_SOURCE_DIR = PROJECT_DIR / "static"
MEDIA_SOURCE_DIR = PROJECT_DIR / "media"

if str(PROJECT_DIR) not in sys.path:
    sys.path.insert(0, str(PROJECT_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")

import django  # noqa: E402

django.setup()

from django.test import RequestFactory, override_settings  # noqa: E402
from django.utils import translation  # noqa: E402

from core import views as core_views  # noqa: E402


SITE_BASE_PATH = f"/{ROOT_DIR.name}/"
FACTORY = RequestFactory()

PAGES = (
    ("", "index.html", core_views.home),
    ("privacy/", "privacy/index.html", core_views.privacy_policy),
    ("terms/", "terms/index.html", core_views.terms_of_service),
    ("cookies/", "cookies/index.html", core_views.cookies_policy),
)


def build_request(path: str, language: str):
    normalized_path = f"/{path}"
    request = FACTORY.get(normalized_path)
    request.LANGUAGE_CODE = language
    request.COOKIES["django_language"] = language
    request.META["HTTP_HOST"] = "suraxislink.local"
    return request


def rewrite_html(html: str, language: str) -> str:
    language_base = SITE_BASE_PATH if language == "en" else f"{SITE_BASE_PATH}ar/"

    replacements = {
        'href="/static/': f'href="{SITE_BASE_PATH}assets/',
        'src="/static/': f'src="{SITE_BASE_PATH}assets/',
        'href="/media/': f'href="{SITE_BASE_PATH}media/',
        'src="/media/': f'src="{SITE_BASE_PATH}media/',
        'href="/privacy/"': f'href="{language_base}privacy/"',
        'href="/terms/"': f'href="{language_base}terms/"',
        'href="/cookies/"': f'href="{language_base}cookies/"',
        'href="/#': f'href="{language_base}#',
        'href="/"': f'href="{language_base}"',
        'action="#/"': 'action="#"',
    }

    for source, target in replacements.items():
        html = html.replace(source, target)

    return html


def render_page(language: str, path: str, view_func) -> str:
    request_path = path if language == "en" else f"ar/{path}"
    request = build_request(request_path, language)
    with translation.override(language):
        response = view_func(request)
        return rewrite_html(response.content.decode("utf-8"), language)


def write_output(relative_path: str, content: str) -> None:
    output_path = DOCS_DIR / relative_path
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8")


def export_pages() -> None:
    for language in ("en", "ar"):
        output_prefix = Path("ar") if language == "ar" else Path()
        for route, relative_output, view_func in PAGES:
            content = render_page(language, route, view_func)
            write_output(str(output_prefix / relative_output), content)

    not_found_request = build_request("404/", "en")
    with translation.override("en"):
        response = core_views.custom_404(not_found_request)
        write_output("404.html", rewrite_html(response.content.decode("utf-8"), "en"))


def copy_assets() -> None:
    shutil.copytree(STATIC_SOURCE_DIR, DOCS_DIR / "assets", dirs_exist_ok=True)
    if MEDIA_SOURCE_DIR.exists():
        shutil.copytree(MEDIA_SOURCE_DIR, DOCS_DIR / "media", dirs_exist_ok=True)


def main() -> None:
    if DOCS_DIR.exists():
        shutil.rmtree(DOCS_DIR)

    DOCS_DIR.mkdir(parents=True, exist_ok=True)

    with override_settings(
        DEBUG=False,
        USE_BUNDLED_FRONTEND_ASSETS=False,
        STATIC_SHOWCASE_MODE=True,
        STATIC_SHOWCASE_BASE_PATH=SITE_BASE_PATH,
        STORAGES={
            "default": {
                "BACKEND": "django.core.files.storage.FileSystemStorage",
            },
            "staticfiles": {
                "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
            },
        },
    ):
        copy_assets()
        export_pages()

    (DOCS_DIR / ".nojekyll").write_text("", encoding="utf-8")
    print(f"Exported static site to: {DOCS_DIR}")
    print(f"GitHub Pages base path: {SITE_BASE_PATH}")


if __name__ == "__main__":
    main()
