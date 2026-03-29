from django.conf import settings


def frontend_assets_mode(request):
    return {
        "USE_BUNDLED_FRONTEND_ASSETS": getattr(settings, "USE_BUNDLED_FRONTEND_ASSETS", False),
    }

