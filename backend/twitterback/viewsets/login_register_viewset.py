from rest_framework import generics
from twitterback.serializers import UserRegisterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = []  # Permitir sem autenticação
