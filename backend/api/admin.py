from django.contrib import admin

# Register your models here.
from .models import Photo, Demo, Folder

class PhotoAdmin(admin.ModelAdmin):
	list_display = ['name', 'id', 'user_id', 'folder_id', 'upload_date']

admin.site.register(Photo, PhotoAdmin)

class DemoAdmin(admin.ModelAdmin):
	admin.site.register(Demo)

class FolderAdmin(admin.ModelAdmin):
	list_display = ['name', 'id', 'user_id', 'created_at']

admin.site.register(Folder, FolderAdmin)
