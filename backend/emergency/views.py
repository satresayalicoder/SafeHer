from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import EmergencyContact
from accounts.models import User


# =========================================================
# GET USER EMERGENCY CONTACTS
# =========================================================

@csrf_exempt
def get_contacts(request, user_id):

    if request.method != "GET":
        return JsonResponse(
            {
                "message": "Only GET method is allowed"
            },
            status=405
        )

    try:
        user = User.objects.get(id=user_id)

        contacts = EmergencyContact.objects.filter(
            user=user
        ).order_by("-created_at")

        contact_list = []

        for contact in contacts:

            contact_list.append(
                {
                    "id": contact.id,
                    "name": contact.name,
                    "phone": contact.phone,
                    "relation": contact.relation,
                    "created_at": contact.created_at
                }
            )

        return JsonResponse(
            {
                "message": "Emergency contacts loaded successfully",
                "total_contacts": contacts.count(),
                "contacts": contact_list
            },
            status=200
        )

    except User.DoesNotExist:

        return JsonResponse(
            {
                "message": "User not found"
            },
            status=404
        )

    except Exception as e:

        return JsonResponse(
            {
                "message": str(e)
            },
            status=500
        )


# =========================================================
# ADD EMERGENCY CONTACT
# =========================================================

@csrf_exempt
def add_contact(request, user_id):

    if request.method != "POST":
        return JsonResponse(
            {
                "message": "Only POST method is allowed"
            },
            status=405
        )

    try:

        user = User.objects.get(id=user_id)

        data = json.loads(request.body)

        name = data.get("name", "").strip()
        phone = data.get("phone", "").strip()
        relation = data.get("relation", "").strip()

        if not name or not phone or not relation:

            return JsonResponse(
                {
                    "message": "Name, phone and relation are required"
                },
                status=400
            )

        contact = EmergencyContact.objects.create(
            user=user,
            name=name,
            phone=phone,
            relation=relation
        )

        return JsonResponse(
            {
                "message": "Emergency contact added successfully",

                "contact": {
                    "id": contact.id,
                    "name": contact.name,
                    "phone": contact.phone,
                    "relation": contact.relation,
                    "created_at": contact.created_at
                }
            },
            status=201
        )

    except User.DoesNotExist:

        return JsonResponse(
            {
                "message": "User not found"
            },
            status=404
        )

    except Exception as e:

        return JsonResponse(
            {
                "message": str(e)
            },
            status=500
        )


# =========================================================
# ADMIN - GET ALL EMERGENCY CONTACTS
# =========================================================

@csrf_exempt
def admin_contacts(request):

    if request.method != "GET":

        return JsonResponse(
            {
                "message": "Only GET method is allowed"
            },
            status=405
        )

    try:

        contacts = EmergencyContact.objects.select_related(
            "user"
        ).order_by("-created_at")

        contact_list = []

        for contact in contacts:

            contact_list.append(
                {
                    "id": contact.id,
                    "user_id": contact.user.id,
                    "user_name": contact.user.name,
                    "user_email": contact.user.email,
                    "name": contact.name,
                    "phone": contact.phone,
                    "relation": contact.relation,
                    "created_at": contact.created_at
                }
            )

        return JsonResponse(
            {
                "message": "Emergency contacts loaded successfully",
                "total_contacts": contacts.count(),
                "contacts": contact_list
            },
            status=200
        )

    except Exception as e:

        return JsonResponse(
            {
                "message": str(e)
            },
            status=500
        )