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

    path('tutor-team', views.getTutorTeam, name='getTutorTeam'),
    path('add-tutor-team', views.addTutorTeam, name='addTutorTeam'),

    path('year-group', views.getYearGroup, name='getYearGroup'),
    path('add-year-group', views.addYearGroup, name='addYearGroup'),
    path('delete-year-group-by-id', views.deleteYearGroupById, name='deleteYearGroupById'),
]
