from django.urls import path
from . import views

urlpatterns = [
    # interviews
    path("interview/<int:id>", views.apiInterview, name="apiInterview"),
    path("interviews", views.getInterview, name="getInterview"),
    path("add-interview", views.addInterview, name="addInterview"),
    path("update-interview", views.updateInterview, name="updateInterview"),
    # deadlines
    path("deadline/<int:id>", views.apiDeadline, name="apiDeadline"),
    path("deadlines", views.getDeadline, name="getDeadline"),
    path("add-deadline", views.addDeadline, name="addDeadline"),
    path("update-deadline", views.updateDeadline, name="updateDeadline"),
    # notes
    path("note/<int:id>", views.apiNote, name="apiNote"),
    path("update-note", views.updateNote, name="updateNote"),
    path("notes", views.getNotes, name="getNotes"),
    path("add-note", views.addNote, name="addNote"),
    path("tree-note", views.treeNote, name="treeNote"),
    # year-group
    path("year-group", views.getYearGroup, name="getYearGroup"),
    path("add-year-group", views.addYearGroup, name="addYearGroup"),
    path(
        "delete-year-group-by-id", views.deleteYearGroupById, name="deleteYearGroupById"
    ),
    path("update-year-group", views.updateYearGroup, name="updateYearGroup"),
    path("semester", views.getSemester, name="getSemester"),
    path("add-semester", views.addSemester, name="addSemester"),
    path("delete-semester-by-id", views.deleteSemesterById, name="deleteSemesterById"),
    path("update-semester", views.updateSemester, name="updateSemester"),
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
