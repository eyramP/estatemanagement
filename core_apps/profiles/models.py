from autoslug import AutoSlugField
from cloudinary.models import CloudinaryField
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField
from django.db import models
from django.db.models import Avg

from core_apps.common.models import TimeStappedModel

User = get_user_model()


def get_user_username(instance: "Profile") -> str:
    return instance.user.username


class Profile(TimeStappedModel):
    class Gender(models.TextChoices):
        MALE = ("male", _("Male"))
        FEMALE = ("female", _("Female"))

    class Occupation(models.TextChoices):
        CARPENTER = ("carpenter", _("Carpenter"))
        ROOFER = ("roofer", _("Roofer"))
        MASON = ("mason", _("Mason"))
        ELECTRICIAN = ("electrician", _("Electrician"))
        PLUMBER = ("plumber", _("Plumber"))
        CIVIL_SERVANT = ("civil_servant", _("Civil Servant"))
        PAINTER = ("painter", _("Painter"))
        TENANT = ("tenant", _("Tenant"))
        SOFTWARE_ENGINEER = ("software engineer", _("Software Engineer"))

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )
    avatar = CloudinaryField(
        verbose_name=_("Avatar"),
        blank=True,
        null=True)
    gender = models.CharField(
        max_length=10,
        verbose_name=_("Gender"),
        choices=Gender.choices,
        default=Gender.MALE
    )
    bio = models.TextField(
        verbose_name=_("Bio"),
        blank=True,
        null=True
    )
    occupation = models.CharField(
        verbose_name=_("Occupation"),
        max_length=20,
        choices=Occupation.choices,
        default=Occupation.TENANT
    )
    phone_number = PhoneNumberField(
        verbose_name=_("Phone Number"),
        max_length=30,
        default="+233546789876"
    )
    country_of_origin = CountryField(
        verbose_name=_("Country"),
        default="GH"
    )
    city_of_origin = models.CharField(
        verbose_name=_("City"),
        max_length=180,
        default="Tema"
    )
    report_count = models.IntegerField(
        verbose_name=_("Report Count"),
        default=0
    )
    reputation = models.IntegerField(
        verbose_name=_("reputation"),
        default=100
    )
    slug = AutoSlugField(
        populate_from=get_user_username,
        unique=True
    )

    @property
    def is_banned(self) -> bool:
        return self.report_count >= 5

    def update_reputation(self):
        self.reputation = max(0, 100 - self.report_count * 20)

    def save(self, *args, **kwargs):
        self.update_reputation()
        super().save()

    def get_average_rating(self):
        average = self.user.received_ratings.aggregate(Avg("rating"))["rating__avg"]
        return average if average is not None else 0.0