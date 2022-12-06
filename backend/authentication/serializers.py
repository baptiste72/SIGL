from rest_framework import serializers

from base.models import Apprentice, Mentor, Tutor
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "password", "role"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


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


class TutorRoleSerializer(serializers.ModelSerializer):
    class Meta:
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


class MentorRoleSerializer(serializers.ModelSerializer):
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
