from django.db import models
from authentication.models import User
from base.semester import Semester


class Interview(models.Model):
    # table des échéances
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100)
    promotion = models.CharField(max_length=100)
    
    #list stand by après les tests
    #semester = models.CharField(max_length=10, choices=[(tag, tag.value) for tag in Semester])


class TeacherInCharge(User):
    # table des tuteurs pédagogiques
    def __unicode__(self):
        return self.name


class FormationCenter(models.Model):
    # table des centres de formation
    worded = models.CharField(max_length=200)
    address = models.CharField(max_length=500)
    teacherInCharge = models.ForeignKey(
        TeacherInCharge, related_name="formationCenter", on_delete=models.CASCADE, null=True)


class Mentor(User):
 # table des maîtres d'apprentissage
    def __unicode__(self):
        return self.name


class Company(models.Model):
    # table des entreprises
    worded = models.CharField(max_length=200)
    address = models.CharField(max_length=500)
    mentor = models.ForeignKey(
        Mentor, related_name="company", on_delete=models.CASCADE, null=True)

    def __unicode__(self):
        return self.name


class Trainee(User):
    # table des apprentis
    def __unicode__(self):
        return self.name


class YearGroup(models.Model):
    # tables des promotions
    worded = models.CharField(max_length=200)
    semester = models.CharField(max_length=10, choices=[
                                (tag, tag.value) for tag in Semester])
    trainee = models.ForeignKey(
        Trainee, related_name="yearGroup", on_delete=models.CASCADE, null=True)
