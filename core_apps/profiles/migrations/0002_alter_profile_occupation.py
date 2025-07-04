# Generated by Django 4.2.11 on 2025-05-31 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="occupation",
            field=models.CharField(
                choices=[
                    ("employed", "Employed"),
                    ("unemployed", "Unemployed"),
                    ("carpenter", "Carpenter"),
                    ("electrician", "Electrician"),
                    ("plumber", "Plumber"),
                    ("civil_servant", "Civil Servant"),
                    ("tenant", "Tenant"),
                    ("software engineer", "Software Engineer"),
                ],
                default="tenant",
                max_length=20,
                verbose_name="Occupation",
            ),
        ),
    ]
