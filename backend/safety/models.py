from django.db import models
from accounts.models import User


# ======================================================
# SOS ALERT
# ======================================================

class SOSAlert(models.Model):

    STATUS_CHOICES = [
        ("ACTIVE", "Active"),
        ("RESPONDED", "Responded"),
        ("RESOLVED", "Resolved"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sos_alerts"
    )

    latitude = models.FloatField()
    longitude = models.FloatField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="ACTIVE"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"SOS #{self.id} - {self.user.name}"


# ======================================================
# COMPLAINT
# ======================================================

class Complaint(models.Model):

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("UNDER_REVIEW", "Under Review"),
        ("RESOLVED", "Resolved"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="complaints"
    )

    title = models.CharField(
        max_length=200
    )

    category = models.CharField(
        max_length=100
    )

    description = models.TextField()

    location = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    incident_date = models.DateField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    resolved_at = models.DateTimeField(
        blank=True,
        null=True
    )

    def __str__(self):
        return f"Complaint #{self.id} - {self.title}"