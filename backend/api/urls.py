from django.urls import path
from . import views

urlpatterns = [
    path('mentors', views.getMentor, name='getMentor'),
    path('add-mentors', views.addMentor, name='addMentor'),

    path('teachers-in-charge', views.getTeacherInCharge, name='getTeacherInCharge'),
    path('trainees', views.getTrainee, name='getTrainee'),
    
    path('interviews', views.getInterview, name='getInterview'),
    path('add-interview', views.addInterview, name='addInterview'),
    
    path('deadlines', views.getDeadline, name='getDeadline'),
    path('add-deadline', views.addDeadline, name='addDeadline'),
    
    path('tutor-team', views.getTutorTeam, name='getTutorTeam'),

]
