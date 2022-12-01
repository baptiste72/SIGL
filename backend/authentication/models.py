from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    role = models.CharField(max_length=255, default="UNKNOWN")
    token = ""

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
