from django.urls import path
from . import views

urlpatterns = [
    path('project-inquiry/submit/', views.project_inquiry_submit, name='project_inquiry_submit'),
]
