# twitterback/views/feed_view.py
from rest_framework import generics, permissions
from twitterback.models.post import Post
from twitterback.serializers.post_serializer import PostSerializer

class FeedView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        following_users = user.following.values_list("following", flat=True)
        return Post.objects.filter(user__in=following_users).order_by('-created_on')
