from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework import status

User = get_user_model()

class LoginTokenTest(APITestCase):
    def setUp(self):
        self.username = "login_user"
        self.password = "securepassword"
        self.user = User.objects.create_user(username=self.username, password=self.password)
        self.login_url = reverse("api_token_auth")  # usa o nome da URL do login

    def test_login_returns_token(self):
        data = {
            "username": self.username,
            "password": self.password
        }
        response = self.client.post(self.login_url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
