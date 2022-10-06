from django.db import models


class Deadline(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100)
    promotion = models.CharField(max_length=100)
    semester = models.CharField(max_length=200)
