from django.urls import path
from .views import MicrosoftGetUser, MicrosoftLogin, RegisterView, LoginView, UserView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('users/authenticate', LoginView.as_view()),
    path('user/<int:id>', UserView.as_view()),
    # TODO: À l'avenir, renvoyer la liste des utilistateurs conditonnellement (suivant les droits du user connecté)
    # path('users', UserView.as_view()),
    path('microsoft-login', MicrosoftLogin.as_view()),
    path('microsoft-get-user', MicrosoftGetUser.as_view()),
]
