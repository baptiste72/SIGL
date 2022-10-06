from django.urls import path
from . import views

urlpatterns = [
    path('super-heroes', views.getSuperHeroes, name='getSuperHeroes'),
    path('add-super-hero', views.addSuperHero, name='addSuperHero'),
]
