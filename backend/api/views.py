from re import I
from rest_framework.response import Response
from rest_framework.decorators import api_view

from base.models import *
from .serializers import *
import json


@api_view(['GET'])
def getMentor(request):
    mentorList = Mentor.objects.all()
    serializers = MentorSerializer(mentorList, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def getTeacherInCharge(request):
    teacherInChargeList = TeacherInCharge.objects.all()
    serializers = TeacherInChargeSerializer(teacherInChargeList, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def getTrainee(request):
    traineeList = Trainee.objects.all()
    serializers = TraineeSerializer(traineeList, many=True)
    return Response(serializers.data)


@api_view(['POST'])
def addMentor(request):
    serializer = MentorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def getInterview(request):
    InterviewList = Interview.objects.all()
    serializers = InterviewSerializer(InterviewList, many=True)
    return Response(serializers.data)


@api_view(['POST'])
def addInterview(request):
    serializer = InterviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def getDeadline(request):
    DeadlineList = Deadline.objects.all()
    serializers = DeadlineSerializer(DeadlineList, many=True)
    return Response(serializers.data)


@api_view(['POST'])
def addDeadline(request):
    serializer = DeadlineSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def getTutorTeam(request):
    # récupération du contenu de la table TutorTeam
    TutorTeamList = TutorTeam.objects.all()    
    serializers = TutorTeamSerializer(TutorTeamList, many=True)

    # boucle permettant de récupérer la totalité des équipes tutorales
    response = []
    for data in range(len(serializers.data)):
        # récupération des clées étrangères
        teacherInChargeID = serializers.data[data]['teacherInCharge']
        mentorID = serializers.data[data]['mentor']
        traineeID = serializers.data[data]['trainee']

        # récupération des données liées aux clées étrangères
        # on aurait pu le faire en une requête dans la base User 
        # mais d'un point de vue métier ça n'a pas le même sens
        teacherInCharge = TeacherInCharge.objects.filter(pk=teacherInChargeID).values('first_name', 'last_name', 'email')
        mentor = Mentor.objects.filter(pk=mentorID).values('first_name', 'last_name', 'email')
        trainee = Trainee.objects.filter(pk=traineeID).values('first_name', 'last_name', 'email')

        # fabriaction d'un json object equipe tutorale contenant réellement les infos
        context = {            
            'mentor': mentor,
            'trainee': trainee,
            'teacherInCharge': teacherInCharge
        }
        
        # ajout de l'équipe tutorale récupérée ou autre équipe tutorale
        response.append(context)
        
    # print(response)
    return Response(response)
