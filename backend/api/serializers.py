from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers, fields
from base.models import (
    Apprentice,
    Company,
    CompanyUser,
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
            "last_name",
            "first_name",
            "password",
            "email",
            "role",
            "company",
        )


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = (
            "id",
            "worded",
            "address",
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
