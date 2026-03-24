from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('privacy/', views.privacy_policy, name='privacy_policy'),
    path('terms/', views.terms_of_service, name='terms_of_service'),
    path('cookies/', views.cookies_policy, name='cookies_policy'),
]
