from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.utils import IntegrityError

# Create your models here.


class User(AbstractUser):
    leagues = models.ManyToManyField(
        'ffl.League', related_name='users')
    is_commissioner = models.BooleanField(default=False)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        """
        Checks for uniqueness of email address, but allows for multiple people to have no email
        """
        if self.email != '':
            email_exists = User.objects.filter(
                email=self.email).exclude(pk=self.pk).exists()

            if email_exists:
                raise IntegrityError(
                    f"User with the email address {self.email} already exists")
        super(User, self).save(*args, **kwargs)
