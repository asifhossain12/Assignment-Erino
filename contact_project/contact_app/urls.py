from django.urls import path
from .views import create_contact, get_contacts, update_contact, delete_contact

urlpatterns = [
    path('contacts/', get_contacts, name='get_contacts'),  # For GET requests
    path('contacts/create/', create_contact, name='create_contact'),  # For POST requests
    path('contacts/<int:id>/update/', update_contact, name='update_contact'),  # For PUT requests
    path('contacts/<int:id>/delete/', delete_contact, name='delete_contact'),  # For DELETE requests
]
