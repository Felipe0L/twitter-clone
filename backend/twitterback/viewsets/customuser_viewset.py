# twitterback/viewset/customuser_view.py

from rest_framework import viewsets, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from twitterback.models.customuser import CustomUser
from twitterback.serializers.customuser_serializer import CustomUserSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]  # você pode mudar isso depois, se quiser proteger

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]