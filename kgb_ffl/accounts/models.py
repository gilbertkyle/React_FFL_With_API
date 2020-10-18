from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    leagues = models.ManyToManyField('ffl.League', related_name='users')
    is_commissioner = models.BooleanField(default=False)

    def __str__(self):
        return self.username
