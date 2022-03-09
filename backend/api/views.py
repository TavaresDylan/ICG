from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from api.models import Upload
from api.serializer import RegisterSerializer, UploadSerializer

@authentication_classes([])
@permission_classes([])
class RegisterViewset(ModelViewSet):

    serializer_class = RegisterSerializer

    def get_queryset(self):
        return User.objects.all()

@authentication_classes([])
@permission_classes([])
class UploadViewset(ModelViewSet):
	queryset = Upload.objects.all()
	serializer_class = UploadSerializer(queryset, many=True)

	# Insert all images passed in formData in DB and save them in local media folder
	def create(self, request):
		if request.method == 'POST':
			description = request.POST.getlist('description')
			owner = request.POST.getlist('owner')
			files=request.FILES.getlist('file')
			name=request.POST.getlist('name')
			i = 0
			for f in files:
				Upload.objects.create(file=f, size=f.size, name=name[i], description=description[i], owner=owner[i])
				i = i+1
			return Response(status=status.HTTP_200_OK)
		return Response(status=status.HTTP_400_BAD_REQUEST)

	# List all images in DB
	def list(self, request):
		queryset = Upload.objects.all()
		serializer = UploadSerializer(queryset, many=True)
		return Response(serializer.data)
