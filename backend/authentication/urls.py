from django.urls import path
from .views import (
    MicrosoftGetUser,
    MicrosoftLogin,
    RegisterView,
    LoginView,
    UserView,
    LogoutView,
)

urlpatterns = [
    path("register", RegisterView.as_view()),
    path("login", LoginView.as_view()),
    path("user", UserView.as_view()),
    path("logout", LogoutView.as_view()),
    path("microsoft-login", MicrosoftLogin.as_view()),
    path("microsoft-get-user", MicrosoftGetUser.as_view()),
]
