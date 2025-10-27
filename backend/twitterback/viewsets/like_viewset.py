# twitterback/viewsets/like_toggle_view.py
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from twitterback.models.post import Post
from twitterback.models.like import Like

class LikeViewset(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        like, created = Like.objects.get_or_create(user=request.user, post=post)
        if not created:
            like.delete()
            return Response(
                {"status": "unliked", "likes_count": post.likes.count()},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"status": "liked", "likes_count": post.likes.count()},
            status=status.HTTP_201_CREATED,
        )
