from django.urls import path

from .views import (
    ApartmentCreateView,
    ApartmentDetailAPIView
)


urlpatterns = [
    path("add/", ApartmentCreateView.as_view(), name="add-apartment"),
    path("my-apartment/", ApartmentDetailAPIView.as_view(), name="apartment-detail"),
]
