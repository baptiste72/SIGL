from django.urls import path
from .views import (
    MicrosoftGetUser,
    MicrosoftLogin,
    LoginView,
    LogoutView,
)

urlpatterns = [
    path("login", LoginView.as_view()),
    path("logout", LogoutView.as_view()),
    path("microsoft/login", MicrosoftLogin.as_view()),
    path("microsoft/user", MicrosoftGetUser.as_view()),
]
