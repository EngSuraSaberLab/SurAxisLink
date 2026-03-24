from django.db import migrations


def seed_services(apps, schema_editor):
    Service = apps.get_model('services', 'Service')

    seed_data = [
        {
            'title': 'Web & Digital Platform Development',
            'slug': 'web-digital-platform-development',
            'image': 'services/service1.webp',
            'order': 1,
            'is_active': True,
        },
        {
            'title': 'Custom System Development',
            'slug': 'custom-system-development',
            'image': 'services/service2.webp',
            'order': 2,
            'is_active': True,
        },
        {
            'title': 'Digital Process Automation',
            'slug': 'digital-process-automation',
            'image': 'services/service3.webp',
            'order': 3,
            'is_active': True,
        },
        {
            'title': 'AI Integration Solutions',
            'slug': 'ai-integration-solutions',
            'image': 'services/service4.webp',
            'order': 4,
            'is_active': True,
        },
        {
            'title': 'Odoo Customization & Development',
            'slug': 'odoo-customization-development',
            'image': 'services/service5.webp',
            'order': 5,
            'is_active': True,
        },
        {
            'title': 'Payment Gateway Integration',
            'slug': 'payment-gateway-integration',
            'image': 'services/service6.webp',
            'order': 6,
            'is_active': True,
        },
        {
            'title': 'System Maintenance & Security',
            'slug': 'system-maintenance-security',
            'image': 'services/service7.webp',
            'order': 7,
            'is_active': True,
        },
    ]

    for item in seed_data:
        Service.objects.update_or_create(
            slug=item['slug'],
            defaults=item,
        )


def unseed_services(apps, schema_editor):
    Service = apps.get_model('services', 'Service')
    Service.objects.filter(
        slug__in=[
            'web-digital-platform-development',
            'custom-system-development',
            'digital-process-automation',
            'ai-integration-solutions',
            'odoo-customization-development',
            'payment-gateway-integration',
            'system-maintenance-security',
        ]
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_services, unseed_services),
    ]
