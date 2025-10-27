from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from twitterback.models.comment import Comment
from twitterback.serializers.comment_serializer import CommentSerializer


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs["pk"]
        return Comment.objects.filter(post_id=post_id).select_related("user")
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def perform_create(self, serializer):
        post_id = self.kwargs["pk"]
        serializer.save(user=self.request.user, post_id=post_id)


class CommentDeleteView(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        comment_id = self.kwargs["comment_id"]
        comment = get_object_or_404(Comment, id=comment_id)

        if comment.user != self.request.user:
            raise PermissionDenied("Você não pode deletar este comentário.")
        return comment

    def delete(self, request, *args, **kwargs):
        comment = self.get_object()
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

