from rest_framework import serializers,fields
from base.models import * 

class TutorTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorTeam
        fields = ('id', 'mentor', 'teacherInCharge', 'trainee')
        
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class MentorSerializer(serializers.ModelSerializer):

    company = CompanySerializer(many=True)
    tutorTeam = TutorTeamSerializer(many=True)

    class Meta:
        model = Mentor
        fields = ('id', 'last_name', 'first_name',
                  'password', 'email', 'company', 'tutorTeam')


class FormationCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormationCenter
        fields = '__all__'


class TeacherInChargeSerializer(serializers.ModelSerializer):

    formationCenter = FormationCenterSerializer(many=True)
    tutorTeam = TutorTeamSerializer(many=True)
    class Meta:
        model = TeacherInCharge
        fields = ('id', 'last_name', 'first_name',
                  'password', 'email', 'formationCenter', 'tutorTeam')


class YearGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = YearGroup
        fields = '__all__'


class TraineeSerializer(serializers.ModelSerializer):

    yearGroup = YearGroupSerializer(many=True)
    tutorTeam = TutorTeamSerializer(many=True)

    class Meta:
        model = Trainee
        fields = ('id', 'last_name', 'first_name',
                  'password', 'email', 'yearGroup', 'tutorTeam')


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
        

