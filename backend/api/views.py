import os

from django.http import FileResponse, Http404
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.helpers.password_helper import PasswordHelper
from api.helpers.semester_helper import SemesterHelper
from api.helpers.document_helper import DocumentHelper
from api.helpers.evaluation_helper import EvaluationHelper
from api.helpers.data_treatement import DataTreatement
from api.helpers.mail_helper import MailHelper
from api.helpers.sftp_helper import SftpHelper
from api.helpers.tutor_team_helper import TutorTeamHelper
from api.services.apprentice_service import ApprenticeService
from api.serializers import (
    ApprenticeInfoSerializer,
    ApprenticeRoleSerializer,
    ApprenticeSerializer,
    ChangePasswordSerializer,
    CompanySerializer,
    CompanyUserSerializer,
    ContactCompanySerializer,
    DeadlineSerializer,
    DocumentSerializer,
    EvaluationSerializer,
    FormationCenterSerializer,
    InterviewSerializer,
    MentorSerializer,
    NoteSerializer,
    OpcoSerializer,
    RegisterUserSerializer,
    SemesterSerializer,
    TreeNoteSerializer,
    TutorSerializer,
    TutorTeamSerializer,
    UserSerializer,
    YearGroupSerializer,
)
from authentication.models import User
from base.models import (
    Apprentice,
    ApprenticeInfo,
    Company,
    CompanyUser,
    ContactCompany,
    Deadline,
    Document,
    Evaluations,
    FormationCenter,
    Interview,
    Mentor,
    Note,
    Opco,
    Semester,
    Tutor,
    TutorTeam,
    YearGroup,
)
from base.utilities import Role


class MentorList(generics.ListCreateAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer


class MentorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer


class MentorByCompany(APIView):
    def get(self, request, pk):
        mentor_list = Mentor.objects.filter(mt_cmp_siret=pk)
        serializers = MentorSerializer(mentor_list, many=True)
        return Response(serializers.data)


@api_view(["GET"])
def get_tutors(request):
    tutor_list = Tutor.objects.all()
    serializer = TutorSerializer(tutor_list, many=True)
    return Response(serializer.data)


class ApprenticeList(generics.ListCreateAPIView):
    queryset = Apprentice.objects.all()
    serializer_class = ApprenticeSerializer


class ApprenticeTutorList(APIView):
    def get(self, request, pk, **kwargs):
        tutor = Tutor.objects.get(pk=pk).tutor
        tutor_team_list = TutorTeam.objects.filter(tutor=tutor)
        apprentice_list = []
        for tutor_team in tutor_team_list :
            apprentice = Apprentice.objects.filter(pk=tutor_team.apprentice.pk).first()
            apprentice_list.append(apprentice)
        serializers = ApprenticeSerializer(apprentice_list, many=True)
        return Response(serializers.data)


class ApprenticeMentorList(APIView):
    def get(self, request, pk, **kwargs):
        mentor = Mentor.objects.get(pk=pk).mentor
        mentor_team_list = TutorTeam.objects.filter(mentor=mentor)
        apprentice_list = []
        for mentor_team in mentor_team_list :
            apprentice = Apprentice.objects.filter(pk=mentor_team.apprentice.pk).first()
            apprentice_list.append(apprentice)
        serializers = ApprenticeSerializer(apprentice_list, many=True)
        return Response(serializers.data)
    
    
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


class ApprenticeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Apprentice.objects.all()
    serializer_class = ApprenticeSerializer


class DeadlinesByUserId(APIView):
    def get(self, request, pk):
        year_group = Apprentice.objects.get(pk=pk).yearGroup
        deadline_list = Deadline.objects.filter(yearGroup=year_group)
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


class YearGroupList(generics.ListCreateAPIView):
    queryset = YearGroup.objects.all()
    serializer_class = YearGroupSerializer


class YearGroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = YearGroup.objects.all()
    serializer_class = YearGroupSerializer


class SemesterByYearGroup(APIView):
    def get(self, request, pk):
        semesters = Semester.objects.filter(yearGroup_id=pk)
        serializers = SemesterSerializer(semesters, many=True)
        return Response(serializers.data)


class SemesterList(generics.ListCreateAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer


class SemesterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer


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


class ApprenticeInfoByCompany(APIView):
    def get(self, request, pk):
        apprentice_list = ApprenticeInfo.objects.filter(app_siret=pk)
        serializers = ApprenticeInfoSerializer(apprentice_list, many=True)
        return Response(serializers.data)


class ApprenticeInfoList(generics.ListCreateAPIView):
    queryset = ApprenticeInfo.objects.all()
    serializer_class = ApprenticeInfoSerializer


class ApprenticeInfoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ApprenticeInfo.objects.all()
    serializer_class = ApprenticeInfoSerializer


class ApprenticeInfoValidate(APIView):
    def get_object(self, pk):
        try:
            return ApprenticeInfo.objects.get(pk=pk)
        except ApprenticeInfo.DoesNotExist as exc:
            raise Http404 from exc

    def put(self, request, pk):
        apprentice_info = self.get_object(pk)
        company_user = CompanyUser.objects.get(company_siret=apprentice_info.app_siret)

        user = User.objects.get(pk=company_user.id)
        serializer = ApprenticeInfoSerializer(
            apprentice_info, data=request.data["apprenticeInfo"]
        )
        if serializer.is_valid():
            serializer.save()
            MailHelper.send_validation_mail(
                serializer=serializer, comment=request.data["comment"], email=user.email
            )

            if serializer.data["app_is_validate"]:
                apprentice_data = ApprenticeService.get_apprentice_from_apprentice_info(
                    request.data["apprenticeInfo"]
                )

                # Sauvegarde de l'utilisateur en base
                apprentice_serializer = ApprenticeRoleSerializer(data=apprentice_data)
                apprentice_serializer.is_valid(raise_exception=True)
                apprentice_serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OpcoDetail(APIView):
    def get_object(self, pk):
        try:
            return Opco.objects.get(pk=pk)
        except Opco.DoesNotExist as exc:
            raise Http404 from exc

    def get(self, request, pk):
        opco = self.get_object(pk)
        serializer = OpcoSerializer(opco)
        return Response(serializer.data)

    def put(self, request, pk):
        opco = self.get_object(pk)
        serializer = OpcoSerializer(opco, data=request.data)
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


class ContactCompanyDetail(APIView):
    def get_object(self, pk):
        try:
            return ContactCompany.objects.get(ct_cmp_siret=pk)
        except ContactCompany.DoesNotExist as exc:
            raise Http404 from exc

    def get(self, request, pk):
        contact_company = self.get_object(pk)
        serializer = ContactCompanySerializer(contact_company)
        return Response(serializer.data)

    def put(self, request, pk):
        contact_company = self.get_object(pk)
        serializer = ContactCompanySerializer(contact_company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        contact_company = self.get_object(pk)
        contact_company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ContactCompanyList(generics.ListCreateAPIView):
    queryset = ContactCompany.objects.all()
    serializer_class = ContactCompanySerializer


class TutorTeamByTutorId(APIView):
    def get(self, request, pk):
        try:
            tutor_team = TutorTeam.objects.get(tutor_id=pk)
        except TutorTeam.DoesNotExist as exc:
            raise Http404 from exc
        serializer = TutorTeamSerializer(tutor_team)
        return Response(serializer.data)


class TutorTeamByMentorId(APIView):
    def get(self, request, pk):
        try:
            tutor_team = TutorTeam.objects.get(mentor_id=pk)
        except TutorTeam.DoesNotExist as exc:
            raise Http404 from exc
        serializer = TutorTeamSerializer(tutor_team)
        return Response(serializer.data)


class TutorTeamByApprenticeId(APIView):
    def get(self, request, pk):
        try:
            tutor_team = TutorTeam.objects.get(apprentice_id=pk)
        except TutorTeam.DoesNotExist as exc:
            raise Http404 from exc

        serializer = TutorTeamSerializer(tutor_team)
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


class DocumentList(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        document_list = Document.objects.all()
        serializers = DocumentSerializer(document_list, many=True)
        response = DocumentHelper.getAllDocuments(serializers)
        return Response(response)

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


class DocumentByYearGroup(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, pk):
        document_list = Document.objects.all().filter(yearGroup=pk)
        serializers = DocumentSerializer(document_list, many=True)
        response = DocumentHelper.getAllDocuments(serializers)
        return Response(response)


class EvaluationList(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        evaluation_list = Evaluations.objects.all()
        serializers = EvaluationSerializer(evaluation_list, many=True)
        response = EvaluationHelper.getAllEvaluations(serializers)
        return Response(response)

    def post(self, request, *args, **kwargs):
        serializer = EvaluationSerializer(data=request.data)
        if serializer.is_valid():
            file = request.FILES["file"]
            sftp, ssh = SftpHelper.sftp_open_connection()
            sftp.putfo(file, "/datastore/" + request.data["file_name"])
            SftpHelper.sftp_close_connection(sftp, ssh)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EvaluationDetail(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, pk, *args, **kwargs):
        try:
            return Evaluations.objects.get(pk=pk)
        except Evaluations.DoesNotExist as exc:
            raise Http404 from exc

    def get(self, request, pk):
        evaluation = self.get_object(pk)
        serializer = EvaluationSerializer(evaluation)
        sftp, ssh = SftpHelper.sftp_open_connection()
        file_name = serializer.data["file_name"]
        with open(file_name, "wb") as file_write:
            sftp.getfo("/datastore/" + file_name, file_write)
        # pylint: disable=consider-using-with
        file_read = open(file_name, "rb")
        SftpHelper.sftp_close_connection(sftp, ssh)
        return FileResponse(file_read, content_type="application/pdf")

    def delete(self, request, pk):
        evaluation = self.get_object(pk)
        try:
            sftp, ssh = SftpHelper.sftp_open_connection()
            sftp.remove("/datastore/" + evaluation.file_name)
            SftpHelper.sftp_close_connection(sftp, ssh)
        except:  # pylint: disable=bare-except
            pass
        evaluation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        evaluation = self.get_object(pk, Evaluations)
        evaluation.type = request.data.get("type")
        evaluation.status = request.data.get("status")
        evaluation.yeargroup = request.data.get("yeargroup")
        evaluation.user = User.objects.get(pk=request.data.get("user"))
        if request.data.get("note"):
            evaluation.note = request.data.get("note")
        serializer = EvaluationSerializer(evaluation, data=request.data)
        if serializer.is_valid():
            evaluation.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EvaluationByOwner(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, pk):
        evaluation_list = Evaluations.objects.all().filter(owner=pk)
        serializers = EvaluationSerializer(evaluation_list, many=True)
        response = EvaluationHelper.getAllEvaluations(serializers)
        return Response(response)


@api_view(["DELETE"])
def cleanup(request, file_name):
    os.remove(file_name)
    return Response(status=status.HTTP_200_OK)
