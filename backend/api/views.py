from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.viewsets import ModelViewSet
from api.models import Image
from api.serializer import RegisterSerializer, ImageSerializer

@authentication_classes([])
@permission_classes([])
class RegisterViewset(ModelViewSet):

    serializer_class = RegisterSerializer

    def get_queryset(self):
        return User.objects.all()

@permission_classes([])
class UploadViewset(ModelViewSet):
	serializer_class = ImageSerializer
	queryset = Image.objects.all()
