from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()

class TokenSignalTest(TestCase):
    def test_token_created_on_user_creation(self):
        user = User.objects.create_user(username="token_signal_user", password="123456")

        # Verifica se o token foi criado automaticamente
        token = Token.objects.get(user=user)

        self.assertIsNotNone(token)


