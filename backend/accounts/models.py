from django.db import models


class User(models.Model):

    name = models.CharField(max_length=100)

    email = models.EmailField(unique=True)

    password = models.CharField(max_length=255)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.email


class Admin(models.Model):

    email = models.EmailField(
        unique=True
    )

    password = models.CharField(
        max_length=255
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):

        # SafeHer will have only ONE Admin account.
        if not self.pk and Admin.objects.exists():

            raise ValueError(
                "Only one SafeHer Admin account is allowed."
            )

        super().save(*args, **kwargs)

    def __str__(self):
        return self.email