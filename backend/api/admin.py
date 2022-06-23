from django.contrib import admin

# Register your models here.
from .models import Photo, Demo, Folder, Avatar

class PhotoAdmin(admin.ModelAdmin):
	readonly_fields = ("upload_date", "updated_at")
	list_display = ['name', 'id', 'user_id', 'folder_id', 'upload_date', 'updated_at']

admin.site.register(Photo, PhotoAdmin)

class DemoAdmin(admin.ModelAdmin):
	admin.site.register(Demo)

class FolderAdmin(admin.ModelAdmin):
	list_display = ['name', 'id', 'user_id', 'created_at']

admin.site.register(Folder, FolderAdmin)
class AvatarAdmin(admin.ModelAdmin):
	list_display = ['user_id', 'id', 'file', 'name']

admin.site.register(Avatar, AvatarAdmin)

