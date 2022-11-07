from rest_framework import serializers,fields
from base.models import * 


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class MentorSerializer(serializers.ModelSerializer):

    company = CompanySerializer(many=True)

    class Meta:
        model = Mentor
        fields = ('id', 'last_name', 'first_name',
                  'password', 'email', 'company')


class FormationCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormationCenter
        fields = '__all__'


class TeacherInChargeSerializer(serializers.ModelSerializer):

    formationCenter = FormationCenterSerializer(many=True)

    class Meta:
        model = TeacherInCharge
        fields = ('id', 'last_name', 'first_name',
                  'password', 'email', 'formationCenter')


class YearGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = YearGroup
        fields = '__all__'


class TraineeSerializer(serializers.ModelSerializer):

    yearGroup = YearGroupSerializer(many=True)

    class Meta:
        model = Trainee
        fields = ('id', 'last_name', 'first_name',
                  'password', 'email', 'yearGroup')


class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = '__all__'
        
class DeadlineSerializer(serializers.ModelSerializer):
    date = fields.DateField(input_formats=['%Y-%m-%dT%H:%M:%S.%fZ'])
    class Meta:
        model = Deadline
        fields = ('name', 'date',
                  'description')