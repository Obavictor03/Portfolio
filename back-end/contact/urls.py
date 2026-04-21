from django.urls import path
from .views import contact_view, contact_list

urlpatterns= [
    path('contact/', contact_view),
    path('contacts/', contact_list),
]