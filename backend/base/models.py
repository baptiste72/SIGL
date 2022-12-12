from django.db import models
from django.utils import timezone
from authentication.models import User


class Interview(models.Model):
    # table des entretien
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    first_hour = models.CharField(max_length=100)
    last_hour = models.CharField(max_length=100)
    description = models.CharField(max_length=1500, null=True, blank=True)
    guest = models.CharField(max_length=255)
    semester = models.CharField(max_length=255)
    # list stand by après les tests
    # semester = models.CharField(max_length=10, choices=[(tag, tag.value) for tag in Semester])


class Deadline(models.Model):
    # table des échéances
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    description = models.CharField(max_length=1500, null=True, blank=True)
    # list stand by après les tests
    # semester = models.CharField(max_length=10, choices=[(tag, tag.value) for tag in Semester])


class FormationCenter(models.Model):
    # table des centres de formation
    worded = models.CharField(max_length=200)
    address = models.CharField(max_length=500)


class Tutor(User):
    # table des tuteurs pédagogiques
    formationCenter = models.ForeignKey(
        FormationCenter, related_name="tutor", on_delete=models.CASCADE, null=True
    )


class Company(models.Model):
    # table des entreprises
    #worded = models.CharField(max_length=200)
    #address = models.CharField(max_length=500)
    cmp_siret = models.CharField(primary_key=True, max_length=200)
    cmp_address = models.CharField(max_length=500)
    cmp_name = models.CharField(max_length=200)
    cmp_employees = models.CharField(max_length=200)
    cmp_cpne = models.CharField(max_length=200)
    cmp_idcc = models.CharField(max_length=200)
    cmp_convention = models.CharField(max_length=400)
    cmp_naf_ape = models.CharField(max_length=200)
    cmp_work_field = models.CharField(max_length=200)
    cmp_phone = models.CharField(max_length=50)
    cmp_email = models.EmailField(max_length=200)
    cmp_internat = models.CharField(max_length=20,default = "Non")

class Opco(models.Model):

    opco_cmp_siret = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    opco_siret = models.CharField(max_length=200)
    opco_name = models.CharField(max_length=200)
    opco_address = models.CharField(max_length=200)
    opco_phone = models.CharField(max_length=200)
    opco_email = models.CharField(max_length=200)

    def __unicode__(self):
        return self.name

class ContactCompany(models.Model):
    ct_cmp_siret = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    ct_last_name  = models.CharField(max_length=200,default = "")
    ct_first_name = models.CharField(max_length=200,default = "")
    ct_phone      = models.CharField(max_length=200,default = "")
    ct_email      = models.EmailField(max_length=200,default = "")
    ct_job_title  = models.CharField(max_length=200,default = "")
    ct_former_eseo = models.CharField(max_length=200,default = "")
    fi_last_name  = models.CharField(max_length=200,default = "")
    fi_first_name = models.CharField(max_length=200,default = "")
    fi_phone      = models.CharField(max_length=200,default = "")
    fi_email      = models.EmailField(max_length=200,default = "")
    fi_job_title  = models.CharField(max_length=200,default = "")
    fi_former_eseo = models.CharField(max_length=200,default = "")
    sa_last_name  = models.CharField(max_length=200,default = "")
    sa_first_name = models.CharField(max_length=200,default = "")
    sa_phone      = models.CharField(max_length=200,default = "")
    sa_email      = models.EmailField(max_length=200,default = "")
    sa_job_title  = models.CharField(max_length=200,default = "")
    sa_former_eseo = models.CharField(max_length=200,default = "")

    def __unicode__(self):
        return self.name

class Mentor(User):
    # table des maîtres d'apprentissage
    mt_cmp_siret = models.ForeignKey(Company, related_name="Mentor", on_delete=models.CASCADE, null=True)
    mt_phone       = models.CharField(max_length=200, default="")
    mt_job_title   = models.CharField(max_length=200, default="")
    mt_last_diploma = models.CharField(max_length=200, default="")
    mt_former_eseo = models.CharField(max_length=200, default="")
    
    def __unicode__(self):
        return self.name

class CompanyUserCompanyInfoAssociation(models.Model):
    # Association user entreprise => insertion des données du formulaire
    user_company_id = models.OneToOneField(User, on_delete=models.CASCADE, default="", related_name="association")
    company_siret = models.CharField(max_length=200, default="")
    opco_siret = models.CharField(max_length=200, default="")
    contactCompany_id = models.CharField(max_length=200, default="")
    
    def __unicode__(self):
        return self.name



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
