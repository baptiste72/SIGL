from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework import status

from authentication.graph.graph_helper import get_user
from .graph.auth_helper import get_sign_in_flow, get_token_from_code
from .graph.graph_helper import get_user
from .serializers import (
    UserSerializer,
)
from .models import User


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("Invalid credentials, please try again")

        if not user.check_password(password):
            raise AuthenticationFailed("Invalid credentials, please try again")

        token = Token.objects.get_or_create(user=user)[0].key

        user.token = token
        serializer = UserSerializer(user)

        return Response(serializer.data)


class LogoutView(APIView):
    # permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication]

    def get(self, request):
        if request.user is not None:
            if not request.user.is_anonymous:
                request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class MicrosoftLogin(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        flow = get_sign_in_flow()
        return Response(flow)


class MicrosoftGetUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        result = get_token_from_code(request)
        # Get the user's profile from graph_helper.py script
        user = get_user(result["access_token"])
        return Response(user)
