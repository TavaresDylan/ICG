from django.db import models
from django.contrib.auth.models import User

class Folder(models.Model):
	name = models.CharField(max_length=255, unique=True)
	user_id = models.ForeignKey(User, on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name

class Photo(models.Model):
	name = models.CharField(max_length=120)
	file = models.ImageField(upload_to="images/", default=None, blank=True)
	upload_date = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	size = models.IntegerField()
	description = models.CharField(max_length=220, null=True)
	user_id = models.ForeignKey(User,on_delete=models.CASCADE)
	folder_id = models.ForeignKey(Folder, on_delete=models.CASCADE)
	is_wip = models.BooleanField(default=True)

	def __str__(self):
		return self.name

class Demo(models.Model):
	file = models.ImageField(upload_to="demo/", default=None, blank=True)
	description = models.CharField(max_length=230, default=None, null=True, blank=True)
