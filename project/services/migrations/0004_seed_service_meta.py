from django.db import migrations


def seed_service_meta(apps, schema_editor):
    Service = apps.get_model('services', 'Service')

    updates = {
        'web-digital-platform-development': (
            'Scalable websites and digital platforms crafted around your business flow.',
            'Based on project scope',
        ),
        'custom-system-development': (
            'Purpose-built systems designed to solve your exact operational needs.',
            'Custom Pricing',
        ),
        'digital-process-automation': (
            'Automate repetitive workflows and reduce manual effort with smart integrations.',
            'Starts from $300',
        ),
        'ai-integration-solutions': (
            'Add practical AI features to improve decisions, speed, and customer experience.',
            'Custom Pricing',
        ),
        'odoo-customization-development': (
            'Tailored Odoo modules and enhancements aligned with your business model.',
            'Based on required modules',
        ),
        'payment-gateway-integration': (
            'Secure payment setup with smooth checkout and reliable transaction flow.',
            'Starts from $250',
        ),
        'system-maintenance-security': (
            'Continuous technical support, updates, monitoring, and security hardening.',
            'Monthly plans available',
        ),
    }

    for slug, values in updates.items():
        short_description, pricing_text = values
        Service.objects.filter(slug=slug).update(
            short_description=short_description,
            pricing_text=pricing_text,
        )


class Migration(migrations.Migration):
    dependencies = [
        ('services', '0003_service_pricing_text_service_short_description'),
    ]

    operations = [
        migrations.RunPython(seed_service_meta, migrations.RunPython.noop),
    ]
