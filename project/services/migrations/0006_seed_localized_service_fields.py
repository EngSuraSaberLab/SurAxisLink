from django.db import migrations


def seed_localized_service_fields(apps, schema_editor):
    Service = apps.get_model('services', 'Service')

    title_ar_map = {
        'web-digital-platform-development': 'تطوير المواقع والمنصات الرقمية',
        'custom-system-development': 'بناء الأنظمة المخصصة للمشاريع',
        'digital-process-automation': 'أتمتة العمليات الرقمية',
        'ai-integration-solutions': 'دمج خدمات الذكاء الاصطناعي',
        'odoo-customization-development': 'تخصيص وتطوير أنظمة Odoo',
        'payment-gateway-integration': 'دمج خدمات الدفع الإلكتروني',
        'system-maintenance-security': 'صيانة وتأمين المواقع والأنظمة',
    }

    title_en_map = {
        'web-digital-platform-development': 'Web & Digital Platform Development',
        'custom-system-development': 'Custom System Development',
        'digital-process-automation': 'Digital Process Automation',
        'ai-integration-solutions': 'AI Integration Solutions',
        'odoo-customization-development': 'Odoo Customization & Development',
        'payment-gateway-integration': 'Payment Gateway Integration',
        'system-maintenance-security': 'System Maintenance & Security',
    }

    description_en_map = {
        'web-digital-platform-development': 'Scalable websites and digital platforms crafted around your business flow.',
        'custom-system-development': 'Purpose-built systems designed to solve your exact operational needs.',
        'digital-process-automation': 'Automate repetitive workflows and reduce manual effort with smart integrations.',
        'ai-integration-solutions': 'Add practical AI features to improve decisions, speed, and customer experience.',
        'odoo-customization-development': 'Tailored Odoo modules and enhancements aligned with your business model.',
        'payment-gateway-integration': 'Secure payment setup with smooth checkout and reliable transaction flow.',
        'system-maintenance-security': 'Continuous technical support, updates, monitoring, and security hardening.',
    }

    pricing_en_map = {
        'web-digital-platform-development': 'Based on project scope',
        'custom-system-development': 'Custom Pricing',
        'digital-process-automation': 'Starts from $300',
        'ai-integration-solutions': 'Custom Pricing',
        'odoo-customization-development': 'Based on required modules',
        'payment-gateway-integration': 'Starts from $250',
        'system-maintenance-security': 'Monthly plans available',
    }

    for service in Service.objects.all():
        changed_fields = []

        title_ar = title_ar_map.get(service.slug, '')
        title_en = title_en_map.get(service.slug, '')
        desc_en = description_en_map.get(service.slug, '')
        price_en = pricing_en_map.get(service.slug, '')

        if title_ar and service.title_ar != title_ar:
            service.title_ar = title_ar
            changed_fields.append('title_ar')

        if title_en and service.title_en != title_en:
            service.title_en = title_en
            changed_fields.append('title_en')

        if service.short_description and service.short_description_ar != service.short_description:
            service.short_description_ar = service.short_description
            changed_fields.append('short_description_ar')

        if service.pricing_text and service.pricing_text_ar != service.pricing_text:
            service.pricing_text_ar = service.pricing_text
            changed_fields.append('pricing_text_ar')

        if desc_en and service.short_description_en != desc_en:
            service.short_description_en = desc_en
            changed_fields.append('short_description_en')

        if price_en and service.pricing_text_en != price_en:
            service.pricing_text_en = price_en
            changed_fields.append('pricing_text_en')

        if changed_fields:
            service.save(update_fields=changed_fields)


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0005_service_pricing_text_ar_service_pricing_text_en_and_more'),
    ]

    operations = [
        migrations.RunPython(seed_localized_service_fields, migrations.RunPython.noop),
    ]
