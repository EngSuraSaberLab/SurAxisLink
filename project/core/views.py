from django.conf import settings
from django.shortcuts import render

def home(request):
    return render(
        request,
        'core/home.html',
        {
            'recaptcha_site_key': settings.RECAPTCHA_SITE_KEY,
        },
    )


def custom_404(request, exception=None, unmatched_path=None):
    return render(
        request,
        '404.html',
        {
            'requested_path': request.path,
        },
        status=404,
    )
