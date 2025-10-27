# twitterback/tests/test_customuser_viewset.py

from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from twitterback.models import CustomUser

class CustomUserViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("customuser-list")
        self.user = CustomUser.objects.create_user(username="admin", password="adminpass")

    def test_create_user(self):
        data = {
            "username": "newuser",
            "password": "newpass123"
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertTrue(CustomUser.objects.filter(username="newuser").exists())
        created_user = CustomUser.objects.get(username="newuser")
        self.assertTrue(created_user.check_password("newpass123"))

    def test_list_users_authenticated(self):
        self.client.force_authenticate(user=self.user)
        CustomUser.objects.create_user(username="another", password="123456")
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data), 1)
        usernames = [user["username"] for user in response.data]
        self.assertIn("admin", usernames)

    def test_list_users_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)  # não autenticado
