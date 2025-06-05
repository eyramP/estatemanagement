from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from autoslug import AutoSlugField

from core_apps.common.models import TimeStappedModel

User = get_user_model()


class Report(TimeStappedModel):
    title = models.CharField(_("Title"), max_length=255)
    slug = AutoSlugField(populate_from="title")
    reported_by = models.ForeignKey(
        User,
        related_name="reports_made",
        on_delete=models.CASCADE,
        verbose_name="Reported by")
    reported_user = models.ForeignKey(
        User,
        related_name="reported_user",
        on_delete=models.CASCADE,
        verbose_name="Reported use")
    description = models.TextField(_("Description"))

    def __str__(self) -> str:
        return f"Report by {self.reported_by.get_full_name} against {self.reported_user.get_full_name}"

    class Meta:
        verbose_name = _("Report")
        verbose_name_plural = ("Reports")
        ordering = ["-created_at"]
