from django.urls import path, include
from api.views import UploadViewset, DemoViewset, FolderViewset, PhotoViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('photo', UploadViewset , basename='photo')
router.register('demo', DemoViewset, basename='demo')
router.register('folder', FolderViewset, basename='folder')
router.register(r'test', PhotoViewset, basename='test')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.jwt')),
]
