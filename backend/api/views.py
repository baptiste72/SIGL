from re import I
from rest_framework.response import Response
from rest_framework.decorators import api_view

# from base.models import User
# from .serializers import UserSerializer

# @api_view(['GET'])
# def getUser(request):
#     user = User.objects.all()
#     serializers = UserSerializer(user, many=True)
#     return Response(serializers.data)

# @api_view(['POST'])
# def addUser(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)
