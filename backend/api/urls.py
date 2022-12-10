from django.urls import path, include
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
    # apprentices
    path("apprentices", views.get_apprentices, name="getApprentices"),
    # companies
    path("companies", views.get_company, name="getCompanies"),
    # formation-centers
    path("formation-centers", views.get_formation_centers, name="getformationCenters"),
    # mentors
    path("mentors", views.get_mentors, name="getMentors"),
    path("mentors/add", views.add_mentor, name="addMentor"),
    # semesters
    path("semesters", views.get_semesters, name="getSemesters"),
    path("semesters/add", views.add_semester, name="addSemester"),
    path("semesters/delete/<int:pk>", views.delete_semester, name="deleteSemesterById"),
    path("semesters/update", views.update_semester, name="updateSemester"),
    # tutor-teams
    path("tutor-teams", views.TutorTeamList.as_view()),
    path("tutor-teams/<int:pk>", views.TutorTeamDetail.as_view()),
    # tutors
    path("tutors", views.get_tutors, name="getTutor"),
    # users
    path("users", views.UserList.as_view()),
    path("users/<int:pk>", views.UserDetail.as_view()),
    path("users/change-password", views.UserChangePasswordView.as_view()),
    path(
        "users/password-reset/",
        include("django_rest_passwordreset.urls"),
    ),
    # year-groups
    path("year-group", views.get_year_groups, name="getYearGroups"),
    path("year-group/add", views.add_year_group, name="addYearGroup"),
    path("year-group/update", views.update_year_group, name="updateYearGroup"),
    path(
        "year-group/delete/<int:pk>",
        views.delete_year_group,
        name="deleteYearGroupById",
    ),
]
