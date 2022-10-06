from django.db import models

class User(models.Model):
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=200)
    enum = models.CharField(max_length=100, unique=True, null=True)


class Deadline(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100)
    promotion = models.CharField(max_length=100)
    semester = models.CharField(max_length=200)