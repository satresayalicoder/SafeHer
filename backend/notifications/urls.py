from django.urls import path

from .views import (
    get_notifications,
    unread_notification_count,
    mark_notification_read,
    mark_all_notifications_read,
    create_notification
)


urlpatterns = [

    path(
        "<int:user_id>/",
        get_notifications,
        name="get-notifications"
    ),

    path(
        "<int:user_id>/unread-count/",
        unread_notification_count,
        name="unread-notification-count"
    ),

    path(
        "<int:notification_id>/read/",
        mark_notification_read,
        name="mark-notification-read"
    ),

    path(
        "<int:user_id>/read-all/",
        mark_all_notifications_read,
        name="mark-all-notifications-read"
    ),

    path(
        "create/",
        create_notification,
        name="create-notification"
    ),
]