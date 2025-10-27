from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from twitterback.models.follow import Follow
from twitterback.serializers.customuser_serializer import CustomUserSerializer

User = get_user_model()


# ✅ Seguir / deixar de seguir
class FollowToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_id):
        user = request.user
        target = get_object_or_404(User, id=user_id)

        if user == target:
            return Response(
                {"error": "Você não pode seguir a si mesmo."},
                status=status.HTTP_400_BAD_REQUEST
            )

        follow = Follow.objects.filter(follower=user, following=target)
        if follow.exists():
            follow.delete()
            return Response({"status": "unfollowed"})
        else:
            follow = Follow.objects.create(follower=user, following=target)
            return Response(
                {
                    "status": "followed",
                    "data": {
                        "follower_id": user.id,
                        "following_id": target.id
                    }
                },
                status=status.HTTP_201_CREATED
            )


# ✅ Lista de SEGUIDORES (quem segue o usuário)
class FollowersListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)

        # usuários que seguem esse user
        followers = User.objects.filter(following__following=user)
        serializer = CustomUserSerializer(followers, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


# ✅ Lista de SEGUINDO (quem o usuário segue)
class FollowingListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)

        # usuários que esse user está seguindo
        following = User.objects.filter(followers__follower=user)
        serializer = CustomUserSerializer(following, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

