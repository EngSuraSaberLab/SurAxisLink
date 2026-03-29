from django.db import models


class Service(models.Model):
    SEEDED_STATIC_IMAGE_BY_SLUG = {
        'web-digital-platform-development': 'img/services/service1.webp',
        'custom-system-development': 'img/services/service2.webp',
        'digital-process-automation': 'img/services/service3.webp',
        'ai-integration-solutions': 'img/services/service4.webp',
        'odoo-customization-development': 'img/services/service5.webp',
        'payment-gateway-integration': 'img/services/service6.webp',
        'system-maintenance-security': 'img/services/service7.webp',
    }

    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True, default='')
    title_ar = models.CharField(max_length=200, blank=True, default='')
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='services/')
    short_description = models.CharField(max_length=260, blank=True, default='')
    short_description_en = models.CharField(max_length=260, blank=True, default='')
    short_description_ar = models.CharField(max_length=260, blank=True, default='')
    pricing_text = models.CharField(max_length=120, blank=True, default='')
    pricing_text_en = models.CharField(max_length=120, blank=True, default='')
    pricing_text_ar = models.CharField(max_length=120, blank=True, default='')
    order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    @property
    def seeded_static_image_path(self):
        return self.SEEDED_STATIC_IMAGE_BY_SLUG.get(self.slug, '')

    def __str__(self):
        return self.title_en or self.title_ar or self.title
