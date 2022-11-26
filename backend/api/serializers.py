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
    YearGroup,
)


class TutorTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorTeam
        fields = ("id", "mentor", "tutor", "apprentice")


class MentorSerializer(serializers.ModelSerializer):

    tutorTeam = TutorTeamSerializer(many=True)

    class Meta:
        model = Mentor
        fields = (
            "id",
            "last_name",
            "first_name",
            "password",
            "email",
            "company",
            "tutorTeam",
        )


class CompanySerializer(serializers.ModelSerializer):

    mentor = MentorSerializer(many=True)

    class Meta:
        model = Company
        fields = "__all__"


class TutorSerializer(serializers.ModelSerializer):

    tutorTeam = TutorTeamSerializer(many=True)

    class Meta:
        model = Tutor
        fields = (
            "id",
            "last_name",
            "first_name",
            "password",
            "email",
            "formationCenter",
            "tutorTeam",
        )


class FormationCenterSerializer(serializers.ModelSerializer):

    tutor = TutorSerializer(many=True)

    class Meta:
        model = FormationCenter
        fields = "__all__"


class YearGroupSerializer(serializers.ModelSerializer):
    beginDate = fields.DateTimeField(input_formats=["%Y-%m-%dT%H:%M:%S.%fZ"])

    class Meta:
        model = YearGroup
        fields = ("id", "worded", "beginDate")


class YearGroupSerializerDelete(serializers.ModelSerializer):
    class Meta:
        model = YearGroup
        fields = ("id",)


class ApprenticeSerializer(serializers.ModelSerializer):
    yearGroup = YearGroupSerializer(many=True)
    tutorTeam = TutorTeamSerializer(many=True)

    class Meta:
        model = Apprentice
        fields = (
            "id",
            "last_name",
            "first_name",
            "password",
            "email",
            "yearGroup",
            "tutorTeam",
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


class SemesterSerializerDelete(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ("id",)


class SemesterSerializer(serializers.ModelSerializer):
    beginDate = fields.DateTimeField()
    endDate = fields.DateTimeField()

    class Meta:
        model = Semester
        fields = ("id", "name", "beginDate", "endDate", "yearGroup")
