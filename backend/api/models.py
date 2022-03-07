from django.db import models

class Upload(models.Model):
	name = models.CharField(max_length=120)
	file = models.ImageField(upload_to="images/", default=None, blank=True)
	upload_date = models.DateTimeField(auto_now_add=True)
	size = models.IntegerField()
	owner = models.CharField(max_length=30)
	description = models.CharField(max_length=220, null=True)
