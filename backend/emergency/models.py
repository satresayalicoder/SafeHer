from django.db import models
from accounts.models import User


class EmergencyContact(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="emergency_contacts"
    )

    name = models.CharField(max_length=100)

    phone = models.CharField(max_length=20)

    relation = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.user.email}"