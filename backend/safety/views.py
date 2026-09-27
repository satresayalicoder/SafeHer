from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
import json

from .models import SOSAlert, Complaint
from accounts.models import User
from notifications.models import Notification


# ==========================================================
# CREATE SOS
# ==========================================================

@csrf_exempt
def create_sos(request):

    if request.method != "POST":
        return JsonResponse(
            {"message": "Only POST method is allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        user_id = data.get("user_id")
        latitude = data.get("latitude")
        longitude = data.get("longitude")

        if not user_id:
            return JsonResponse(
                {"message": "User ID is required"},
                status=400
            )

        if latitude is None or longitude is None:
            return JsonResponse(
                {"message": "Location is required"},
                status=400
            )

        try:
            user = User.objects.get(id=user_id)

        except User.DoesNotExist:
            return JsonResponse(
                {"message": "User not found"},
                status=404
            )

        sos = SOSAlert.objects.create(
            user=user,
            latitude=float(latitude),
            longitude=float(longitude),
            status="ACTIVE"
        )

        return JsonResponse(
            {
                "message": "SOS created successfully",

                "sos": {
                    "id": sos.id,
                    "user_id": sos.user.id,
                    "user_name": sos.user.name,
                    "user_email": sos.user.email,
                    "latitude": sos.latitude,
                    "longitude": sos.longitude,
                    "status": sos.status,
                    "created_at": sos.created_at,
                }
            },
            status=201
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


# ==========================================================
# GET USER SOS ALERTS
# ==========================================================

@csrf_exempt
def user_sos(request, user_id):

    if request.method != "GET":
        return JsonResponse(
            {"message": "Only GET method is allowed"},
            status=405
        )

    try:
        alerts = SOSAlert.objects.filter(
            user_id=user_id
        ).order_by("-created_at")

        alert_list = []

        for alert in alerts:

            alert_list.append(
                {
                    "id": alert.id,
                    "user_id": alert.user.id,
                    "user_name": alert.user.name,
                    "user_email": alert.user.email,
                    "latitude": alert.latitude,
                    "longitude": alert.longitude,
                    "status": alert.status,
                    "created_at": alert.created_at,
                    "resolved_at": alert.resolved_at,
                }
            )

        return JsonResponse(
            {
                "message": "SOS alerts loaded successfully",
                "total_alerts": alerts.count(),
                "alerts": alert_list,
            },
            status=200
        )

    except Exception as e:
        return JsonResponse(
            {"message": str(e)},
            status=500
        )


# ==========================================================
# ADMIN - GET ALL SOS ALERTS
# ==========================================================

@csrf_exempt
def admin_sos(request):

    if request.method != "GET":
        return JsonResponse(
            {"message": "Only GET method is allowed"},
            status=405
        )

    try:
        alerts = SOSAlert.objects.select_related(
            "user"
        ).all().order_by("-created_at")

        alert_list = []

        for alert in alerts:

            alert_list.append(
                {
                    "id": alert.id,
                    "user_id": alert.user.id,
                    "user_name": alert.user.name,
                    "user_email": alert.user.email,
                    "latitude": alert.latitude,
                    "longitude": alert.longitude,
                    "status": alert.status,
                    "created_at": alert.created_at,
                    "resolved_at": alert.resolved_at,
                }
            )

        active_count = SOSAlert.objects.filter(
            status="ACTIVE"
        ).count()

        total_count = SOSAlert.objects.count()

        return JsonResponse(
            {
                "message": "SOS alerts loaded successfully",
                "total_alerts": total_count,
                "active_alerts": active_count,
                "alerts": alert_list,
            },
            status=200
        )

    except Exception as e:
        return JsonResponse(
            {"message": str(e)},
            status=500
        )


# ==========================================================
# UPDATE SOS STATUS
# ==========================================================

@csrf_exempt
def update_sos_status(request, sos_id):

    if request.method != "PATCH":
        return JsonResponse(
            {"message": "Only PATCH method is allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        new_status = data.get("status")

        allowed_statuses = [
            "ACTIVE",
            "RESPONDED",
            "RESOLVED"
        ]

        if new_status not in allowed_statuses:
            return JsonResponse(
                {"message": "Invalid SOS status"},
                status=400
            )

        try:
            sos = SOSAlert.objects.get(
                id=sos_id
            )

        except SOSAlert.DoesNotExist:
            return JsonResponse(
                {"message": "SOS alert not found"},
                status=404
            )

        sos.status = new_status

        if new_status == "RESOLVED":
            sos.resolved_at = timezone.now()

        else:
            sos.resolved_at = None

        sos.save()

        return JsonResponse(
            {
                "message": "SOS status updated successfully",

                "sos": {
                    "id": sos.id,
                    "status": sos.status,
                    "resolved_at": sos.resolved_at,
                }
            },
            status=200
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


# ==========================================================
# CREATE COMPLAINT
# ==========================================================

@csrf_exempt
def create_complaint(request):

    if request.method != "POST":
        return JsonResponse(
            {"message": "Only POST method is allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        user_id = data.get("user_id")
        title = data.get("title")
        category = data.get("category")
        description = data.get("description")
        location = data.get("location")
        incident_date = data.get("date")

        # --------------------------------------------------
        # VALIDATION
        # --------------------------------------------------

        if not user_id:
            return JsonResponse(
                {"message": "User ID is required"},
                status=400
            )

        if not title:
            return JsonResponse(
                {"message": "Complaint title is required"},
                status=400
            )

        if not category:
            return JsonResponse(
                {"message": "Complaint category is required"},
                status=400
            )

        if not description:
            return JsonResponse(
                {"message": "Complaint description is required"},
                status=400
            )

        # --------------------------------------------------
        # FIND USER
        # --------------------------------------------------

        try:
            user = User.objects.get(
                id=user_id
            )

        except User.DoesNotExist:
            return JsonResponse(
                {"message": "User not found"},
                status=404
            )

        # --------------------------------------------------
        # CREATE COMPLAINT
        # --------------------------------------------------

        complaint = Complaint.objects.create(
            user=user,
            title=title,
            category=category,
            description=description,
            location=location,
            incident_date=(
                incident_date
                if incident_date
                else None
            ),
            status="PENDING"
        )

        return JsonResponse(
            {
                "message": "Complaint submitted successfully",

                "complaint": {
                    "id": complaint.id,
                    "user_id": complaint.user.id,
                    "user_name": complaint.user.name,
                    "user_email": complaint.user.email,
                    "title": complaint.title,
                    "category": complaint.category,
                    "description": complaint.description,
                    "location": complaint.location,
                    "incident_date": complaint.incident_date,
                    "status": complaint.status,
                    "created_at": complaint.created_at,
                }
            },
            status=201
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


# ==========================================================
# ADMIN - GET ALL COMPLAINTS
# ==========================================================

@csrf_exempt
def admin_complaints(request):

    if request.method != "GET":
        return JsonResponse(
            {"message": "Only GET method is allowed"},
            status=405
        )

    try:
        complaints = Complaint.objects.select_related(
            "user"
        ).all().order_by("-created_at")

        complaint_list = []

        for complaint in complaints:

            complaint_list.append(
                {
                    "id": complaint.id,
                    "user_id": complaint.user.id,
                    "user_name": complaint.user.name,
                    "user_email": complaint.user.email,
                    "title": complaint.title,
                    "category": complaint.category,
                    "description": complaint.description,
                    "location": complaint.location,
                    "incident_date": complaint.incident_date,
                    "status": complaint.status,
                    "created_at": complaint.created_at,
                    "resolved_at": complaint.resolved_at,
                }
            )

        pending_count = Complaint.objects.filter(
            status="PENDING"
        ).count()

        total_count = Complaint.objects.count()

        return JsonResponse(
            {
                "message": "Complaints loaded successfully",
                "total_complaints": total_count,
                "pending_complaints": pending_count,
                "complaints": complaint_list,
            },
            status=200
        )

    except Exception as e:
        return JsonResponse(
            {"message": str(e)},
            status=500
        )


# ==========================================================
# UPDATE COMPLAINT STATUS
# ==========================================================

@csrf_exempt
def update_complaint_status(request, complaint_id):

    if request.method != "PATCH":
        return JsonResponse(
            {"message": "Only PATCH method is allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        new_status = data.get("status")

        allowed_statuses = [
            "PENDING",
            "UNDER_REVIEW",
            "RESOLVED"
        ]

        if new_status not in allowed_statuses:
            return JsonResponse(
                {"message": "Invalid complaint status"},
                status=400
            )

        # --------------------------------------------------
        # FIND COMPLAINT
        # --------------------------------------------------

        try:
            complaint = Complaint.objects.select_related(
                "user"
            ).get(
                id=complaint_id
            )

        except Complaint.DoesNotExist:
            return JsonResponse(
                {"message": "Complaint not found"},
                status=404
            )

        # --------------------------------------------------
        # SAVE OLD STATUS
        # --------------------------------------------------

        old_status = complaint.status

        # --------------------------------------------------
        # UPDATE COMPLAINT STATUS
        # --------------------------------------------------

        complaint.status = new_status

        if new_status == "RESOLVED":
            complaint.resolved_at = timezone.now()

        else:
            complaint.resolved_at = None

        complaint.save()

        # --------------------------------------------------
        # AUTOMATIC NOTIFICATION
        # --------------------------------------------------

        # Notification will be created only when
        # complaint status actually changes.

        if old_status != new_status:

            # ----------------------------------------------
            # UNDER REVIEW NOTIFICATION
            # ----------------------------------------------

            if new_status == "UNDER_REVIEW":

                Notification.objects.create(
                    user=complaint.user,
                    title="Complaint Update",
                    message=(
                        "Your complaint is now under review "
                        "by SafeHer Admin."
                    ),
                    notification_type="COMPLAINT"
                )

            # ----------------------------------------------
            # RESOLVED NOTIFICATION
            # ----------------------------------------------

            elif new_status == "RESOLVED":

                Notification.objects.create(
                    user=complaint.user,
                    title="Complaint Update",
                    message=(
                        "Your complaint has been resolved "
                        "by SafeHer Admin."
                    ),
                    notification_type="COMPLAINT"
                )

        # --------------------------------------------------
        # RESPONSE
        # --------------------------------------------------

        return JsonResponse(
            {
                "message": "Complaint status updated successfully",

                "complaint": {
                    "id": complaint.id,
                    "status": complaint.status,
                    "resolved_at": complaint.resolved_at,
                }
            },
            status=200
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