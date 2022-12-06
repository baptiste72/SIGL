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
    tutor_team = TutorTeamSerializer(many=True)

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
    class Meta:
        model = Company
        fields = (
            "id",
            "worded",
            "address",
        )


class TutorSerializer(serializers.ModelSerializer):
    tutor_team = TutorTeamSerializer(many=True)

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
    class Meta:
        model = FormationCenter
        fields = (
            "id",
            "worded",
            "address",
        )


class YearGroupSerializer(serializers.ModelSerializer):
    # FIXME: Reprendre cela, le champ begin_date est perdu
    begin_date = fields.DateTimeField(
        input_formats=["%Y-%m-%dT%H:%M:%S.%fZ"], source="beginDate"
    )

    class Meta:
        model = YearGroup
        fields = ("id", "worded", "begin_date")


class YearGroupSerializerDelete(serializers.ModelSerializer):
    class Meta:
        model = YearGroup
        fields = ("id",)


class ApprenticeSerializer(serializers.ModelSerializer):
    year_group = YearGroupSerializer(many=True)
    tutor_team = TutorTeamSerializer(many=True)

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
    begin_date = serializers.DateTimeField(source="beginDate")
    end_date = serializers.DateTimeField(source="endDate")

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
