from django.contrib import admin

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_ar', 'slug', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    search_fields = (
        'title',
        'title_en',
        'title_ar',
        'slug',
        'short_description',
        'short_description_en',
        'short_description_ar',
        'pricing_text',
        'pricing_text_en',
        'pricing_text_ar',
    )
    ordering = ('order',)
    prepopulated_fields = {'slug': ('title_en',)}
    fields = (
        'title',
        'title_en',
        'title_ar',
        'slug',
        'image',
        'short_description',
        'short_description_en',
        'short_description_ar',
        'pricing_text',
        'pricing_text_en',
        'pricing_text_ar',
        'order',
        'is_active',
    )
