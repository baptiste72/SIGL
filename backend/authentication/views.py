from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

from .graph.auth_helper import get_sign_in_flow, get_token_from_code
from .graph.graph_helper import *

from .serializers import UserSerializer
from .models import User
import jwt
import datetime

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('Invalid credentials, please try again')

        if not user.check_password(password):
            raise AuthenticationFailed('Invalid credentials, please try again')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret',
                           algorithm='HS256')
        
        user.token = token
        serializer = UserSerializer(user)
        
        return Response(serializer.data)


class UserView(APIView):
    def get(self, request):
        token = request.headers.get('Authorization')
        response: Response;

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        if (request.data['id'] == payload['id']):
            try:
                user: User = User.objects.get(id=payload['id'])
                serializer = UserSerializer(user)
                response = Response(serializer.data)
            except User.DoesNotExist:
                response = Response({'message': 'Utilisateur introuvable.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            response = Response({'message': 'Mauvaise correspondance dans les ids.'}, status=status.HTTP_400_BAD_REQUEST)
        return response
       
       
# TODO: Ajouter une vue pour consulter tous les utilisateurs
# TODO: Ajouter une vue pour récupérer le rôle des utilisateurs

class MicrosoftLogin(APIView):
    def get(self, request):
        flow = get_sign_in_flow()
        return Response(flow)

class MicrosoftGetUser(APIView):
    def post(self, request):
        result = get_token_from_code(request)
        # Get the user's profile from graph_helper.py script
        user = get_user(result['access_token']) 
        return Response(user)