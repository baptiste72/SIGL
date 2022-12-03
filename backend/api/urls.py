from django.urls import path
from . import views

urlpatterns = [
    path('mentors', views.getMentor, name='getMentor'),
    path('add-mentors', views.addMentor, name='addMentor'),

    path('tutors', views.getTutor, name='getTutor'),
    path('apprentices', views.getApprentice, name='getApprentice'),
    
    path('interviews', views.getInterview, name='getInterview'),
    path('add-interview', views.addInterview, name='addInterview'),
    
    path('deadlines', views.getDeadline, name='getDeadline'),
    path('add-deadline', views.addDeadline, name='addDeadline'),

    path('tutor-teams', views.getTutorTeams, name='getTutorTeams'),
    path('add-tutor-teams', views.addTutorTeams, name='addTutorTeams'),

    path('year-group', views.getYearGroup, name='getYearGroup'),
    path('add-year-group', views.addYearGroup, name='addYearGroup'),
    path('delete-year-group-by-id', views.deleteYearGroupById, name='deleteYearGroupById'),
    path('update-year-group', views.updateYearGroup, name='updateYearGroup'),
    
    path('semester', views.getSemester, name='getSemester'),
    path('add-semester', views.addSemester, name='addSemester'),
    path('delete-semester-by-id', views.deleteSemesterById, name='deleteSemesterById'),
    path('update-semester', views.updateSemester, name='updateSemester'),
    
    path('companys', views.getCompany, name='getCompany'),
    path('formationCenters', views.getFormationCenter, name='getformationCenter'),
    path('users', views.getUser, name='getUser'),
    path('delete-user', views.deleteUserById, name='deleteUserById'),
]
