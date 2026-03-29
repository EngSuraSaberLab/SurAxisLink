from django.conf import settings


def frontend_assets_mode(request):
    return {
        "USE_BUNDLED_FRONTEND_ASSETS": getattr(settings, "USE_BUNDLED_FRONTEND_ASSETS", False),
        "STATIC_SHOWCASE_MODE": getattr(settings, "STATIC_SHOWCASE_MODE", False),
        "STATIC_SHOWCASE_BASE_PATH": getattr(settings, "STATIC_SHOWCASE_BASE_PATH", "/"),
        "STATIC_SHOWCASE_MOSTAQL_URL": getattr(settings, "STATIC_SHOWCASE_MOSTAQL_URL", ""),
    }

