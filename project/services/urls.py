from django.urls import path
from . import views

urlpatterns = [
    path('<slug:slug>/', views.service_detail_placeholder, name='service_detail'),
]
