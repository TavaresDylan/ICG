from django.urls import path, include
from rest_framework import routers
from api.views import RegisterViewset

router = routers.SimpleRouter()
router.register('register', RegisterViewset, basename='register')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.authtoken')),
]