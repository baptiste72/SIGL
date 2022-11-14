from re import I
from rest_framework.response import Response
from rest_framework.decorators import api_view

from base.models import *
from .serializers import *


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
def getNote(request):
    NoteList = Note.objects.all()
    serializers = NoteSerializer(NoteList, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def treeNote(request):
    NoteList = Note.objects.all()
    serializers = NoteSerializer(NoteList, many=True)
    print(serializers.data)
    return Response(serializers.data)

@api_view(['POST'])
def addNote(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
