from django.views import View
from rest_framework.viewsets import ModelViewSet
from captionning.models import Caption
from captionning.serializer import CaptionSerializer

class CaptionViewset(ModelViewSet):
	queryset = Caption.objects.all()
	serializer_class = CaptionSerializer

