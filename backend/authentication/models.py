from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser


class UserManager(BaseUserManager):
    def create_user(self, email, password, role, first_name, last_name):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            password=password,
            role=role,
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, username=None):
        user = self.create_user(
            email="contact@projet-sigl.fr",
            password=password,
            role="ADMIN",
            first_name="Admin",
            last_name="SIGL",
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    role = models.CharField(max_length=255, default="UNKNOWN")
    token = ""

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
