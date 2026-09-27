from django.urls import path

from .views import (
    get_contacts,
    add_contact,
    admin_contacts
)


urlpatterns = [

    # User contacts
    path(
        "<int:user_id>/",
        get_contacts,
        name="get_contacts"
    ),

    # Add contact
    path(
        "<int:user_id>/add/",
        add_contact,
        name="add_contact"
    ),

    # Admin - all contacts
    path(
        "admin/",
        admin_contacts,
        name="admin_contacts"
    ),
]