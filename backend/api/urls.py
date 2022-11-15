from django.urls import path
from . import views

urlpatterns = [
    path('mentors', views.getMentor, name='getMentor'),
    path('add-mentors', views.addMentor, name='addMentor'),
    # FIXME: Les noms de routes devraient être en kebab-case
    path('TeachersInCharge', views.getTeacherInCharge, name='getTeacherInCharge'),
    path('Trainees', views.getTrainee, name='getTrainee'),
    
    path('interviews', views.getInterview, name='getInterview'),
    path('add-interview', views.addInterview, name='addInterview'),
    
    path('deadlines', views.getDeadline, name='getDeadline'),
    path('add-deadline', views.addDeadline, name='addDeadline'),

    #url(r'^api/v1/note/(?P<pk>[0-9]+)$', views.getNote),
    path('note/<int:id>', views.getNote, name='getNote'),
    path('notes', views.getNotes, name='getNotes'),
    path('add-note', views.addNote, name='addNote'),
    path('treeNote', views.treeNote, name='treeNote'),

]
