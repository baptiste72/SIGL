from django.core.validators import MaxValueValidator, MinValueValidator
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
    cmp_internat = models.CharField(max_length=20, default="Non")


class Opco(models.Model):
    opco_siret = models.CharField(max_length=200, primary_key=True)
    opco_cmp_siret = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    opco_name = models.CharField(max_length=200)
    opco_address = models.CharField(max_length=200)
    opco_phone = models.CharField(max_length=200)
    opco_email = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class ContactCompany(models.Model):
    ct_cmp_siret = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    ct_last_name = models.CharField(max_length=200, default="")
    ct_first_name = models.CharField(max_length=200, default="")
    ct_phone = models.CharField(max_length=200, default="")
    ct_email = models.EmailField(max_length=200, default="")
    ct_job_title = models.CharField(max_length=200, default="")
    ct_former_eseo = models.CharField(max_length=200, default="")
    fi_last_name = models.CharField(max_length=200, default="")
    fi_first_name = models.CharField(max_length=200, default="")
    fi_phone = models.CharField(max_length=200, default="")
    fi_email = models.EmailField(max_length=200, default="")
    fi_job_title = models.CharField(max_length=200, default="")
    fi_former_eseo = models.CharField(max_length=200, default="")
    sa_last_name = models.CharField(max_length=200, default="")
    sa_first_name = models.CharField(max_length=200, default="")
    sa_phone = models.CharField(max_length=200, default="")
    sa_email = models.EmailField(max_length=200, default="")
    sa_job_title = models.CharField(max_length=200, default="")
    sa_former_eseo = models.CharField(max_length=200, default="")

    def __str__(self):
        return self.name


class Mentor(User):
    # table des maîtres d'apprentissage
    mt_cmp_siret = models.ForeignKey(
        Company, related_name="Mentor", on_delete=models.CASCADE, null=True
    )
    mt_phone = models.CharField(max_length=200, default="")
    mt_job_title = models.CharField(max_length=200, default="")
    mt_last_diploma = models.CharField(max_length=200, default="")
    mt_former_eseo = models.CharField(max_length=200, default="")

    def __str__(self):
        return self.name


class CompanyUser(User):
    # Association user entreprise => insertion des données du formulaire
    company_siret = models.CharField(max_length=200, null=True, blank=True)
    opco_siret = models.CharField(max_length=200, null=True, blank=True)
    contactCompany_id = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name


class YearGroup(models.Model):
    # tables des promotions
    worded = models.CharField(max_length=200)
    beginDate = models.DateTimeField(default=timezone.now)


class ApprenticeInfo(models.Model):
    # table des infos de l'apprenti (missions)
    app_last_name = models.CharField(max_length=200)
    app_first_name = models.CharField(max_length=200)
    app_job_title = models.CharField(max_length=200)
    app_description = models.CharField(max_length=1000)
    app_phone = models.CharField(max_length=20)
    app_collective_convention = models.CharField(max_length=200)
    app_working_hours = models.CharField(max_length=10)
    app_comp_name = models.CharField(max_length=200, null=True)
    app_location = models.CharField(max_length=200, null=True)
    app_siret = models.CharField(max_length=200)
    app_is_validate = models.BooleanField(default=False)


class Apprentice(User):
    # table des apprentis
    yearGroup = models.ForeignKey(
        YearGroup, related_name="Apprentice", on_delete=models.CASCADE, null=True
    )
    apprentice_info = models.ForeignKey(
        ApprenticeInfo, on_delete=models.CASCADE, null=True
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
    file_name = models.CharField(max_length=200, unique=True)
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


class Evaluations(models.Model):
    file_name = models.CharField(max_length=200, unique=True)
    modification_date = models.DateTimeField()
    status = models.CharField(max_length=10)
    type = models.CharField(max_length=50)
    user = models.ForeignKey(
        User, related_name="evaluation_user", on_delete=models.CASCADE, null=True
    )
    owner = models.ForeignKey(
        User, related_name="owner", on_delete=models.CASCADE, null=True
    )
    yearGroup = models.ForeignKey(
        YearGroup,
        related_name="evaluation_yearGroup",
        on_delete=models.CASCADE,
        null=True,
    )
    note = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(20)], null=True
    )
