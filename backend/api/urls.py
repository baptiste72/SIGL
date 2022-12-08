from django.urls import path
from . import views

urlpatterns = [
    # apprentices
    path("apprentices", views.get_apprentices, name="getApprentices"),
    # companies
    path("companies", views.get_company, name="getCompanies"),
    path('companies/add', views.add_company, name='addCompany'),
    path('opco/add', views.add_opco, name='addOpco'),
    path('contact-company/add', views.add_contact_company, name='addContactCompany'),
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
    path("semesters/delete/<int:id>", views.delete_semester, name="deleteSemesterById"),
    path("semesters/update", views.update_semester, name="updateSemester"),
    # tutor-teams
    path("tutor-teams", views.get_tutor_teams, name="getTutorTeams"),
    path("tutor-teams/add", views.add_tutor_team, name="addTutorTeam"),
    # tutors
    path("tutors", views.get_tutors, name="getTutor"),
    # users
    path("users", views.get_user, name="getUsers"),
    path("users/delete/<int:id>", views.delete_user, name="deleteUserById"),
    path("users/update", views.update_user, name="updateUser"),
    # year-groups
    path("year-group", views.get_year_groups, name="getYearGroups"),
    path("year-group/add", views.add_year_group, name="addYearGroup"),
    path("year-group/update", views.update_year_group, name="updateYearGroup"),
    path("year-group/delete/<int:id>", views.delete_year_group, name="deleteYearGroupById",


    ),
]
