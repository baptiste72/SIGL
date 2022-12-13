from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.http import Http404
from .helpers.tutor_team_helper import TutorTeamHelper
from .helpers.data_treatement import data_treatement
from authentication.models import User
from base.utilities import Role

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
    Note,
)

from api.serializers import (
    ApprenticeSerializer,
    CompanySerializer,
    CompanyUserSerializer,
    DeadlineSerializer,
    FormationCenterSerializer,
    InterviewSerializer,
    MentorSerializer,
    SemesterSerializer,
    NoteSerializer,
    TreeNoteSerializer,
    TutorSerializer,
    TutorTeamSerializer,
    UserSerializer,
    YearGroupSerializer,
    ChangePasswordSerializer,
    RegisterUserSerializer,
    ApprenticeRoleSerializer,
)
from api.helpers.password_helper import PasswordHelper
from api.helpers.tutor_team_helper import TutorTeamHelper


@api_view(["GET"])
def get_mentors(request):
    mentor_list = Mentor.objects.all()
    serializers = MentorSerializer(mentor_list, many=True)
    return Response(serializers.data)


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


@api_view(["POST"])
def add_mentor(request):
    serializer = MentorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class interviews_by_userID(APIView):
    def get(self, request, userId):
        interview_list = Interview.objects.filter(userId=userId)
        serializers = InterviewSerializer(interview_list, many=True)
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


@api_view(["GET", "DELETE"])
def api_interview(request, id):
    try:
        InterviewId = Interview.objects.get(pk=id)
    except Interview.DoesNotExist:
        return JsonResponse(
            {"message": "the Interview does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        interview_serializer = NoteSerializer(InterviewId)
        return JsonResponse(interview_serializer.data)
    elif request.method == "DELETE":
        InterviewId.delete()
        return JsonResponse(
            {"message": "the Interview was deleted successfully!"},
            status=status.HTTP_204_NO_CONTENT,
        )


@api_view(["POST"])
def update_interview(request):
    try:
        print(request.data)
        id = request.data["id"]
        InterviewId = Interview.objects.get(pk=id)
    except Note.DoesNotExist:
        return JsonResponse(
            {"message": "the Interview does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = NoteSerializer(instance=InterviewId, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    else:
        return JsonResponse(
            {"message": "the Interview is not valid"}, status=status.HTTP_404_NOT_FOUND
        )


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


@api_view(["GET", "DELETE"])
def api_deadline(request, id):
    try:
        DeadlineId = Deadline.objects.get(pk=id)
    except Deadline.DoesNotExist:
        return JsonResponse(
            {"message": "the Deadline does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        deadline_serializer = DeadlineSerializer(DeadlineId)
        return JsonResponse(deadline_serializer.data)
    elif request.method == "DELETE":
        DeadlineId.delete()
        return JsonResponse(
            {"message": "the Deadline was deleted successfully!"},
            status=status.HTTP_204_NO_CONTENT,
        )

class deadlines_by_userID(APIView):
    def get(self, request, userId):
        deadline_list = Deadline.objects.filter(userId=userId)
        serializers = DeadlineSerializer(deadline_list, many=True)
        return Response(serializers.data)

@api_view(["POST"])
def update_deadline(request):
    try:
        print(request.data)
        id = request.data["id"]
        DeadlineId = Deadline.objects.get(pk=id)
    except Note.DoesNotExist:
        return JsonResponse(
            {"message": "the Deadline does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = NoteSerializer(instance=DeadlineId, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    else:
        return JsonResponse(
            {"message": "the Deadline is not valid"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET"])
def get_notes(request):
    NoteList = Note.objects.all()
    serializers = NoteSerializer(NoteList, many=True)
    return Response(serializers.data)





@api_view(["POST"])
def add_note(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    # print(serializer.errors)
    return Response(serializer.data)


@api_view(["GET", "DELETE"])
def api_note(request, id):
    try:
        NoteId = Note.objects.get(pk=id)
    except Note.DoesNotExist:
        return JsonResponse(
            {"message": "the note does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        note_serializer = NoteSerializer(NoteId)
        return JsonResponse(note_serializer.data)
    elif request.method == "DELETE":
        NoteId.delete()
        return JsonResponse(
            {"message": "the note was deleted successfully!"},
            status=status.HTTP_204_NO_CONTENT,
        )

class api_note_by_userID(APIView):
    def get(self, request, userId):
        NoteList = Note.objects.filter(userId=userId)
        serializers = NoteSerializer(NoteList, many=True)
        return Response(serializers.data)
    
# renvois les données en Tree afin d'afficher l'aborescence des notes
class tree_note(APIView):
    def get(self, request, userId):
        NoteList = Note.objects.filter(userId=userId)
        serializers = TreeNoteSerializer(NoteList, many=True)
        data = data_treatement.data_treatement.treeNotes(serializers.data)
        return Response(data)

@api_view(["POST"])
def update_note(request):
    try:
        print(request.data)
        id = request.data["id"]
        NoteId = Note.objects.get(pk=id)
    except Note.DoesNotExist:
        return JsonResponse(
            {"message": "the note does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = NoteSerializer(instance=NoteId, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    else:
        return JsonResponse(
            {"message": "the note is not valid"}, status=status.HTTP_404_NOT_FOUND
        )


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


@api_view(["DELETE"])
def delete_year_group(request, pk):
    year_group = YearGroup.objects.get(id=pk)
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
def delete_semester(request, pk):
    semester = Semester.objects.get(id=pk)
    semester.delete()
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


class FormationCenterList(APIView):
    def get(self, request):
        formation_center_list = FormationCenter.objects.all()
        serializer = FormationCenterSerializer(formation_center_list, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FormationCenterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FormationCenterDetail(APIView):
    def get_object(self, pk):
        try:
            return FormationCenter.objects.get(pk=pk)
        except FormationCenter.DoesNotExist as exc:
            raise Http404 from exc

    def get(self, request, pk):
        formation_center = self.get_object(pk)
        serializer = FormationCenterSerializer(formation_center, many=True)
        return Response(serializer.data)

    def put(self, request, pk):
        formation_center = self.get_object(pk)
        formation_center.worded = request.data.get("worded")
        formation_center.city = request.data.get("city")
        formation_center.postal_code = request.data.get("postal_code")
        formation_center.address = request.data.get("address")
        serializer = FormationCenterSerializer(formation_center, data=request.data)
        print(request.data)
        if serializer.is_valid():
            formation_center.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        formation_center = self.get_object(pk)
        formation_center.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserDetail(APIView):
    def get_object(self, pk, class_name):
        try:
            return class_name.objects.get(pk=pk)
        except class_name.DoesNotExist as exc:
            raise Http404 from exc

    def get(self, request, pk):
        user = self.get_object(pk, User)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = self.get_object(pk, User)
        if user.role == Role.MENTOR:
            user = self.get_object(pk, Mentor)
        elif user.role == Role.TUTOR:
            user = self.get_object(pk, User)
        elif user.role == Role.APPRENTICE:
            user = self.get_object(pk, Apprentice)
        user.first_name = request.data.get("first_name")
        user.last_name = request.data.get("last_name")
        user.email = request.data.get("email")
        serializer = UserSerializer(user, data=request.data)
        print(request.data)
        if serializer.is_valid():
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_object(pk, User)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserList(APIView):
    def get(self, request):
        user_list = User.objects.all()
        serializers = UserSerializer(user_list, many=True)
        return Response(serializers.data)

    def post(self, request):
        request.data["password"] = PasswordHelper.generate_password()

        if request.data["role"] == Role.APPRENTICE.value:
            serializer = ApprenticeRoleSerializer(data=request.data)
        elif request.data["role"] == Role.TUTOR.value:
            serializer = TutorSerializer(data=request.data)
        elif request.data["role"] == Role.MENTOR.value:
            serializer = MentorSerializer(data=request.data)
        elif request.data["role"] == Role.COMPANY.value:
            serializer = CompanyUserSerializer(data=request.data)
        else:
            serializer = RegisterUserSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class TutorTeamDetail(APIView):
    def get_object(self, pk):
        try:
            return TutorTeam.objects.get(pk=pk)
        except TutorTeam.DoesNotExist as exc:
            raise Http404 from exc

    def get(self, request, pk):
        tutor_team = self.get_object(pk)
        serializer = TutorTeamSerializer(tutor_team)
        return Response(serializer.data)

    def put(self, request, pk):
        tutor_team = self.get_object(pk)
        serializer = TutorTeamSerializer(tutor_team, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        tutor_team = self.get_object(pk)
        tutor_team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TutorTeamList(APIView):
    def get(self, request):
        tutor_team_list = TutorTeam.objects.all()
        serializers = TutorTeamSerializer(tutor_team_list, many=True)
        response = TutorTeamHelper.getAllTutorTeams(serializers)
        return Response(response)

    def post(self, request):
        serializer = TutorTeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserChangePasswordView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def __init__(self):
        self.object = self.get_object()

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            # Vérification de l'ancien mot de passe
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": ["Mauvais mot de passe."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # La méthode hash aussi le nouveau password
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()

            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
