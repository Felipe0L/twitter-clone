from rest_framework import serializers
from twitterback.models.comment import Comment

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()  # 🔥 campo extra

    class Meta:
        model = Comment
        fields = ["id", "content", "created_at", "author", "is_owner"]

    def get_author(self, obj):
        return {
            "id": obj.user.id,
            "username": obj.user.username,
            "avatar": obj.user.avatar.url if obj.user.avatar else None,
        }

    def get_is_owner(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.user == request.user
        return False
