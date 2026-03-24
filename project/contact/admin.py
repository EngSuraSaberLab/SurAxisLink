from django.contrib import admin
from .models import ProjectInquiry


@admin.register(ProjectInquiry)
class ProjectInquiryAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'full_name',
        'email',
        'phone_whatsapp',
        'service_needed',
        'project_type',
        'status',
        'created_at',
    )
    list_filter = ('status', 'service_needed', 'project_type', 'is_urgent', 'created_at')
    search_fields = ('full_name', 'email', 'phone_whatsapp', 'company_project_name')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Contact Information', {
            'fields': ('full_name', 'email', 'phone_whatsapp', 'company_project_name')
        }),
        ('Service & Request', {
            'fields': ('service_needed', 'project_type', 'existing_system')
        }),
        ('Project Details', {
            'fields': ('project_description', 'problem_to_solve', 'main_goal', 'reference_links')
        }),
        ('Timeline & Budget', {
            'fields': ('budget_range', 'expected_start_date', 'is_urgent')
        }),
        ('Final Details', {
            'fields': ('preferred_contact_method', 'additional_notes', 'project_consent')
        }),
        ('Internal Tracking', {
            'fields': ('status', 'admin_notes', 'created_at', 'updated_at')
        }),
    )
