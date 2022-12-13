from django.urls import path, include
from . import views

urlpatterns = [
    # apprentices
    path("apprentices", views.get_apprentices, name="getApprentices"),
    # companies
    path("companies", views.CompanyList.as_view()),
    path("companies/<int:pk>", views.CompanyDetail.as_view()),
    #opco
    path("opco", views.OpcoList.as_view()),
    path("opco/<int:pk>", views.OpcoDetail.as_view()),
    #contact-company
    path("contact-company", views.ContactCompanyList.as_view()),
    path("contact-company/<int:pk>", views.ContactCompanyDetail.as_view()),
    #company-user
    path("contact-company", views.CompanyUserList.as_view()),
    path("company-user/<int:pk>", views.CompanyUserDetail.as_view()),
    # deadlines
    path("deadlines", views.get_deadlines, name="getDeadlines"),
    path("deadlines/add", views.add_deadline, name="addDeadline"),
    # formation-centers
    path("formation-centers", views.get_formation_centers, name="getformationCenters"),
    # interviews
    path("interviews", views.get_interviews, name="getInterviews"),
    path("interviews/add", views.add_interview, name="addInterview"),
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
