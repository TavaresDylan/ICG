from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Photo, Demo, Folder, Avatar

class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'date_joined', 'email', 'is_superuser', 'first_name', 'last_name', 'is_staff')

class PhotoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Photo
		fields = ('file', 'name', 'size', 'description', 'id', 'updated_at', 'upload_date')

class DemoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Demo
		fields = ('id', 'file', 'description')

class FolderSerializer(serializers.ModelSerializer):
	class Meta:
		model = Folder
		fields = ('__all__')

class AvatarSerializer(serializers.ModelSerializer):
	class Meta:
		model = Avatar
		fields = ('id', 'file', 'user_id')
