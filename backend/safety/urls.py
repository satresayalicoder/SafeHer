from django.urls import path

from .views import (
    create_sos,
    user_sos,
    admin_sos,
    update_sos_status,
    create_complaint,
    admin_complaints,
    update_complaint_status
)

urlpatterns = [

    # ================= SOS =================

    path(
        "create/",
        create_sos,
        name="create-sos"
    ),

    path(
        "user/<int:user_id>/",
        user_sos,
        name="user-sos"
    ),

    path(
        "admin/",
        admin_sos,
        name="admin-sos"
    ),

    path(
        "<int:sos_id>/status/",
        update_sos_status,
        name="update-sos-status"
    ),

    # ================= COMPLAINT =================

    path(
        "complaints/create/",
        create_complaint,
        name="create-complaint"
    ),

    path(
        "complaints/admin/",
        admin_complaints,
        name="admin-complaints"
    ),

    path(
        "complaints/<int:complaint_id>/status/",
        update_complaint_status,
        name="update-complaint-status"
    ),
]