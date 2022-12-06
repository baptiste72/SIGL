from django.urls import path
from . import views

urlpatterns = [
    # interviews
    path("interview/<int:id>", views.api_interview, name="apiInterview"),
    path("interviews", views.get_interview, name="getInterview"),
    path("add-interview", views.add_interview, name="addInterview"),
    path("update-interview", views.update_interview, name="updateInterview"),
    # deadlines
    path("deadline/<int:id>", views.api_deadline, name="apiDeadline"),
    path("deadlines", views.get_deadline, name="getDeadline"),
    path("add-deadline", views.add_deadline, name="addDeadline"),
    path("update-deadline", views.update_deadline, name="updateDeadline"),
    # notes
    path("note/<int:id>", views.api_note, name="apiNote"),
    path("update-note", views.update_note, name="updateNote"),
    path("notes", views.get_notes, name="getNotes"),
    path("add-note", views.add_note, name="addNote"),
    path("tree-note", views.tree_note, name="treeNote"),
    # year-group
    path("year-group", views.get_year_group, name="getYearGroup"),
    path("add-year-group", views.add_year_group, name="addYearGroup"),
    path(
        "delete-year-group-by-id",
        views.delete_year_group_by_id,
        name="deleteYearGroupById",
    ),
    path("update-year-group", views.update_year_group, name="updateYearGroup"),
    path("semester", views.get_semester, name="getSemester"),
    path("add-semester", views.add_semester, name="addSemester"),
    path(
        "delete-semester-by-id", views.delete_semester_by_id, name="deleteSemesterById"
    ),
    path("update-semester", views.update_semester, name="updateSemester"),
    path("mentors", views.get_mentor, name="getMentor"),
    path("add-mentors", views.add_mentor, name="addMentor"),
    path("tutors", views.get_tutor, name="getTutor"),
    path("apprentices", views.get_apprentice, name="getApprentice"),
    path("tutor-teams", views.get_tutor_teams, name="getTutorTeams"),
    path("add-tutor-teams", views.add_tutor_teams, name="addTutorTeams"),
    path("year-group", views.get_year_group, name="getYearGroup"),
    path("add-year-group", views.add_year_group, name="addYearGroup"),
    path(
        "delete-year-group-by-id",
        views.delete_year_group_by_id,
        name="deleteYearGroupById",
    ),
    path("update-year-group", views.update_year_group, name="updateYearGroup"),
    path("semester", views.get_semester, name="getSemester"),
    path("add-semester", views.add_semester, name="addSemester"),
    path(
        "delete-semester-by-id", views.delete_semester_by_id, name="deleteSemesterById"
    ),
    path("update-semester", views.update_semester, name="updateSemester"),
]
