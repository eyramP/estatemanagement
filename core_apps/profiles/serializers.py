from rest_framework import serializers
from django_countries.serializer_fields import CountryField
from core_apps.apartments.serializers import ApartmentSerializer
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.ReadOnlyField(source="user.first_name")
    last_name = serializers.ReadOnlyField(source="user.last_name")
    username = serializers.ReadOnlyField(source="user.username")
    full_name = serializers.ReadOnlyField(source="user.get_full_name")
    country_of_origin = CountryField(name_only=True)
    avatar = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(source="user.date_joined", read_only=True)
    apartment = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "id",
            "slug",
            "first_name",
            "last_name",
            "username",
            "full_name",
            "gender",
            "country_of_origin",
            "city_of_origin",
            "bio",
            "occupation",
            "avatar",
            "reputation",
            "date_joined",
            "apartment",
            "average_rating"
        ]

    def get_avatar(self, obj: Profile) -> str | None:
        if obj.avatar:
            return obj.avatar.url
        return None
        # try:
        #     return obj.avatar.url
        # except AttributeError:
        #     return None

    def get_average_rating(self, obj: Profile):
        return obj.get_average_rating()

    def get_apartment(self, obj) -> None:
        apartment = obj.user.apartment.first()
        if apartment:
            return ApartmentSerializer(apartment).data
        return None


class UpdateProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    username = serializers.CharField(source="user.username")
    country_of_origin = CountryField(name_only=True)

    class Meta:
        model = Profile
        fields = [
            "first_name",
            "last_name",
            "username",
            "gender",
            "country_of_origin",
            "city_of_origin",
            "bio",
            "occupation",
            "phone_number",
        ]


class AvatarUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["avatar"]
