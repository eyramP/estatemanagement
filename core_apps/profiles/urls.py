from django.urls import path
from .views import (
    AvatarUploadView,
    ProfileListAPIView,
    ProfileDetailAPIView,
    NonTenantProfileListAPIView,
    ProfileUpdateAPIView
)

urlpatterns = [
    path("all/", ProfileListAPIView.as_view(), name="profile-list"),
    path("non-tenant-profiles/", NonTenantProfileListAPIView.as_view(), name="none-tenant-profiles"),
    path("user/my-profile/", ProfileDetailAPIView.as_view(), name="profile-detail"),
    path("user/update/", ProfileUpdateAPIView.as_view(), name="profile-update"),
    path("user/avatar/", AvatarUploadView.as_view(), name="avatar-upload"),
]
