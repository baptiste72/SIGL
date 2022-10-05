from re import I
from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import SuperHero
from .serializers import SuperHeroSerializer


@api_view(['GET'])
def getSuperHeroes(request):
    super_heroes = SuperHero.objects.all()
    serializers = SuperHeroSerializer(super_heroes, many=True)
    return Response(serializers.data)


@api_view(['POST'])
def addSuperHero(request):
    serializer = SuperHeroSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)