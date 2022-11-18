from django.db import models
from authentication.models import User
from django.utils import timezone

class Interview(models.Model):
    # table des entretien
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    first_hour = models.CharField(max_length=100)
    last_hour = models.CharField(max_length=100)
    description = models.CharField(max_length=1500,null=True, blank=True)
    guest= models.CharField(max_length=255)
    semester=models.CharField(max_length=255)
    #list stand by après les tests
    #semester = models.CharField(max_length=10, choices=[(tag, tag.value) for tag in Semester])

class Deadline(models.Model):
    # table des échéances
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    description = models.CharField(max_length=1500,null=True, blank=True)
    #list stand by après les tests
    #semester = models.CharField(max_length=10, choices=[(tag, tag.value) for tag in Semester])

class FormationCenter(models.Model):
    # table des centres de formation
    worded = models.CharField(max_length=200)
    address = models.CharField(max_length=500)

class Tutor(User):
    # table des tuteurs pédagogiques
    formationCenter = models.ForeignKey(
        FormationCenter, related_name="tutor", on_delete=models.CASCADE, null=True)
    def __unicode__(self):
        return self.name
       
class Company(models.Model):
    # table des entreprises
    worded = models.CharField(max_length=200)
    address = models.CharField(max_length=500)

    def __unicode__(self):
        return self.name

class Mentor(User):
 # table des maîtres d'apprentissage
    company = models.ForeignKey(
        Company, related_name="mentor", on_delete=models.CASCADE, null=True)
    
    def __unicode__(self):
        return self.name

class Apprentice(User):
    # table des apprentis
    def __unicode__(self):
        return self.name

class YearGroup(models.Model):
    # tables des promotions
    worded = models.CharField(max_length=200)
    beginDate = models.DateTimeField(default=timezone.now)
    
class Note(models.Model):
    title = models.CharField(max_length=400)
    text = models.CharField(max_length=35000,blank=True)
    semester = models.CharField(max_length=255)
    dateStart = models.DateTimeField()
    dateEnd = models.DateTimeField()
    timestamp = models.DateTimeField(auto_now_add=True)
    beginDate = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.name

class Semester(models.Model):
    # tables des semestres
    name = models.CharField(max_length=200)
    beginDate = models.DateTimeField(default=timezone.now)
    endDate = models.DateTimeField(default=timezone.now)
    yearGroup = models.ForeignKey(
        YearGroup, related_name="semester", on_delete=models.CASCADE, null=True)

    def str(self):
        return self.name
    apprentice = models.ForeignKey(
        Apprentice, related_name="yearGroup", on_delete=models.CASCADE, null=True)
    
class TutorTeam(models.Model):
    # table équipes tutorales
    mentor = models.ForeignKey(
        Mentor, related_name="tutorTeam", on_delete=models.CASCADE, null=True)
    tutor = models.ForeignKey(
        Tutor, related_name="tutorTeam", on_delete=models.CASCADE, null=True)
    apprentice = models.ForeignKey(
        Apprentice, related_name="tutorTeam", on_delete=models.CASCADE, null=True)
    
    def __unicode__(self):
        return self.name
