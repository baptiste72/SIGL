from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentication.models import User
from base.utilities import Role

from api.serializers import (
    ApprenticeSerializer,
    CompanySerializer,
    DeadlineSerializer,
    FormationCenterSerializer,
    InterviewSerializer,
    MentorSerializer,
    SemesterSerializer,
    SemesterSerializerDelete,
    TutorSerializer,
    TutorTeamSerializer,
    UserSerializer,
    UserSerializerDelete,
    YearGroupSerializer,
    YearGroupSerializerDelete,
)
from base.models import (
    Apprentice,
    Company,
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
def get_mentor(request):
    mentor_list = Mentor.objects.all()
    serializers = MentorSerializer(mentor_list, many=True)
    return Response(serializers.data)


@api_view(["GET"])
def get_tutor(request):
    tutor_list = Tutor.objects.all()
    serializers = TutorSerializer(tutor_list, many=True)
    return Response(serializers.data)


@api_view(["GET"])
def get_apprentice(request):
    apprentice_list = Apprentice.objects.all()
    serializers = ApprenticeSerializer(apprentice_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_mentor(request):
    serializer = MentorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
def get_interview(request):
    interview_list = Interview.objects.all()
    serializers = InterviewSerializer(interview_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_interview(request):
    serializer = InterviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
def get_deadline(request):
    dealine_list = Deadline.objects.all()
    serializers = DeadlineSerializer(dealine_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_deadline(request):
    serializer = DeadlineSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
def get_year_group(request):
    yeargroup_list = YearGroup.objects.all()
    serializers = YearGroupSerializer(yeargroup_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_year_group(request):
    serializer = YearGroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
def get_tutor_teams(request):
    # récupération du contenu de la table TutorTeam
    tutor_team_list = TutorTeam.objects.all()
    serializers = TutorTeamSerializer(tutor_team_list, many=True)
    response = TutorTeamHelper.getAllTutorTeams(serializers)
    return Response(response)


@api_view(["POST"])
def add_tutor_teams(request):
    serializer = TutorTeamSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["POST"])
def delete_year_group_by_id(request):
    year_group = YearGroup.objects.filter(id=request.data.get("id"))
    serializer = YearGroupSerializerDelete(data=request.data)
    print(request.data)
    if serializer.is_valid():
        year_group.delete()
    return Response(serializer.data)


@api_view(["POST"])
def update_year_group(request):
    year_group = YearGroup.objects.get(pk=request.data.get("id"))
    year_group.worded = request.data.get("worded")
    year_group.begin_date = request.data.get("beginDate")
    serializer = YearGroupSerializer(data=request.data)
    if serializer.is_valid():
        year_group.save()
    print(serializer.errors)
    return Response(serializer.data)


@api_view(["GET"])
def get_semester(request):
    semester_list = Semester.objects.all()
    serializers = SemesterSerializer(semester_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_semester(request):
    serializer = SemesterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["POST"])
def delete_semester_by_id(request):
    delete_semester = Semester.objects.filter(id=request.data.get("id"))
    serializer = SemesterSerializerDelete(data=request.data)
    if serializer.is_valid():
        delete_semester.delete()
    return Response(serializer.data)


@api_view(["POST"])
def update_semester(request):
    semester = Semester.objects.get(pk=request.data.get("id"))
    semester.name = request.data.get("name")
    semester.begin_date = request.data.get("beginDate")
    semester.end_date = request.data.get("endDate")
    year_group = YearGroup.objects.get(pk=request.data.get("yearGroup"))
    semester.yeargroup = year_group
    serializer = SemesterSerializer(data=request.data)
    if serializer.is_valid():
        semester.save()
    print(serializer.errors)
    return Response(serializer.data)


@api_view(["GET"])
def get_company(request):
    company_list = Company.objects.all()
    serializers = CompanySerializer(company_list, many=True)
    return Response(serializers.data)


@api_view(["GET"])
def get_formation_center(request):
    formation_center_list = FormationCenter.objects.all()
    serializers = FormationCenterSerializer(formation_center_list, many=True)
    return Response(serializers.data)


@api_view(["GET"])
def get_user(request):
    user_list = User.objects.all()
    serializers = UserSerializer(user_list, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def delete_user_by_id(request):
    delete_user = User.objects.filter(id=request.data.get("id"))
    serializer = UserSerializerDelete(data=request.data)
    print(request.data)
    if serializer.is_valid():
        delete_user.delete()
    return Response(serializer.data)


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
    print(serializer.errors)
    return Response(serializer.data)
