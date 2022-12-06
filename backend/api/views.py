from rest_framework.response import Response
from rest_framework.decorators import api_view

from .helper import data_treatement
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework import status

from api.serializers import (
    ApprenticeSerializer,
    DeadlineSerializer,
    InterviewSerializer,
    MentorSerializer,
    SemesterSerializer,
    SemesterSerializerDelete,
    TutorSerializer,
    TutorTeamSerializer,
    YearGroupSerializer,
    YearGroupSerializerDelete,
    NoteSerializer,
)
from base.models import (
    Apprentice,
    Deadline,
    Interview,
    Mentor,
    Semester,
    Tutor,
    TutorTeam,
    YearGroup,
    Note,
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
def get_deadline(request):
    DeadlineList = Deadline.objects.all()
    serializers = DeadlineSerializer(DeadlineList, many=True)
    return Response(serializers.data)


@api_view(["POST"])
def add_deadline(request):
    serializer = DeadlineSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["GET", "DELETE"])
def api_deadline(request, id):
    try:
        DeadlineId = Deadline.objects.get(pk=id)
    except Deadline.DoesNotExist:
        return JsonResponse(
            {"message": "the Deadline does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        deadline_serializer = NoteSerializer(DeadlineId)
        return JsonResponse(deadline_serializer.data)
    elif request.method == "DELETE":
        DeadlineId.delete()
        return JsonResponse(
            {"message": "the Deadline was deleted successfully!"},
            status=status.HTTP_204_NO_CONTENT,
        )


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


# renvois les données en Tree afin d'afficher l'aborescence des notes
@api_view(["GET"])
def tree_note(request):
    NoteList = Note.objects.all()
    serializers = NoteSerializer(NoteList, many=True)
    data = data_treatement.data_treatement.treeNotes(serializers.data)
    print(data)
    return Response(data)


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
