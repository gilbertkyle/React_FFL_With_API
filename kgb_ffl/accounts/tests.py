from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
User = get_user_model()

# Create your tests here.


class UserModelTests(TestCase):

    def test_user_creation(self):
        """
            Checks if 2 users can have the same empty email
        """
        user1 = User.objects.create(username="kyle")
        user2 = User.objects.create(username="gilbert")
        user3 = User.objects.create(
            username="jon snow", email="kyle@yahoo.com")

        self.assertEqual(user1.email, user2.email)
        with self.assertRaises(IntegrityError):
            user4 = User.objects.create(
                username="ned stark", email="kyle@yahoo.com")
