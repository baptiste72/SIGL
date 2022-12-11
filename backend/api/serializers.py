from rest_framework import serializers, fields

from base.models import (
    Apprentice,
    Company,
    ContactCompany,
    Opco,
    Deadline,
    FormationCenter,
    Interview,
    Mentor,
    Semester,
    Tutor,
    TutorTeam,
    User,
    YearGroup,
)


class TutorTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorTeam
        fields = ("id", "mentor", "tutor", "apprentice")


class MentorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentor
        fields = (
            "id", 
            "mt_last_name",   
            "mt_first_name",  
            "mt_phone",       
            "mt_email",       
            "mt_job_title",   
            "mt_last_diploma",
            "mt_former_eseo",
        ) 


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = (
            "cmp_siret", 
            "cmp_address",
            "cmp_name",
            "cmp_employees",
            "cmp_cpne",
            "cmp_idcc",
            "cmp_convention",
            "cmp_naf_ape",
            "cmp_work_field",
            "cmp_phone", 
            "cmp_email", 
            "cmp_internat", 
        )

class OpcoSerializer(serializers.ModelSerializer):
    
    #mentor = MentorSerializer(many=True)
    class Meta:
        model = Opco
        fields = (
            "opco_siret",
            "company_id",
            "opco_name",
            "opco_address",
            "opco_phone",
            "opco_email",
        )

class ContactCompanySerializer(serializers.ModelSerializer):
    
    #mentor = MentorSerializer(many=True)
    class Meta:
        model = ContactCompany
        fields = (
            "company_siret"
            "ct_last_name",
            "ct_first_name",
            "ct_phone",
            "ct_email",
            "ct_job_title",
            "ct_former_eseo",
            "fi_last_name",
            "fi_first_name",
            "fi_phone",
            "fi_email",
            "fi_job_title",
            "fi_former_eseo",
            "sa_last_name",
            "sa_first_name",
            "sa_phone",
            "sa_email",
            "sa_job_title",
            "sa_former_eseo",
        )       

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = (
            "id",
            "last_name",
            "first_name",
            "password",
            "email",
            "formationCenter",
        )


class FormationCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormationCenter
        fields = (
            "id",
            "worded",
            "address",
        )


class YearGroupSerializer(serializers.ModelSerializer):
    beginDate = fields.DateTimeField(input_formats=["%Y-%m-%dT%H:%M:%S.%fZ"])

    class Meta:
        model = YearGroup
        fields = ("id", "worded", "beginDate")


class ApprenticeSerializer(serializers.ModelSerializer):
    yearGroup = YearGroupSerializer()

    class Meta:
        model = Apprentice
        fields = ("id", "last_name", "first_name", "password", "email", "yearGroup")


class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = "__all__"


class DeadlineSerializer(serializers.ModelSerializer):
    date = fields.DateField(input_formats=["%Y-%m-%dT%H:%M:%S.%fZ"])

    class Meta:
        model = Deadline
        fields = ("name", "date", "description")


class SemesterSerializer(serializers.ModelSerializer):
    beginDate = fields.DateTimeField()
    endDate = fields.DateTimeField()

    class Meta:
        model = Semester
        fields = ("id", "name", "beginDate", "endDate", "yearGroup")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "role",
        )


class UserSerializerDelete(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id",)
