from django.urls import path, include
from rest_framework import routers
from captionning.views import CaptionViewset

router = routers.SimpleRouter()
router.register('icg', CaptionViewset, basename='icg')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
