from rest_framework import generics, permissions
from twitterback.serializers import ProfileUpdateSerializer

class ProfileUpdateView(generics.UpdateAPIView):
    serializer_class = ProfileUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
