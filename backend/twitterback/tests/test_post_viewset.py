# twitterback/tests/test_post_viewset.py

from django.test import TestCase
from rest_framework.test import APIClient
from twitterback.models import CustomUser, Post
from django.urls import reverse

class PostViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username="testuser", password="testpass")
        self.client.force_authenticate(user=self.user)
        self.url = reverse("post-list")

    def test_create_post(self):
        response = self.client.post(self.url, {"content": "Meu primeiro post"}, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.first().content, "Meu primeiro post")

    def test_list_posts(self):
        Post.objects.create(user=self.user, content="Post 1")
        Post.objects.create(user=self.user, content="Post 2")
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
