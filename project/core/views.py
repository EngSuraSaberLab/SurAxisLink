from django.conf import settings
from django.shortcuts import render
from services.models import Service


def home(request):
    return render(
        request,
        'core/home.html',
        {
            'recaptcha_site_key': settings.RECAPTCHA_SITE_KEY,
            'services': Service.objects.filter(is_active=True).order_by('order'),
        },
    )


def privacy_policy(request):
    return render(request, 'core/privacy.html')


def terms_of_service(request):
    return render(request, 'core/terms.html')


def cookies_policy(request):
    return render(request, 'core/cookies.html')


def custom_404(request, exception=None, unmatched_path=None):
    return render(
        request,
        '404.html',
        {
            'requested_path': request.path,
        },
        status=404,
    )
