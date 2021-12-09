from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from api.models import User
from api.serializer import UserSerializer
from rest_framework.decorators import api_view #, permission_classes

#from rest_framework import permissions

#@permission_classes((permissions.AllowAny,))
@api_view(['POST'])
def create_user(request):
    if request.method == 'POST':
        tutorial_data = JSONParser().parse(request)
        tutorial_serializer = UserSerializer(data=tutorial_data)
        if tutorial_serializer.is_valid():
            tutorial_serializer.save()
            return JsonResponse(tutorial_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user(request):
    if request.method == 'GET':
        tutorial_serializer = UserSerializer(tutorial) 
        return JsonResponse(tutorial_serializer.data) 
