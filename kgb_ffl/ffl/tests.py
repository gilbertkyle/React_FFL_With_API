import datetime
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Invitation, League
from django.db.utils import IntegrityError

User = get_user_model()

# Create your tests here.


class InvitationModelTests(TestCase):

    def test_invite_player_to_league(self):
        """
        creates 2 users and an invite between them
        """
        user1 = User.objects.create(
            username="test1", email="gilbert@yahoo.com")
        user2 = User.objects.create(username="test2", email="kyle@yahoo.com")
        league1 = League.objects.create(name="test league")
        invite = Invitation.objects.create(
            sender=user1, receiver=user2, league=league1)
        invite.complete()
        self.assertIn(user2, league1.users.all())

    def test_unique_invite(self):
        """
        Checks if invites are unique between recipient and league
        """
        user1 = User.objects.create(username="test1")
        user2 = User.objects.create(username="test2", email="kyle@gmail.com")
        league1 = League.objects.create(name="test league")
        invite = Invitation.objects.create(
            sender=user1, receiver=user2, league=league1)
        with self.assertRaises(IntegrityError):
            invite2 = Invitation.objects.create(
                sender=user1, receiver=user2, league=league1)


class LeagueModelTests(TestCase):

    def test_league_was_created(self):
        """
        Check if you can create a league. Pretty simple.
        """
        league = League.objects.create(name="test_league")
        self.assertTrue(league)

    def test_league_created_year(self):
        """
        Check if creating a league also creates a LeagueYear object, should happen automatically with a @receiver
        """
        league = League.objects.create(name="test_league")
        year = league.years.get(year=datetime.datetime.now().year)
        self.assertEqual(year.year, datetime.datetime.now().year)

    def test_add_user_to_league(self):
        """
        Check if a user is added to a league correctly
        """
        league = League.objects.create(name="test_league")
        user = User.objects.create(username="test_user")
        league.add_user(user)
        self.assertIn(user, league.users.all())

    def test_create_league_profile(self):
        """
            Check if a LeagueYear object is created
        """
        user = User.objects.create(username="kyle")
        league = League.objects.create(name="test league")
        league.add_user(user)
        league_years = league.years.all()
        self.assertTrue(league_years)
