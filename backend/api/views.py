from rest_framework.response import Response
from rest_framework.decorators import api_view

from base.models import *
from base.utilities import Role
from .serializers import *
from .helper.tutor_team_helper import TutorTeamHelper


@api_view(["GET"])
def getMentor(request):
    mentorList = Mentor.objects.all()
    serializers = MentorSerializer(mentorList, many=True)
    return Response(serializers.data)


@api_view(["GET"])
def getTutor(request):
    tutorList = Tutor.objects.all()
    serializers = TutorSerializer(tutorList, many=True)
    return Response(serializers.data)


@api_view(["GET"])
def getApprentice(request):
    apprenticeList = Apprentice.objects.all()
    serializers = ApprenticeSerializer(apprenticeList, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def addMentor(request):
    serializer = MentorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
def getInterview(request):
    InterviewList = Interview.objects.all()
    serializers = InterviewSerializer(InterviewList, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def addInterview(request):
    serializer = InterviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
def getDeadline(request):
    DeadlineList = Deadline.objects.all()
    serializers = DeadlineSerializer(DeadlineList, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def addDeadline(request):
    serializer = DeadlineSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
def getYearGroup(request):
    YearGroupList = YearGroup.objects.all()
    serializers = YearGroupSerializer(YearGroupList, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def addYearGroup(request):
    serializer = YearGroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
def getTutorTeams(request):
    # récupération du contenu de la table TutorTeam
    TutorTeamList = TutorTeam.objects.all()
    serializers = TutorTeamSerializer(TutorTeamList, many=True)
    response = TutorTeamHelper.getAllTutorTeams(serializers)
    return Response(response)


@api_view(["POST"])
def addTutorTeams(request):
    serializer = TutorTeamSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["POST"])
def deleteYearGroupById(request):
    deleteYearGroup = YearGroup.objects.filter(id=request.data.get("id"))
    serializer = YearGroupSerializerDelete(data=request.data)
    print(request.data)
    if serializer.is_valid():
        deleteYearGroup.delete()
    return Response(serializer.data)


@api_view(["POST"])
def updateYearGroup(request):
    updateYearGroup = YearGroup.objects.get(pk=request.data.get("id"))
    updateYearGroup.worded = request.data.get("worded")
    updateYearGroup.beginDate = request.data.get("beginDate")
    serializer = YearGroupSerializer(data=request.data)
    if serializer.is_valid():
        updateYearGroup.save()
    print(serializer.errors)
    return Response(serializer.data)


@api_view(["GET"])
def getSemester(request):
    SemesterList = Semester.objects.all()
    serializers = SemesterSerializer(SemesterList, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def addSemester(request):
    serializer = SemesterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["POST"])
def deleteSemesterById(request):
    deleteSemester = Semester.objects.filter(id=request.data.get("id"))
    serializer = SemesterSerializerDelete(data=request.data)
    if serializer.is_valid():
        deleteSemester.delete()
    return Response(serializer.data)


@api_view(["POST"])
def updateSemester(request):
    updateSemester = Semester.objects.get(pk=request.data.get("id"))
    updateSemester.name = request.data.get("name")
    updateSemester.beginDate = request.data.get("beginDate")
    updateSemester.endDate = request.data.get("endDate")
    yearGroup = YearGroup.objects.get(pk=request.data.get("yearGroup"))
    updateSemester.yearGroup = yearGroup
    serializer = SemesterSerializer(updateSemester, data=request.data)
    if serializer.is_valid():
        updateSemester.save()
    print(serializer.errors)
    return Response(serializer.data)


@api_view(["GET"])
def getCompany(request):
    CompanyList = Company.objects.all()
    serializers = CompanySerializer(CompanyList, many=True)
    return Response(serializers.data)


@api_view(["GET"])
def getFormationCenter(request):
    FormationCenterList = FormationCenter.objects.all()
    serializers = FormationCenterSerializer(FormationCenterList, many=True)
    return Response(serializers.data)


@api_view(["GET"])
def getUser(request):
    UserList = User.objects.all()
    serializers = UserSerializer(UserList, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def deleteUserById(request):
    deleteUser = User.objects.filter(id=request.data.get("id"))
    serializer = UserSerializerDelete(data=request.data)
    print(request.data)
    if serializer.is_valid():
        deleteUser.delete()
    return Response(serializer.data)


@api_view(["POST"])
def updateUser(request):
    updateUserWillModify = User.objects.get(pk=request.data.get("id"))
    if updateUserWillModify.role == Role.MENTOR:
        updateUser = Mentor.objects.get(pk=request.data.get("id"))
    elif updateUserWillModify.role == Role.TUTOR:
        updateUser = Tutor.objects.get(pk=request.data.get("id"))
    elif updateUserWillModify.role == Role.APPRENTICE:
        updateUser = Apprentice.objects.get(pk=request.data.get("id"))
    updateUser.first_name = request.data.get("first_name")
    updateUser.last_name = request.data.get("last_name")
    updateUser.email = request.data.get("email")
    serializer = UserSerializer(updateUser, data=request.data)
    print(request.data)
    if serializer.is_valid():
        updateUser.save()
    print(serializer.errors)
    return Response(serializer.data)
