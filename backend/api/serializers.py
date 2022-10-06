from typing_extensions import Required
from rest_framework import serializers
from base.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #fields = '__all__'
        fields = ('last_name','first_name','password','email','enum')
        