from django.contrib import admin

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'slug', 'short_description', 'pricing_text')
    ordering = ('order',)
    prepopulated_fields = {'slug': ('title',)}
    fields = ('title', 'slug', 'image', 'short_description', 'pricing_text', 'order', 'is_active')
