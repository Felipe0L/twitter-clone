from rest_framework import viewsets, permissions
from django.db.models import Prefetch
from twitterback.models.post import Post
from twitterback.models.comment import Comment
from twitterback.models.like import Like
from twitterback.serializers.post_serializer import PostSerializer
from twitterback.permissions import IsOwnerOrReadOnly


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return (
            Post.objects
            .all()
            .select_related("user")  # autor do post
            .prefetch_related(
                Prefetch("comments", queryset=Comment.objects.select_related("user").order_by("-created_at")),
                Prefetch("likes", queryset=Like.objects.select_related("user")),
            )
            .order_by("-created_on")
        )

    def get_serializer_context(self):
        # 🔥 Garante que o 'request' chegue ao serializer (para o frontend saber quem é o usuário logado)
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
