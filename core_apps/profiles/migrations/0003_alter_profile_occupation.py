# Generated by Django 4.2.11 on 2025-06-05 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0002_alter_profile_occupation"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="occupation",
            field=models.CharField(
                choices=[
                    ("carpenter", "Carpenter"),
                    ("roofer", "Roofer"),
                    ("mason", "Mason"),
                    ("electrician", "Electrician"),
                    ("plumber", "Plumber"),
                    ("civil_servant", "Civil Servant"),
                    ("painter", "Painter"),
                    ("tenant", "Tenant"),
                    ("software engineer", "Software Engineer"),
                ],
                default="tenant",
                max_length=20,
                verbose_name="Occupation",
            ),
        ),
    ]
