from django.urls import path
from . import views

urlpatterns = [
    path('mentors', views.getMentor, name='getMentor'),
    path('add-mentors', views.addMentor, name='addMentor'),
    # FIXME: Les noms de routes devraient être en kebab-case
    path('TeachersInCharge', views.getTeacherInCharge, name='getTeacherInCharge'),
    path('Trainees', views.getTrainee, name='getTrainee'),
]
