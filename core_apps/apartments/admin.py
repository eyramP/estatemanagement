from django.contrib import admin
from .models import Apartment


@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "unit_number",
        "building",
        "floor",
        "tenant",
    ]
    list_filter = [
        "building",
        "floor",
    ]
    list_display_links = ["id", "unit_number"]
    search_fields = ["unit_number"]
    ordering = ["building", "floor"]
    autocomplete_fields = ["tenant"]


