from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from twitterback.serializers.customuser_serializer import CustomUserSerializer  # ajuste o import

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CustomUserSerializer(request.user, context={'request': request})
        return Response(serializer.data)
