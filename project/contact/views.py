import json
import re
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.conf import settings
from django.core.cache import cache
from django.core.validators import EmailValidator
from django.http import JsonResponse
from django.views.decorators.http import require_POST

from .models import ProjectInquiry


PHONE_REGEX = re.compile(r'^(?:\+9647\d{9}|07\d{9})$')
ALLOWED_SERVICES = {
    'Web Development',
    'Custom System Development',
    'Digital Process Automation',
    'AI Integration',
    'Odoo Customization & Development',
    'Payment Gateway Integration',
    'Maintenance & Security',
    'Other',
}
ALLOWED_PROJECT_TYPES = {'New Project', 'Existing Project', 'Consultation Only'}
ALLOWED_EXISTING_SYSTEM = {'', 'Yes', 'No'}
ALLOWED_BUDGET = {'', 'Under $500', '$500 - $1,000', '$1,000 - $3,000', '$3,000+', 'Not Sure Yet'}
ALLOWED_START = {'', 'As Soon As Possible', 'Within 1 Week', 'Within 1 Month', 'Later / Still Planning'}
ALLOWED_URGENT = {'', 'Yes', 'No'}
ALLOWED_CONTACT_METHOD = {'Email', 'WhatsApp', 'Phone Call'}

RATE_LIMIT_COUNT = 8
RATE_LIMIT_WINDOW_SECONDS = 600


def _client_ip(request):
    xff = request.META.get('HTTP_X_FORWARDED_FOR', '')
    if xff:
        return xff.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', 'unknown')


def _allowed_recaptcha_hosts(request):
    configured = set(getattr(settings, 'RECAPTCHA_ALLOWED_HOSTNAMES', []))
    request_host = request.get_host().split(':')[0]
    defaults = {'localhost', '127.0.0.1', 'testkey.google.com'}
    if request_host:
        defaults.add(request_host)
    return configured | defaults


@require_POST
def project_inquiry_submit(request):
    client_ip = _client_ip(request)
    rate_key = f'project_inquiry_rate:{client_ip}'
    current_attempts = cache.get(rate_key, 0)
    if current_attempts >= RATE_LIMIT_COUNT:
        return JsonResponse(
            {'ok': False, 'message': 'Too many requests. Please wait and try again.'},
            status=429,
        )
    cache.set(rate_key, current_attempts + 1, RATE_LIMIT_WINDOW_SECONDS)

    full_name = request.POST.get('full_name', '').strip()
    email = request.POST.get('email', '').strip()
    phone_whatsapp = request.POST.get('phone_whatsapp', '').strip()
    company_project_name = request.POST.get('company_project_name', '').strip()
    service_needed = request.POST.get('service_needed', '').strip()
    project_type = request.POST.get('project_type', '').strip()
    existing_system = request.POST.get('existing_system', '').strip()
    project_description = request.POST.get('project_description', '').strip()
    problem_to_solve = request.POST.get('problem_to_solve', '').strip()
    main_goal = request.POST.get('main_goal', '').strip()
    reference_links = request.POST.get('reference_links', '').strip()
    budget_range = request.POST.get('budget_range', '').strip()
    expected_start_date = request.POST.get('expected_start_date', '').strip()
    is_urgent = request.POST.get('is_urgent', '').strip()
    preferred_contact_method = request.POST.get('preferred_contact_method', '').strip()
    additional_notes = request.POST.get('additional_notes', '').strip()
    project_consent_raw = request.POST.get('project_consent', '').strip()

    if not (3 <= len(full_name) <= 100):
        return JsonResponse({'ok': False, 'message': 'Full name must be between 3 and 100 characters.'}, status=400)

    try:
        EmailValidator()(email)
    except Exception:
        return JsonResponse({'ok': False, 'message': 'Please provide a valid email address.'}, status=400)

    normalized_phone = re.sub(r'\s+', '', phone_whatsapp)
    if not PHONE_REGEX.fullmatch(normalized_phone):
        return JsonResponse(
            {'ok': False, 'message': 'Please enter a valid phone or WhatsApp number (e.g. +9647XXXXXXXX).'},
            status=400,
        )

    if len(company_project_name) > 150:
        return JsonResponse({'ok': False, 'message': 'Company / Project Name is too long.'}, status=400)

    if service_needed not in ALLOWED_SERVICES:
        return JsonResponse({'ok': False, 'message': 'Invalid service selection.'}, status=400)

    if project_type not in ALLOWED_PROJECT_TYPES:
        return JsonResponse({'ok': False, 'message': 'Invalid project type selection.'}, status=400)

    if existing_system not in ALLOWED_EXISTING_SYSTEM:
        return JsonResponse({'ok': False, 'message': 'Invalid existing system selection.'}, status=400)

    if len(project_description) < 20:
        return JsonResponse({'ok': False, 'message': 'Project description must be at least 20 characters.'}, status=400)
    if len(project_description) > 3000:
        return JsonResponse({'ok': False, 'message': 'Project description is too long.'}, status=400)

    if len(problem_to_solve) > 3000:
        return JsonResponse({'ok': False, 'message': 'Problem description is too long.'}, status=400)

    if len(main_goal) > 2000:
        return JsonResponse({'ok': False, 'message': 'Main goal text is too long.'}, status=400)

    if len(reference_links) > 1000:
        return JsonResponse({'ok': False, 'message': 'Reference links field is too long.'}, status=400)

    if budget_range not in ALLOWED_BUDGET:
        return JsonResponse({'ok': False, 'message': 'Invalid budget range selection.'}, status=400)

    if expected_start_date not in ALLOWED_START:
        return JsonResponse({'ok': False, 'message': 'Invalid expected start date selection.'}, status=400)

    if is_urgent not in ALLOWED_URGENT:
        return JsonResponse({'ok': False, 'message': 'Invalid urgency selection.'}, status=400)

    if preferred_contact_method not in ALLOWED_CONTACT_METHOD:
        return JsonResponse({'ok': False, 'message': 'Invalid preferred contact method.'}, status=400)

    if len(additional_notes) > 3000:
        return JsonResponse({'ok': False, 'message': 'Additional notes are too long.'}, status=400)

    if project_consent_raw != 'on':
        return JsonResponse(
            {'ok': False, 'message': 'You must accept the Privacy Policy and Terms of Service before submission.'},
            status=400,
        )

    recaptcha_response = request.POST.get('g-recaptcha-response', '').strip()
    if not recaptcha_response:
        return JsonResponse(
            {'ok': False, 'message': 'reCAPTCHA verification is required.'},
            status=400,
        )

    payload = urlencode(
        {
            'secret': settings.RECAPTCHA_SECRET_KEY,
            'response': recaptcha_response,
            'remoteip': client_ip,
        }
    ).encode('utf-8')

    try:
        req = Request(
            'https://www.google.com/recaptcha/api/siteverify',
            data=payload,
            headers={'Content-Type': 'application/x-www-form-urlencoded'},
            method='POST',
        )
        with urlopen(req, timeout=8) as resp:
            verification_result = json.loads(resp.read().decode('utf-8'))
    except Exception:
        return JsonResponse(
            {'ok': False, 'message': 'Could not verify reCAPTCHA. Please try again.'},
            status=502,
        )

    if not verification_result.get('success'):
        return JsonResponse(
            {'ok': False, 'message': 'reCAPTCHA check failed. Please retry.'},
            status=400,
        )

    hostname = verification_result.get('hostname', '')
    expected_hosts = _allowed_recaptcha_hosts(request)
    if hostname and hostname not in expected_hosts:
        return JsonResponse(
            {'ok': False, 'message': 'reCAPTCHA hostname validation failed.'},
            status=400,
        )

    ProjectInquiry.objects.create(
        full_name=full_name,
        email=email,
        phone_whatsapp=normalized_phone,
        company_project_name=company_project_name,
        service_needed=service_needed,
        project_type=project_type,
        existing_system=existing_system,
        project_description=project_description,
        problem_to_solve=problem_to_solve,
        main_goal=main_goal,
        reference_links=reference_links,
        budget_range=budget_range,
        expected_start_date=expected_start_date,
        is_urgent=is_urgent,
        preferred_contact_method=preferred_contact_method,
        additional_notes=additional_notes,
        project_consent=True,
    )

    return JsonResponse({'ok': True, 'message': 'Project inquiry submitted successfully.'})
