# Generated by Django 3.1.7 on 2021-06-21 23:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ffl', '0005_league_is_private'),
    ]

    operations = [
        migrations.AddField(
            model_name='thread',
            name='updated_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2021, 6, 21, 16, 43, 22, 348670), verbose_name='Updated at'),
            preserve_default=False,
        ),
    ]
