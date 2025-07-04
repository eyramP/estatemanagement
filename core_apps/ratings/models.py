from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from core_apps.common.models import TimeStappedModel

User = get_user_model()


class Rating(TimeStappedModel):
    class RatingChoices(models.IntegerChoices):
        ONE = 1, _("Very Poor")
        TWO = 2, _("Poor")
        THREE = 3, _("Average")
        FOUR = 4, _("Goodr")
        FIVE = 5, _("Excellent")

    rated_user = models.ForeignKey(
        User,
        related_name="received_ratings",
        on_delete=models.CASCADE,
        verbose_name=_("Rated User")
    )
    rating_user = models.ForeignKey(
        User,
        related_name="given_ratings",
        on_delete=models.CASCADE,
        verbose_name=_("Rating User")
    )
    rating = models.IntegerField(
        choices=RatingChoices.choices,
        verbose_name=_("Ratings")
    )
    comment = models.TextField(
        verbose_name=_("Comments"),
        blank=True
    )

    def __str__(self) -> str:
        return f"{self.rating_user} rates {self.rated_user} {self.rating}/5"

    class Meta:
        verbose_name = _("Rating")
        verbose_name_plural = _("Ratings")
