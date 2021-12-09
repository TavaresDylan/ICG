from django.conf.urls import url 
from api import views

urlpatterns = [ 
    url('api/user', views.create_user),
    url('api/user/(?P<pk>[0-9]+)$', views.get_user),
]