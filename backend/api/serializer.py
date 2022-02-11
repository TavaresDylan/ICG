from datetime import datetime
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from api.models import Image


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
        fields = ("username", "date_joined", "email")

    def get(self):
        user = User.objects.filter(id=self.get(id))

        return user


class ImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Image
		fields = ("name", "owner", "size", "file")

	def post(self, object):
		upload = Image.objects.create(
			file=object["file"],
			name=object["name"],
			owner=object["owner"],
			size=object["size"],
		)
		upload.save()
		return upload

	def get_img(self):
		uploader = Image.object.filter(owner=self.get(id))
