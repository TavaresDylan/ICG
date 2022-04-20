from django.urls import path, include
from rest_framework import routers
from api.views import RegisterViewset, UploadViewset, DemoViewset, FolderViewset

router = routers.SimpleRouter()
router.register('register', RegisterViewset, basename='register')
router.register('upload', UploadViewset , basename='upload')
router.register('demo', DemoViewset, basename='demo')
router.register('folder', FolderViewset, basename='folder')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.jwt')),
]
