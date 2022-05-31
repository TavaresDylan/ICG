from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from api.models import Photo, Demo, Folder

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("username", "password", "email")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
        )

        user.set_password(validated_data["password"])
        user.save()

        return user


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "date_joined", "email")

    def get(self):
        user = User.objects.filter(id=self.get(id))

        return user

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
