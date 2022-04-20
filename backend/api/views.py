from django.contrib.auth.models import User
from rest_framework.decorators import permission_classes
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from api.models import Photo, Demo, Folder
from api.serializer import RegisterSerializer, PhotoSerializer, DemoSerializer, FolderSerializer

@permission_classes([AllowAny])
class RegisterViewset(ModelViewSet):
    serializer_class = RegisterSerializer

    def get_queryset(self):
        return User.objects.all()

@permission_classes([IsAuthenticated])
class UploadViewset(ModelViewSet):
	queryset = Photo.objects.all()
	serializer_class = PhotoSerializer(queryset, many=True)

	# Insert all images passed in formData in DB and save them in local media folder
	def create(self, request):
		if request.method == 'POST':
			description = request.POST.getlist('description')
			files=request.FILES.getlist('file')
			name=request.POST.getlist('name')
			folderID = Folder.objects.get(pk=1)
			for i, f in enumerate(files):
				Photo.objects.create(file=f, size=f.size, name=name[i], description=description[i], user_id=request.user, folder_id=folderID)
			return Response(status=status.HTTP_200_OK)
		return Response(status=status.HTTP_400_BAD_REQUEST)

	# List all images by User
	def list(self, request):
		queryset = Photo.objects.filter(user_id=request.user)
		serializer = PhotoSerializer(queryset, many=True)
		return Response(serializer.data)

@permission_classes([AllowAny])
class DemoViewset(ModelViewSet):
	queryset = Demo.objects.all()
	serializer_class = DemoSerializer(queryset)

	def create(self, request):
		if request.method == 'POST':
			print(request.FILES.getlist('file'))
			return Response(status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
class FolderViewset(ModelViewSet):
	queryset = Folder.objects.all()
	Serializer_class = FolderSerializer(queryset)
