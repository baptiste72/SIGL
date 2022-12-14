import os
from django.http import FileResponse, Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from authentication.models import User
from base.utilities import Role
from base.models import (
    Apprentice,
    Company,
    CompanyUser,
    Deadline,
    FormationCenter,
    Interview,
    Mentor,
    Semester,
    Tutor,
    TutorTeam,
    YearGroup,
    Note,
    Document,
    Opco,
    ContactCompany,
)

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
    NoteSerializer,
    TreeNoteSerializer,
    TutorSerializer,
    TutorTeamSerializer,
    UserSerializer,
    YearGroupSerializer,
    ChangePasswordSerializer,
    RegisterUserSerializer,
    ApprenticeRoleSerializer,
    DocumentSerializer,
    CompanyUserSerializer,
)
from api.helpers.tutor_team_helper import TutorTeamHelper
from api.helpers.password_helper import PasswordHelper
from api.helpers.data_treatement import DataTreatement
from api.helpers.sftp_helper import SftpHelper
from api.helpers.semester_helper import SemesterHelper


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
    return Response(serializer.data)


@api_view(["POST"])
def add_mentor(request):
    serializer = MentorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ApprenticeList(generics.ListCreateAPIView):
    queryset = Apprentice.objects.all()
    serializer_class = ApprenticeSerializer


class ApprenticeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Apprentice.objects.all()
    serializer_class = ApprenticeSerializer

class DeadlinesByUserId(APIView):
    def get(self, request, pk):
        deadline_list = Deadline.objects.filter(apprentice_id=pk)
        serializers = DeadlineSerializer(deadline_list, many=True)
        return Response(serializers.data)


class DeadlinesList(generics.ListCreateAPIView):
    queryset = Deadline.objects.all()
    serializer_class = DeadlineSerializer


class DeadlinesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Deadline.objects.all()
    serializer_class = DeadlineSerializer


class NotesList(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class NotesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class ApiNoteByUserId(APIView):
    def get(self, request, pk):
        note_list = Note.objects.filter(apprentice_id=pk)
        serializers = NoteSerializer(note_list, many=True)
        return Response(serializers.data)


# renvois les données en Tree afin d'afficher l'aborescence des notes
class TreeNote(APIView):
    def get(self, request, pk):
        notes = Note.objects.filter(apprentice_id=pk)
        serializers = TreeNoteSerializer(notes, many=True)
        formatted_data = SemesterHelper.getSemestersNames(serializers)
        data = DataTreatement.treeNotes(formatted_data)
        return Response(data)


class InterviewsAttendees(APIView):
    def get(self, request, pk):
        attendee_list = Interview.objects.filter(interview_id=pk)
        serializers = UserSerializer(attendee_list, many=True)
        return Response(serializers.data)


class InterviewsByUserId(APIView):
    def get(self, request, pk):
        interview_list = Interview.objects.filter(apprentice_id=pk)
        serializers = InterviewSerializer(interview_list, many=True)
        return Response(serializers.data)


class InterviewList(generics.ListCreateAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer


class InterviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer


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


class SemesterByYearGroup(APIView):
    def get(self, request, pk):
        semesters = Semester.objects.filter(yearGroup_id=pk)
        serializers = SemesterSerializer(semesters, many=True)
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


class CompanyDetail(APIView):
    def get_object(self, pk):
        try:
            return Company.objects.get(pk=pk)
        except Company.DoesNotExist as exc:
            raise Http404 from exc

    def get(self, request, pk):
        company = self.get_object(pk)
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    def put(self, request, pk):
        company = self.get_object(pk)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        company = self.get_object(pk)
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CompanyList(APIView):
    def get(self, request):
        company_list = Company.objects.all()
        serializer = CompanySerializer(company_list, many=True)
        return Response(serializer.data)
    

    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompanyUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CompanyUser.objects.all()
    serializer_class = CompanyUserSerializer
  
class CompanyUserList(generics.ListCreateAPIView):
    queryset = CompanyUser.objects.all()
    serializer_class = CompanyUserSerializer


class OpcoDetail(APIView):
    def get_object(self, pk):
        try:
            return Opco.objects.get(pk=pk)
        except Opco.DoesNotExist as exc:
            raise Http404 from exc

    def get(self, request, pk):
        tutor_team = self.get_object(pk)
        serializer = OpcoSerializer(tutor_team)
        return Response(serializer.data)

    def put(self, request, pk):
        tutor_team = self.get_object(pk)
        serializer = OpcoSerializer(tutor_team, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        tutor_team = self.get_object(pk)
        tutor_team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class OpcoList(generics.ListCreateAPIView):
    queryset = Opco.objects.all()
    serializer_class = OpcoSerializer

class ContactCompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactCompany.objects.all()
    serializer_class = ContactCompanySerializer

class ContactCompanyList(generics.ListCreateAPIView):
    queryset = ContactCompany.objects.all()
    serializer_class = ContactCompanySerializer


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


class DocumentList(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        document_list = Document.objects.all()
        serializers = DocumentSerializer(document_list, many=True)
        return Response(serializers.data)

    def post(self, request, *args, **kwargs):
        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():
            file = request.FILES["file"]
            sftp, ssh = SftpHelper.sftp_open_connection()
            sftp.putfo(file, "/datastore/" + request.data["file_name"])
            SftpHelper.sftp_close_connection(sftp, ssh)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DocumentDetail(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, pk):
        try:
            return Document.objects.get(pk=pk)
        except Document.DoesNotExist as exc:
            raise Http404 from exc

    def get(self, request, pk):
        document = self.get_object(pk)
        serializer = DocumentSerializer(document)
        sftp, ssh = SftpHelper.sftp_open_connection()
        file_name = serializer.data["file_name"]
        with open(file_name, "wb") as file_write:
            sftp.getfo("/datastore/" + file_name, file_write)
        # pylint: disable=consider-using-with
        file_read = open(file_name, "rb")
        SftpHelper.sftp_close_connection(sftp, ssh)
        return FileResponse(file_read, content_type="application/pdf")

    def delete(self, request, pk):
        document = self.get_object(pk)
        try:
            sftp, ssh = SftpHelper.sftp_open_connection()
            sftp.remove("/datastore/" + document.file_name)
            SftpHelper.sftp_close_connection(sftp, ssh)
        except:  # pylint: disable=bare-except
            pass
        document.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["DELETE"])
def cleanup(request, file_name):
    os.remove(file_name)
    return Response(status=status.HTTP_200_OK)
