from django.urls import path

from .views import (
    register_user,
    login_user,
    dashboard_data,
    admin_login,
    admin_users
)

urlpatterns = [
    path(
        "register/",
        register_user,
        name="register"
    ),

    path(
        "login/",
        login_user,
        name="login"
    ),

    path(
        "dashboard/<int:user_id>/",
        dashboard_data,
        name="dashboard"
    ),

    path(
        "admin/login/",
        admin_login,
        name="admin-login"
    ),

    path(
        "admin/users/",
        admin_users,
        name="admin-users"
    ),
]