from rest_framework.decorators import permission_classes
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone

from api.models import Photo, Demo, Folder
from api.serializer import PhotoSerializer, DemoSerializer, FolderSerializer


@permission_classes([IsAuthenticated])
class UploadViewset(ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer(queryset, many=True)

    # Insert all images passed in formData in DB and save them in local media folder
    def create(self, request):
        if request.method == "POST":
            description = request.POST.getlist("description")
            files = request.FILES.getlist("file")
            name = request.POST.getlist("name")
            folderID = Folder.objects.get(pk=int(request.POST.get("folder_id")))
            queryset = Photo.objects.bulk_create(
                [
                    Photo(
                        file=f,
                        size=f.size,
                        name=name[i],
                        description=description[i],
                        user_id=request.user,
                        folder_id=folderID,
                    )
                    for i, f in enumerate(files)
                ]
            )
            serializer = PhotoSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # Get images by User paginated by 8
    def list(self, request):
        if request.GET.get("name") != None:
            queryset = Photo.objects.filter(
                user_id=request.user,
                folder_id=request.GET.get("folder_id"),
                name__icontains=request.GET.get("name"),
            )
        else:
            queryset = Photo.objects.filter(
                user_id=request.user, folder_id=request.GET.get("folder_id")
            )
        page = self.paginate_queryset(queryset)
        serializer = PhotoSerializer(queryset, many=True)
        if page is not None:
            serializer = PhotoSerializer(page, many=True)
            return Response({"data": serializer.data, "count": len(queryset)})
        return Response(serializer.data)

    # Update photo name by id
    def update(self, request, pk=None, partial=True):
        if request.method == "PATCH":
            queryset = Photo.objects.filter(
                id=pk, user_id_id=request.data.get("userId")
            )
            queryset.update(name=request.data.get("name"), updated_at=timezone.now())
            return Response(request.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class PhotoViewset(ViewSet):
    def list(self, request):
        print(request.user)
        queryset = Photo.objects.all().filter(user_id=request.user)
        serializer = PhotoSerializer(queryset, many=True)
        return Response(serializer.data)


@permission_classes([AllowAny])
class DemoViewset(ModelViewSet):
    queryset = Demo.objects.all()
    serializer_class = DemoSerializer(queryset)

    def create(self, request):
        if request.method == "POST":
            print(request.FILES.getlist("file"))
            return Response(status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class FolderViewset(ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

    # Get folder by userID paginated by 8
    def list(self, request):
        if request.GET.get("name") != None:
            queryset = Folder.objects.filter(
                user_id=request.user, name__icontains=request.GET.get("name")
            )
        else:
            queryset = Folder.objects.filter(user_id=request.user)
        page = self.paginate_queryset(queryset)
        serializer = FolderSerializer(queryset, many=True)
        if page is not None:
            serializer = FolderSerializer(page, many=True)
            return Response({"data": serializer.data, "count": len(queryset)})
        return Response(serializer.data)
