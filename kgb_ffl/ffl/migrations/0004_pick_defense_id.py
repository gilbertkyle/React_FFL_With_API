# Generated by Django 3.1.1 on 2020-10-22 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ffl', '0003_auto_20200908_1357'),
    ]

    operations = [
        migrations.AddField(
            model_name='pick',
            name='defense_id',
            field=models.CharField(blank=True, default='', max_length=20, null=True),
        ),
    ]