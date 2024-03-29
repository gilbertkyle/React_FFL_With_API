# Generated by Django 3.2.4 on 2021-08-24 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ffl', '0006_thread_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='thread',
            name='body',
            field=models.TextField(blank=True),
        ),
        migrations.AddConstraint(
            model_name='leagueyear',
            constraint=models.UniqueConstraint(fields=('league', 'year'), name='unique_year'),
        ),
    ]
