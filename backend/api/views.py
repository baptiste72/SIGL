from re import I
from rest_framework.response import Response
from rest_framework.decorators import api_view

from base.models import *
from .serializers import *
from .helper.tutor_team_helper import TutorTeamHelper


@api_view(['GET'])
def getMentor(request):
    mentorList = Mentor.objects.all()
    serializers = MentorSerializer(mentorList, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def getTutor(request):
    tutorList = Tutor.objects.all()
    serializers = TutorSerializer(tutorList, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def getApprentice(request):
    apprenticeList = Apprentice.objects.all()
    serializers = ApprenticeSerializer(apprenticeList, many=True)
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
def getYearGroup(request):
    YearGroupList = YearGroup.objects.all()
    serializers = YearGroupSerializer(YearGroupList, many=True)
    return Response(serializers.data)

@api_view(['POST'])
def addYearGroup(request):
    serializer = YearGroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def getTutorTeam(request):
    # récupération du contenu de la table TutorTeam
    TutorTeamList = TutorTeam.objects.all()    
    serializers = TutorTeamSerializer(TutorTeamList, many=True)
    response = TutorTeamHelper.getAllTutorTeam(serializers)
    return Response(response)

@api_view(['POST'])
def addTutorTeam(request):
    serializer = TutorTeamSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def deleteYearGroupById(request):
    deleteYearGroup = YearGroup.objects.filter(id=request.data.get('id'))
    serializer = YearGroupSerializerDelete(data=request.data)
    if serializer.is_valid():
        deleteYearGroup.delete()
    return Response(serializer.data)
