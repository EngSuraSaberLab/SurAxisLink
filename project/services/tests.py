from django.test import TestCase

from .models import Service


class ServiceModelTests(TestCase):
    def test_seeded_static_image_path_returns_static_asset_for_seeded_slugs(self):
        service = Service(slug='web-digital-platform-development')

        self.assertEqual(service.seeded_static_image_path, 'img/services/service1.webp')

    def test_seeded_static_image_path_is_empty_for_custom_slugs(self):
        service = Service(slug='custom-consulting')

        self.assertEqual(service.seeded_static_image_path, '')
