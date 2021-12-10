from django.conf.urls import url
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token

from rest_framework import routers
from api.views import RegisterViewset

router = routers.SimpleRouter()
router.register('register', RegisterViewset, basename='register')

urlpatterns = [
    url(r'^auth/', obtain_jwt_token),
    path('api/', include(router.urls))
]