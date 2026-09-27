from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import User, Admin


# =========================================================
# USER REGISTER
# =========================================================

@csrf_exempt
def register_user(request):

    if request.method != "POST":
        return JsonResponse(
            {"message": "Only POST method is allowed"},
            status=405
        )

    try:

        data = json.loads(request.body)

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        # Check required fields
        if not name or not email or not password:
            return JsonResponse(
                {
                    "message": "Name, email and password are required"
                },
                status=400
            )

        # Check duplicate user email
        if User.objects.filter(email=email).exists():
            return JsonResponse(
                {
                    "message": "Email already registered"
                },
                status=400
            )

        # Create user with hashed password
        user = User.objects.create(
            name=name,
            email=email,
            password=make_password(password)
        )

        return JsonResponse(
            {
                "message": "Registration successful",

                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }
            },
            status=201
        )

    except json.JSONDecodeError:

        return JsonResponse(
            {
                "message": "Invalid JSON data"
            },
            status=400
        )

    except Exception as e:

        return JsonResponse(
            {
                "message": str(e)
            },
            status=500
        )


# =========================================================
# USER LOGIN
# =========================================================

@csrf_exempt
def login_user(request):

    if request.method != "POST":
        return JsonResponse(
            {"message": "Only POST method is allowed"},
            status=405
        )

    try:

        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        # Check required fields
        if not email or not password:
            return JsonResponse(
                {
                    "message": "Email and password are required"
                },
                status=400
            )

        # Find user
        try:

            user = User.objects.get(email=email)

        except User.DoesNotExist:

            return JsonResponse(
                {
                    "message": "Invalid email or password"
                },
                status=401
            )

        # Check password
        if not check_password(password, user.password):

            return JsonResponse(
                {
                    "message": "Invalid email or password"
                },
                status=401
            )

        # Successful user login
        return JsonResponse(
            {
                "message": "Login successful",

                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }
            },
            status=200
        )

    except json.JSONDecodeError:

        return JsonResponse(
            {
                "message": "Invalid JSON data"
            },
            status=400
        )

    except Exception as e:

        return JsonResponse(
            {
                "message": str(e)
            },
            status=500
        )


# =========================================================
# USER DASHBOARD
# =========================================================

@csrf_exempt
def dashboard_data(request, user_id):

    if request.method != "GET":
        return JsonResponse(
            {
                "message": "Only GET method is allowed"
            },
            status=405
        )

    try:

        user = User.objects.get(id=user_id)

        return JsonResponse(
            {
                "message": "Dashboard data loaded",

                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }
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
# ADMIN LOGIN
# =========================================================

@csrf_exempt
def admin_login(request):

    if request.method != "POST":

        return JsonResponse(
            {
                "message": "Only POST method is allowed"
            },
            status=405
        )

    try:

        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        # =====================================================
        # CHECK EMPTY FIELDS
        # =====================================================

        if not email or not password:

            return JsonResponse(
                {
                    "message": "Admin email and password are required"
                },
                status=400
            )

        # =====================================================
        # CHECK WHETHER EMAIL BELONGS TO NORMAL USER
        # =====================================================

        if User.objects.filter(email=email).exists():

            return JsonResponse(
                {
                    "message": (
                        "This login is for Admin only. "
                        "Please use the User Login page."
                    )
                },
                status=403
            )

        # =====================================================
        # FIND ADMIN
        # =====================================================

        try:

            admin = Admin.objects.get(email=email)

        except Admin.DoesNotExist:

            return JsonResponse(
                {
                    "message": "Invalid admin email or password."
                },
                status=401
            )

        # =====================================================
        # CHECK ADMIN PASSWORD
        # =====================================================

        if not check_password(password, admin.password):

            return JsonResponse(
                {
                    "message": "Invalid admin email or password."
                },
                status=401
            )

        # =====================================================
        # ADMIN LOGIN SUCCESS
        # =====================================================

        return JsonResponse(
            {
                "message": "Admin login successful",

                "admin": {
                    "id": admin.id,
                    "email": admin.email
                }
            },
            status=200
        )

    except json.JSONDecodeError:

        return JsonResponse(
            {
                "message": "Invalid JSON data"
            },
            status=400
        )

    except Exception as e:

        return JsonResponse(
            {
                "message": str(e)
            },
            status=500
        )

# =========================================================
# ADMIN - GET ALL USERS
# =========================================================

@csrf_exempt
def admin_users(request):

    if request.method != "GET":
        return JsonResponse(
            {
                "message": "Only GET method is allowed"
            },
            status=405
        )

    try:

        users = User.objects.all().order_by("-created_at")

        user_list = []

        for user in users:

            user_list.append(
                {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "created_at": user.created_at
                }
            )

        return JsonResponse(
            {
                "message": "Users loaded successfully",
                "total_users": users.count(),
                "users": user_list
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