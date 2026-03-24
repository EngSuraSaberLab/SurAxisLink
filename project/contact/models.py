from django.db import models


class ProjectInquiry(models.Model):
    STATUS_NEW = 'new'
    STATUS_REVIEWING = 'reviewing'
    STATUS_CONTACTED = 'contacted'
    STATUS_CLOSED = 'closed'

    STATUS_CHOICES = [
        (STATUS_NEW, 'New'),
        (STATUS_REVIEWING, 'Reviewing'),
        (STATUS_CONTACTED, 'Contacted'),
        (STATUS_CLOSED, 'Closed'),
    ]

    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=120)
    phone_whatsapp = models.CharField(max_length=20)
    company_project_name = models.CharField(max_length=150, blank=True)

    service_needed = models.CharField(max_length=120)
    project_type = models.CharField(max_length=50)
    existing_system = models.CharField(max_length=10, blank=True)

    project_description = models.TextField()
    problem_to_solve = models.TextField(blank=True)
    main_goal = models.TextField(blank=True)
    reference_links = models.TextField(blank=True)

    budget_range = models.CharField(max_length=50, blank=True)
    expected_start_date = models.CharField(max_length=60, blank=True)
    is_urgent = models.CharField(max_length=10, blank=True)

    preferred_contact_method = models.CharField(max_length=20)
    additional_notes = models.TextField(blank=True)
    project_consent = models.BooleanField(default=False)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_NEW)
    admin_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.full_name} - {self.service_needed} ({self.created_at:%Y-%m-%d})'
