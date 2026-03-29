from django.test import TestCase
from django.urls import reverse

from services.models import Service


class HomeViewTests(TestCase):
    def test_home_uses_static_seeded_service_image_path(self):
        Service.objects.create(
            title='Web & Digital Platform Development',
            title_en='Web & Digital Platform Development',
            title_ar='تطوير المواقع والمنصات الرقمية',
            slug='web-digital-platform-development',
            image='services/service1.webp',
            short_description='Test description',
            pricing_text='Custom',
            order=1,
            is_active=True,
        )

        response = self.client.get(reverse('home'))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, '/static/img/services/service1.webp')
