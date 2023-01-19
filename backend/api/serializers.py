from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers, fields
from base.models import (
    Apprentice,
    Company,
    CompanyUser,
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
    Note,
    Document,
    Evaluations,
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
            "last_name",
            "first_name",
            "password",
            "email",
            "role",
            "mt_cmp_siret",
            "mt_phone",         
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
            "opco_cmp_siret",
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
            "ct_cmp_siret",
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
        # pylint: disable=duplicate-code
        model = Tutor
        fields = (
            "id",
            "last_name",
            "first_name",
            "password",
            "email",
            "role",
            "formationCenter",
        )


class FormationCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormationCenter
        fields = (
            "id",
            "worded",
            "city",
            "postal_code",
            "address",
        )


class YearGroupSerializer(serializers.ModelSerializer):
    beginDate = fields.DateTimeField()

    class Meta:
        model = YearGroup
        fields = ("id", "worded", "beginDate")


class ApprenticeSerializer(serializers.ModelSerializer):
    yearGroup = YearGroupSerializer()

    class Meta:
        model = Apprentice
        fields = (
            "id",
            "last_name",
            "first_name",
            "password",
            "email",
            "role",
            "yearGroup",
        )


class ApprenticeRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apprentice
        fields = (
            "id",
            "last_name",
            "first_name",
            "password",
            "email",
            "role",
            "yearGroup",
        )


class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = "__all__"


class DeadlineSerializer(serializers.ModelSerializer):
    date = fields.DateTimeField(input_formats=["%Y-%m-%dT%H:%M:%S.%fZ"])

    class Meta:
        model = Deadline
        fields = ("id","name", "date", "description")


class SemesterSerializer(serializers.ModelSerializer):
    beginDate = fields.DateTimeField()
    endDate = fields.DateTimeField()

    class Meta:
        model = Semester
        fields = ("id", "name", "beginDate", "endDate", "yearGroup")


class SemesterSerializerDelete(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ("id",)


class NoteSerializer(serializers.ModelSerializer):
    beginDate = fields.DateTimeField()
    endDate = fields.DateTimeField()
    
    class Meta:
        model = Note
        fields = '__all__'
     
class TreeNoteSerializer(serializers.ModelSerializer):
    beginDate = fields.DateTimeField()
    endDate = fields.DateTimeField()

    class Meta:
        model = Note
        fields = '__all__'


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


class CompanyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyUser
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
            "role",
            "company_siret",
            "opco_siret",
            "contactCompany_id",
        )


class RegisterUserSerializer(serializers.ModelSerializer):
    # pylint: disable=duplicate-code
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "password", "role", "token"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


# pylint: disable=abstract-method
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value
    
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = (
            "id", 
            "name", 
            "file_name", 
            "user", 
            "yearGroup",
        )    

class EvaluationSerializer(serializers.Service):
    
    class Meta:
        model = Evaluations
        fields = (
            "id", 
            "file_name", 
            "modification_date",
            "status",
            "type",
            "user",
            "yearGroup",
    )
