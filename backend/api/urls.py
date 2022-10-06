from django.urls import path
from . import views

urlpatterns = [
    path('users', views.getUser, name='getUser'),
    path('add-user', views.addUser, name='addUser'),
]
