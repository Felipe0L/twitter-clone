from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from twitterback.models.post import Post
from django.contrib.auth import get_user_model

User = get_user_model()

class PostPermissionTestCase(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(username='owner', password='123456')
        self.other_user = User.objects.create_user(username='intruder', password='123456')

        self.post = Post.objects.create(user=self.owner, content='Post original')

        self.client = APIClient()
        self.url = reverse('post-detail', kwargs={'pk': self.post.pk})  # rota de detalhe

    def test_owner_can_edit_own_post(self):
        self.client.force_authenticate(user=self.owner)
        response = self.client.patch(self.url, {'content': 'Editado pelo dono'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], 'Editado pelo dono')

    def test_other_user_cannot_edit_post(self):
        self.client.force_authenticate(user=self.other_user)
        response = self.client.patch(self.url, {'content': 'Tentativa de edição'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_edit_post(self):
        self.client.force_authenticate(user=None)
        response = self.client.patch(self.url, {'content': 'Anonimo tentando'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_user_can_view_post(self):
        self.client.force_authenticate(user=self.other_user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
