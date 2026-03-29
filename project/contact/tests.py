import json
from unittest.mock import patch

from django.test import RequestFactory, TestCase, override_settings
from django.urls import reverse

from .views import _client_ip


class ContactViewTests(TestCase):
    def setUp(self):
        self.valid_payload = {
            'full_name': 'Test User',
            'email': 'test@example.com',
            'phone_whatsapp': '+9647123456789',
            'company_project_name': 'SurAxis',
            'service_needed': 'Web & Digital Platform Development',
            'project_type': 'New Project',
            'existing_system': 'No',
            'project_description': 'This is a sufficiently detailed project description.',
            'problem_to_solve': 'Manual work is slowing down the team.',
            'main_goal': 'Launch a stable web platform.',
            'reference_links': 'https://example.com',
            'budget_range': 'Under $500',
            'expected_start_date': 'Within 1 Month',
            'is_urgent': 'No',
            'preferred_contact_method': 'Email',
            'additional_notes': 'Please reply by email.',
            'project_consent': 'on',
            'g-recaptcha-response': 'token',
        }

    @patch('contact.views.urlopen')
    def test_project_inquiry_submit_accepts_canonical_service_titles(self, mock_urlopen):
        mock_urlopen.return_value.__enter__.return_value.read.return_value = json.dumps(
            {'success': True, 'hostname': 'testserver'}
        ).encode('utf-8')

        response = self.client.post(reverse('project_inquiry_submit'), data=self.valid_payload)

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            response.content,
            {'ok': True, 'message': 'Project inquiry submitted successfully.'},
        )

    def test_client_ip_ignores_forwarded_header_when_not_trusted(self):
        request = RequestFactory().get(
            '/',
            REMOTE_ADDR='10.0.0.5',
            HTTP_X_FORWARDED_FOR='198.51.100.8, 10.0.0.5',
        )

        self.assertEqual(_client_ip(request), '10.0.0.5')

    @override_settings(TRUST_X_FORWARDED_FOR=True)
    def test_client_ip_uses_forwarded_header_when_trusted(self):
        request = RequestFactory().get(
            '/',
            REMOTE_ADDR='10.0.0.5',
            HTTP_X_FORWARDED_FOR='198.51.100.8, 10.0.0.5',
        )

        self.assertEqual(_client_ip(request), '198.51.100.8')
