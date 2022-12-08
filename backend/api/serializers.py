from rest_framework import serializers, fields

from base.models import (
    Apprentice,
    Company,
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
        fields = ("id", "last_name", "first_name", "password", "email", "company")


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
        # pylint: disable=duplicate-code
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
