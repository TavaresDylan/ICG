from django.urls import path
from .views import icg

urlpatterns = [
    path('icg', icg.as_view()),
]
