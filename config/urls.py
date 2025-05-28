from django.contrib import admin
from django.conf import settings
from django.urls import path, include

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
]
