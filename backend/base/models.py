from django.db import models


class SuperHero(models.Model):
    name = models.CharField(max_length=100)
    power = models.TextField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
