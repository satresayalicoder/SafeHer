from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Notification
from accounts.models import User


# =====================================================
# GET ALL NOTIFICATIONS
# =====================================================

@csrf_exempt
def get_notifications(request, user_id):

    if request.method != "GET":
        return JsonResponse(
            {"message": "Only GET method is allowed"},
            status=405
        )

    try:
        user = User.objects.get(id=user_id)

        notifications = Notification.objects.filter(
            user=user
        ).order_by("-created_at")

        notification_list = []

        for notification in notifications:
            notification_list.append({
                "id": notification.id,
                "user_id": notification.user.id,
                "title": notification.title,
                "message": notification.message,
                "notification_type": notification.notification_type,
                "is_read": notification.is_read,
                "created_at": notification.created_at,
            })

        return JsonResponse({
            "message": "Notifications loaded successfully",
            "total_notifications": notifications.count(),
            "unread_notifications": notifications.filter(
                is_read=False
            ).count(),
            "notifications": notification_list,
        })

    except User.DoesNotExist:
        return JsonResponse(
            {"message": "User not found"},
            status=404
        )

    except Exception as e:
        return JsonResponse(
            {"message": str(e)},
            status=500
        )


# =====================================================
# GET UNREAD NOTIFICATION COUNT
# =====================================================

@csrf_exempt
def unread_notification_count(request, user_id):

    if request.method != "GET":
        return JsonResponse(
            {"message": "Only GET method is allowed"},
            status=405
        )

    try:
        user = User.objects.get(id=user_id)

        unread_count = Notification.objects.filter(
            user=user,
            is_read=False
        ).count()

        return JsonResponse({
            "message": "Unread notification count loaded",
            "unread_count": unread_count
        })

    except User.DoesNotExist:
        return JsonResponse(
            {"message": "User not found"},
            status=404
        )

    except Exception as e:
        return JsonResponse(
            {"message": str(e)},
            status=500
        )


# =====================================================
# MARK ONE NOTIFICATION AS READ
# =====================================================

@csrf_exempt
def mark_notification_read(request, notification_id):

    if request.method != "PATCH":
        return JsonResponse(
            {"message": "Only PATCH method is allowed"},
            status=405
        )

    try:
        notification = Notification.objects.get(
            id=notification_id
        )

        notification.is_read = True
        notification.save()

        return JsonResponse({
            "message": "Notification marked as read",
            "notification_id": notification.id,
            "is_read": notification.is_read
        })

    except Notification.DoesNotExist:
        return JsonResponse(
            {"message": "Notification not found"},
            status=404
        )

    except Exception as e:
        return JsonResponse(
            {"message": str(e)},
            status=500
        )


# =====================================================
# MARK ALL NOTIFICATIONS AS READ
# =====================================================

@csrf_exempt
def mark_all_notifications_read(request, user_id):

    if request.method != "PATCH":
        return JsonResponse(
            {"message": "Only PATCH method is allowed"},
            status=405
        )

    try:
        user = User.objects.get(id=user_id)

        updated_count = Notification.objects.filter(
            user=user,
            is_read=False
        ).update(is_read=True)

        return JsonResponse({
            "message": "All notifications marked as read",
            "updated_count": updated_count
        })

    except User.DoesNotExist:
        return JsonResponse(
            {"message": "User not found"},
            status=404
        )

    except Exception as e:
        return JsonResponse(
            {"message": str(e)},
            status=500
        )


# =====================================================
# CREATE NOTIFICATION
# =====================================================

@csrf_exempt
def create_notification(request):

    if request.method != "POST":
        return JsonResponse(
            {"message": "Only POST method is allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        user_id = data.get("user_id")
        title = data.get("title")
        message = data.get("message")
        notification_type = data.get(
            "notification_type",
            "SYSTEM"
        )

        if not user_id:
            return JsonResponse(
                {"message": "user_id is required"},
                status=400
            )

        if not title:
            return JsonResponse(
                {"message": "title is required"},
                status=400
            )

        if not message:
            return JsonResponse(
                {"message": "message is required"},
                status=400
            )

        user = User.objects.get(id=user_id)

        notification = Notification.objects.create(
            user=user,
            title=title,
            message=message,
            notification_type=notification_type
        )

        return JsonResponse({
            "message": "Notification created successfully",
            "notification": {
                "id": notification.id,
                "user_id": notification.user.id,
                "title": notification.title,
                "message": notification.message,
                "notification_type": notification.notification_type,
                "is_read": notification.is_read,
                "created_at": notification.created_at,
            }
        }, status=201)

    except User.DoesNotExist:
        return JsonResponse(
            {"message": "User not found"},
            status=404
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {"message": "Invalid JSON data"},
            status=400
        )

    except Exception as e:
        return JsonResponse(
            {"message": str(e)},
            status=500
        )