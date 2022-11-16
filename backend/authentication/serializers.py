from rest_framework import serializers

from base.utilities import Role
from base.models import Apprentice, Mentor, Tutor
from .models import User


class UserSerializer(serializers.ModelSerializer):

    role: Role = serializers.SerializerMethodField('get_role')

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',  'email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def get_role(self, obj):
        # On parcourt les tables de users et cherche une correspondance
        apprentice = Apprentice.objects.filter(id=obj.id).first()
        tutor = Tutor.objects.filter(id=obj.id).first()
        mentor = Mentor.objects.filter(id=obj.id).first()

        role: Role = Role.UNKNOWN

        if (apprentice != None):
            role = Role.APPRENTICE
        elif (tutor != None):
            role = Role.TUTOR
        elif (mentor != None):
            role = Role.MENTOR

        return role.value
