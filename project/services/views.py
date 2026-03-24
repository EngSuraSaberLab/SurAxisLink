from django.shortcuts import get_object_or_404, render

from .models import Service


def service_detail_placeholder(request, slug):
    service = get_object_or_404(Service, slug=slug, is_active=True)
    return render(request, 'services/service_detail_placeholder.html', {'service': service})
