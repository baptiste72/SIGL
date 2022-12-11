from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from authentication.models import User
from base.utilities import Role

from api.serializers import (
    ApprenticeSerializer,
    CompanySerializer,
    ContactCompanySerializer,
    OpcoSerializer,
    DeadlineSerializer,
    FormationCenterSerializer,
    InterviewSerializer,
    MentorSerializer,
    SemesterSerializer,
    TutorSerializer,
    TutorTeamSerializer,
    UserSerializer,
    YearGroupSerializer,
)
from base.models import (
    Apprentice,
    Company,
    ContactCompany,
    Opco,
    Deadline,
    FormationCenter,
    Interview,
    Mentor,
    Semester,
    Tutor,
    TutorTeam,
    YearGroup,
)

from .helper.tutor_team_helper import TutorTeamHelper


@api_view(["GET"])
def get_mentors(request):
    mentor_list = Mentor.objects.all()
    serializers = MentorSerializer(mentor_list, many=True)
    return Response(serializers.data)

@api_view(["POST"])
def add_mentor(request):
    serializer = MentorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_tutors(request):
    tutor_list = Tutor.objects.all()
    serializer = TutorSerializer(tutor_list, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(["GET"])
def get_apprentices(request):
    apprentice_list = Apprentice.objects.all()
    serializers = ApprenticeSerializer(apprentice_list, many=True)
    return Response(serializers.data)


@api_view(["GET"])
def get_interviews(request):
    interview_list = Interview.objects.all()
    serializers = InterviewSerializer(interview_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_interview(request):
    serializer = InterviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_deadlines(request):
    dealine_list = Deadline.objects.all()
    serializers = DeadlineSerializer(dealine_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_deadline(request):
    serializer = DeadlineSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_year_groups(request):
    yeargroup_list = YearGroup.objects.all()
    serializers = YearGroupSerializer(yeargroup_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_year_group(request):
    serializer = YearGroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_tutor_teams(request):
    # récupération du contenu de la table TutorTeam
    tutor_team_list = TutorTeam.objects.all()
    serializers = TutorTeamSerializer(tutor_team_list, many=True)
    response = TutorTeamHelper.getAllTutorTeams(serializers)
    return Response(response)


@api_view(["POST"])
def add_tutor_team(request):
    serializer = TutorTeamSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_year_group(request, id):
    year_group = YearGroup.objects.filter(id=id)
    year_group.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def update_year_group(request):
    year_group = YearGroup.objects.get(pk=request.data.get("id"))
    year_group.worded = request.data.get("worded")
    year_group.beginDate = request.data.get("beginDate")
    serializer = YearGroupSerializer(year_group, data=request.data)
    if serializer.is_valid():
        year_group.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_semesters(request):
    semester_list = Semester.objects.all()
    serializers = SemesterSerializer(semester_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_semester(request):
    serializer = SemesterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_semester(request, id):
    delete_semester = Semester.objects.filter(id=id)
    delete_semester.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def update_semester(request):
    semester = Semester.objects.get(pk=request.data.get("id"))
    semester.name = request.data.get("name")
    semester.beginDate = request.data.get("beginDate")
    semester.endDate = request.data.get("endDate")
    year_group = YearGroup.objects.get(pk=request.data.get("yearGroup"))
    semester.year_group = year_group
    serializer = SemesterSerializer(semester, data=request.data)
    if serializer.is_valid():
        semester.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_company(request):
    company_list = Company.objects.all()
    serializers = CompanySerializer(company_list, many=True)
    return Response(serializers.data)

@api_view(['POST'])
def add_company(request):
    serializer = CompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # Set the status code of the response to 201 (Created)
        response = Response(serializer.data)
        response.status_code = status.HTTP_201_CREATED
        return response
    else:
        # Return a response with a 400 status code (Bad Request) if the data is not valid
        response = Response(serializer.errors)
        response.status_code = status.HTTP_400_BAD_REQUEST
        return response
        

@api_view(['GET'])
def get_opco(request):
    CompanyList = Opco.objects.all()
    serializers = OpcoSerializer(OpcoList, many=True)
    return Response(serializers.data)


@api_view(['POST'])
def add_opco(request):
    serializer = OpcoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
def get_contact_companys(request):
    yeargroup_list = ContactCompany.objects.all()
    serializers = ContactCompanySerializer(yeargroup_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_contact_company(request):
    serializer = ContactCompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_formation_centers(request):
    formation_center_list = FormationCenter.objects.all()
    serializers = FormationCenterSerializer(formation_center_list, many=True)
    return Response(serializers.data)


@api_view(["GET"])
def get_user(request):
    user_list = User.objects.all()
    serializers = UserSerializer(user_list, many=True)
    return Response(serializers.data)


@api_view(["DELETE"])
def delete_user(request, id):
    user = User.objects.filter(id=id)
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def update_user(request):
    update_user_wWill_modify = User.objects.get(pk=request.data.get("id"))
    if update_user_wWill_modify.role == Role.MENTOR:
        update_user = Mentor.objects.get(pk=request.data.get("id"))
    elif update_user_wWill_modify.role == Role.TUTOR:
        update_user = Tutor.objects.get(pk=request.data.get("id"))
    elif update_user_wWill_modify.role == Role.APPRENTICE:
        update_user = Apprentice.objects.get(pk=request.data.get("id"))
    update_user.first_name = request.data.get("first_name")
    update_user.last_name = request.data.get("last_name")
    update_user.email = request.data.get("email")
    serializer = UserSerializer(update_user, data=request.data)
    print(request.data)
    if serializer.is_valid():
        update_user.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
