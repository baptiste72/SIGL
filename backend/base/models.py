from django.db import models
from django.utils import timezone
from authentication.models import User


class FormationCenter(models.Model):
    # table des centres de formation
    worded = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=5)
    address = models.CharField(max_length=500)


class Tutor(User):
    # table des tuteurs pédagogiques
    formationCenter = models.ForeignKey(
        FormationCenter, related_name="tutor", on_delete=models.CASCADE, null=True
    )


class Company(models.Model):
    # table des entreprises
    worded = models.CharField(max_length=200)
    address = models.CharField(max_length=500)


class Mentor(User):
    # table des maîtres d'apprentissage
    company = models.ForeignKey(
        Company, related_name="Mentor", on_delete=models.CASCADE, null=True
    )


class CompanyUser(User):
    pass


class YearGroup(models.Model):
    # tables des promotions
    worded = models.CharField(max_length=200)
    beginDate = models.DateTimeField(default=timezone.now)


class Apprentice(User):
    # table des apprentis
    yearGroup = models.ForeignKey(
        YearGroup, related_name="Apprentice", on_delete=models.CASCADE, null=True
    )


class Semester(models.Model):
    # tables des semestres
    name = models.CharField(max_length=200)
    beginDate = models.DateTimeField(default=timezone.now)
    endDate = models.DateTimeField(default=timezone.now)
    yearGroup = models.ForeignKey(
        YearGroup, related_name="semester", on_delete=models.CASCADE, null=True
    )


class TutorTeam(models.Model):
    # table équipes tutorales
    mentor = models.ForeignKey(
        Mentor, related_name="TutorTeam", on_delete=models.CASCADE, null=True
    )
    tutor = models.ForeignKey(
        Tutor, related_name="TutorTeam", on_delete=models.CASCADE, null=True
    )
    apprentice = models.ForeignKey(
        Apprentice, related_name="TutorTeam", on_delete=models.CASCADE, null=True
    )


class Document(models.Model):
    # tables des documents pédagogiques
    name = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    user = models.ForeignKey(
        User, related_name="user", on_delete=models.CASCADE, null=True
    )
    yearGroup = models.ForeignKey(
        YearGroup, related_name="document", on_delete=models.CASCADE, null=True
    )


class Interview(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    first_hour = models.CharField(max_length=100)
    last_hour = models.CharField(max_length=100)
    description = models.CharField(max_length=1500, null=True, blank=True)
    attendees = models.ManyToManyField(User)
    semester = models.ForeignKey(
        Semester, related_name="interview", on_delete=models.CASCADE, null=True
    )
    apprentice = models.ForeignKey(
        Apprentice, related_name="interview", on_delete=models.CASCADE
    )


class Deadline(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    description = models.CharField(max_length=1500, null=True, blank=True)
    yearGroup = models.ForeignKey(
        YearGroup, related_name="deadline", on_delete=models.CASCADE
    )


class Note(models.Model):
    title = models.CharField(max_length=400)
    text = models.CharField(max_length=35000, blank=True)
    beginDate = models.DateTimeField()
    endDate = models.DateTimeField()
    timestamp = models.DateTimeField(auto_now_add=True)
    apprentice = models.ForeignKey(
        Apprentice, related_name="note", on_delete=models.CASCADE
    )
    semester = models.ForeignKey(
        Semester, related_name="note", on_delete=models.CASCADE
    )
