# Generated by Django 3.2.7 on 2021-09-21 23:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ffl', '0007_auto_20210824_1630'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='leagueyear',
            name='unique_year',
        ),
        migrations.RemoveField(
            model_name='thread',
            name='body',
        ),
    ]
